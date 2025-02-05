import { and, eq } from "drizzle-orm";
import { db } from ".";
import { schedule, scheduleInsertSchema, scheduleUpdateSchema } from "./schema/schedule";
import { scheduleToGroup } from "./schema/schedule_group";
import { userToGroup, userToGroupInsertSchema } from "./schema/user_group";
import { user } from "./schema/user";
import { group, groupInsertSchema } from "./schema/group";
import { task, taskInsertSchema } from "./schema/task";
import { category } from "./schema/category";

// Define custom error types
export class DatabaseError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthorizationError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

async function is_writer(schedule_id: number, username: string): Promise<boolean> {
  try {
    const gs = await db.select()
      .from(scheduleToGroup)
      .innerJoin(userToGroup, eq(userToGroup.groupname, scheduleToGroup.groupname))
      .where(
        and(
          eq(scheduleToGroup.write, true),
          eq(userToGroup.username, username),
          eq(scheduleToGroup.schedule_id, schedule_id),
        ));
    return gs.length > 0;
  } catch (error) {
    throw new DatabaseError('Failed to check writer permissions', error);
  }
}

export async function new_schedule(form: FormData, username: string) {
  try {
    const data = scheduleInsertSchema.parse({
      name: form.get("name"),
      description: form.get("description")
    });

    const new_s = await db.insert(schedule).values(data).returning();
    if (!new_s.length) {
      throw new DatabaseError('Failed to create schedule');
    }

    await db.insert(scheduleToGroup)
      .values({ schedule_id: new_s[0].id, groupname: username, write: true });

    return new_s[0];
  } catch (error) {
    if (error instanceof DatabaseError) throw error;
    if (error instanceof Error && error.name === 'ZodError') {
      throw new ValidationError('Invalid schedule data');
    }
    throw new DatabaseError('Failed to create schedule', error);
  }
}

export async function update_schedule(form: FormData, username: string) {
  try {
    const scheduleIdRaw = form.get("id")?.toString();
    if (!scheduleIdRaw) {
      throw new ValidationError('Schedule ID is required');
    }

    const schedule_id = parseInt(scheduleIdRaw);
    if (isNaN(schedule_id)) {
      throw new ValidationError('Invalid schedule ID');
    }

    const writer = await is_writer(schedule_id, username);
    if (!writer) {
      throw new AuthorizationError('User does not have write permission');
    }

    const data = scheduleUpdateSchema.parse({
      name: form.get("name"),
      description: form.get("description"),
      id: schedule_id
    });

    const updated = await db.update(schedule).set(data).where(eq(schedule.id, schedule_id)).returning({ id: schedule.id });
    if (!updated.length) {
      throw new DatabaseError('Failed to update schedule');
    }
    //update reader and writer group
    const readers_group = form.getAll("readers");
    const writer_group = form.get("writer");
      console.log("writer", writer_group)
    if (readers_group.length > 0) {
      // first let's remove all the reader groups
      await db.delete(scheduleToGroup).where(and(eq(scheduleToGroup.schedule_id, schedule_id), eq(scheduleToGroup.write, false))).returning();
      // then add the new reader groups
      readers_group.forEach(async (g) => {
      await db.insert(scheduleToGroup)
        .values({ schedule_id: schedule_id, groupname: g.toString(), write: false })
        .onConflictDoNothing();
      })
    }
    if (writer_group) {
      // first set any other writer group to false
      await db.update(scheduleToGroup).set({ write: false }).where(eq(scheduleToGroup.schedule_id, schedule_id));
      // then set the new writer group to true
      await db.insert(scheduleToGroup)
        .values({ schedule_id: schedule_id, groupname: writer_group.toString(), write: true })
        .onConflictDoUpdate({
          target: [scheduleToGroup.schedule_id, scheduleToGroup.groupname],
          set: {
            write: true
          }
        });
    }

    return updated[0];
  } catch (error) {
    if (error instanceof DatabaseError ||
      error instanceof AuthorizationError ||
      error instanceof ValidationError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'ZodError') {
      throw new ValidationError('Invalid schedule data');
    }
    throw new DatabaseError('Failed to update schedule', error);
  }
}

export async function delete_schedule(form: FormData, username: string) {
  try {
    const scheduleIdRaw = form.get("id")?.toString();
    if (!scheduleIdRaw) {
      throw new ValidationError('Schedule ID is required');
    }

    const schedule_id = parseInt(scheduleIdRaw);
    if (isNaN(schedule_id)) {
      throw new ValidationError('Invalid schedule ID');
    }

    const writer = await is_writer(schedule_id, username);
    if (!writer) {
      throw new AuthorizationError('User does not have write permission');
    }
    const delete_schedule_to_group = await db.delete(scheduleToGroup).where(eq(scheduleToGroup.schedule_id, schedule_id)).returning();
    if (!delete_schedule_to_group.length) {
      throw new DatabaseError('Failed to delete schedule');
    }
    const delete_tasks = await db.delete(task).where(eq(task.schedule_id, schedule_id))
    const deleted = await db.delete(schedule).where(eq(schedule.id, schedule_id)).returning();
    if (!deleted.length) {
      throw new DatabaseError('Failed to delete schedule');
    }
    return deleted[0];
  } catch (error) {
    if (error instanceof DatabaseError || error instanceof AuthorizationError) {
      throw error;
    }
    throw new DatabaseError('Failed to delete schedule', error);
  }
}

export async function new_task(form: FormData, username: string) {
  try {
    const scheduleIdRaw = form.get("schedule_id")?.toString();
    if (!scheduleIdRaw) {
      throw new ValidationError('Schedule ID is required');
    }

    const schedule_id = parseInt(scheduleIdRaw);
    if (isNaN(schedule_id)) {
      throw new ValidationError('Invalid schedule ID');
    }

    const writer = await is_writer(schedule_id, username);
    if (!writer) {
      throw new AuthorizationError('User does not have write permission');
    }

    let data = taskInsertSchema.parse({
      name: form.get("name"),
      description: "",
      start: parseInt(form.get("start")?.toString() ?? ""),
      duration: parseInt(form.get("duration")?.toString() ?? ""),
      schedule_id,
      category_id: parseInt(form.get("category")?.toString() ?? ""),
    });

    const taskIdRaw = form.get("id")?.toString();
    if (taskIdRaw) {
      const task_id = parseInt(taskIdRaw);
      if (!isNaN(task_id)) {
        data = { ...data, id: task_id };
      }
    }

    const new_task = await db
      .insert(task)
      .values(data)
      .onConflictDoUpdate({
        target: task.id,
        set: {
          name: data.name,
          description: data.description,
          schedule_id: data.schedule_id,
          category_id: data.category_id,
          start: data.start,
          duration: data.duration
        }
      })
      .returning();

    if (!new_task.length) {
      throw new DatabaseError('Failed to create/update task');
    }

    return new_task[0];
  } catch (error) {
    if (error instanceof DatabaseError ||
      error instanceof AuthorizationError ||
      error instanceof ValidationError) {
      throw error;
    }
    if (error instanceof Error && error.name === 'ZodError') {
      throw new ValidationError('Invalid task data');
    }
    throw new DatabaseError('Failed to create/update task', error);
  }
}
export async function delete_task(form: FormData, username: string) {
  try {
    const scheduleIdRaw = form.get("schedule_id")?.toString();
    if (!scheduleIdRaw) {
      throw new ValidationError('Schedule ID is required');
    }

    const schedule_id = parseInt(scheduleIdRaw);
    if (isNaN(schedule_id)) {
      throw new ValidationError('Invalid schedule ID');
    }

    const writer = await is_writer(schedule_id, username);
    if (!writer) {
      throw new AuthorizationError('User does not have write permission');
    }

    const task_id = parseInt(form.get("id")?.toString() ?? "");
    if (isNaN(schedule_id)) {
      throw new ValidationError('Invalid schedule ID');
    }

    const deleted = await db.delete(task).where(eq(task.id, task_id)).returning();
    if (!deleted.length) {
      throw new DatabaseError('Failed to delete schedule');
    }
    return deleted[0];
  } catch (error) {
    if (error instanceof DatabaseError || error instanceof AuthorizationError) {
      throw error;
    }
    throw new DatabaseError('Failed to delete schedule', error);
  }
}

export async function new_group(form: FormData, username: string) {
  const data = groupInsertSchema.parse({
    name: form.get("name"),
  });
  const new_group = await db.insert(group).values(data).returning();
  if (new_group.length === 1) {
    await db.insert(userToGroup).values({ username: username, groupname: new_group[0].name, admin: true })
  }
}

export async function add_user(form: FormData, username: string) {
  const data = userToGroupInsertSchema.parse({
    username: form.get("username"),
    groupname: form.get("groupname"),
    admin: false
  });
  const new_user = await db.insert(userToGroup).values(data).returning();
  return new_user;
}

export async function kick_user(form: FormData, username: string) {
  const data = userToGroupInsertSchema.parse({
    username: form.get("username"),
    groupname: form.get("groupname"),
    admin: false
  });
  const new_user = await db.delete(userToGroup).where(eq(userToGroup.username, data.username)).returning();
  return new_user;
}

export async function admin_user(form: FormData, username: string) {
  const data = userToGroupInsertSchema.parse({
    username: form.get("username"),
    groupname: form.get("groupname"),
    admin: true
  });
  const new_user = await db.update(userToGroup).set({ admin: true }).where(eq(userToGroup.username, data.username)).returning();
  return new_user;
}

export async function unadmin_user(form: FormData, username: string) {
  const data = userToGroupInsertSchema.parse({
    username: form.get("username"),
    groupname: form.get("groupname"),
    admin: false
  });
  const new_user = await db.update(userToGroup).set({ admin: false }).where(eq(userToGroup.username, data.username)).returning();
  return new_user;
}

export async function get_schedules(username: string) {
  const s = await db.select()
    .from(schedule)
    .leftJoin(scheduleToGroup, eq(scheduleToGroup.schedule_id, schedule.id))
    .leftJoin(userToGroup, eq(userToGroup.groupname, scheduleToGroup.groupname))
    .where(eq(userToGroup.username, username))

  // for each schedule get the reader groups and writer groups
  const out = s.reduce<Record<string, { name: string, id: number, description: string, readers: string[], writer: string }>>(
    (acc, row) => {
      const sch = row.schedule;
      const sg = row.schedule_group;
      const ug = row.user_group;
      if (!acc[sch.name]) {
        acc[sch.name] = { ...sch, description: sch.description ?? "", readers: [], writer: "" };
      }
      if (sg) {
        if (sg.write) {
          acc[sch.name].writer = sg.groupname
        } else {
          acc[sch.name].readers.push(sg.groupname)
        }
      }
      if (ug && ug.admin) {
        acc[sch.name].writer = ug.groupname
      }
      return acc
    },
    {}
  );
  return new Map(Object.entries(out));
}

export async function get_all_users() {
  const users = await db.select().from(user);
  return users.map((u) => u.name) as string[];
}

export async function get_groups(username: string) {
  const g = await db.select()
    .from(group)
    .leftJoin(userToGroup, eq(group.name, userToGroup.groupname))
  const out = g.reduce<Record<string, { admins: string[], members: string[] }>>(
    (acc, row) => {
      const gr = row.group;
      const ug = row.user_group;
      if (!acc[gr.name]) {
        acc[gr.name] = { admins: [], members: [] };
      }
      if (ug) {
        if (ug.admin) {
          acc[gr.name].admins.push(ug.username)
        } else {
          acc[gr.name].members.push(ug.username)
        }
      }
      return acc
    },
    {}
  );
  return new Map(Object.entries(out))
}

export async function get_tasks(username: string) {
  const t = await db.select()
    .from(task)
    .leftJoin(schedule, eq(schedule.id, task.schedule_id))
    .leftJoin(scheduleToGroup, eq(scheduleToGroup.schedule_id, schedule.id))
    .leftJoin(userToGroup, eq(userToGroup.groupname, scheduleToGroup.groupname))
    .where(eq(userToGroup.username, username))
  return t.map((tt) => tt.task);
}

export async function get_categories() {
  const t = await db.select()
    .from(category)
  return new Map(t.map((tt) => [tt.id, tt.name]));
}

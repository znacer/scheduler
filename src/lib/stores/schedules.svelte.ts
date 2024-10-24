import { SvelteMap, SvelteSet } from "svelte/reactivity";
import { arrange_schedule_lines, tasks_store } from "./tasks.svelte";

export enum ColorPalette {
  NEUTRAL = '#404040',
  STONE = '#44403c',
  RED = '#b91c1c',
  ORANGE = '#c2410c',
  YELLOW = '#a16207',
  LIME = '#15803d',
  EMERALD = '#047857',
  SKY = '#0369a1',
  PURPLE = '#7e22ce',
}
export const colorHashMap: Map<string, ColorPalette> = new Map(Object.entries(ColorPalette));
export function random_color(): ColorPalette {
  return Object.values(ColorPalette)[Math.floor(Math.random() * Object.keys(ColorPalette).length)];
}

export type Tasks = SvelteSet<number>

export interface Schedule {
  id: number
  name?: string,
  tasks: Tasks,
}

export function create_schedules() {
  let schedules: SvelteMap<number, Schedule> = $state(new SvelteMap());
  let checked: SvelteMap<number, boolean> = $state(new SvelteMap())
  let lines_task: SvelteMap<number, number> = $state(new SvelteMap());
  let lines_max: SvelteMap<number, number> = $state(new SvelteMap())

  function schedule_by_id(id: number): Schedule | undefined {
    return schedules.get(id);
  }

  function append(new_schedule: Schedule) {
    schedules.set(new_schedule.id, new_schedule);
    checked.set(new_schedule.id, true); //default to visible
  }

  function add_schedules(new_schedules: Schedule[]) {
    schedules = new SvelteMap();
    new_schedules.forEach((s) => { append(s) })
  }

  function ids() {
    return [...schedules.keys()]
  }

  function tasks(schedule_id: number): Tasks {
    let s = schedules.get(schedule_id);
    if (s) {
      return s.tasks;
    } else {
      return new SvelteSet()
    }

  }


  function arrange_lines(schedule_id: number): Map<number, number> {
    const out = arrange_schedule_lines(tasks_store.from_schedule(schedule_id));
    out.forEach((v, k) => { lines_task.set(k, v) });
    const nb = [...out.values()].reduce((p, c) => Math.max(p, c));
    lines_max.set(schedule_id, nb);
    return out;
  }

  function nb_lines(schedule_id: number): number {
    let nb = lines_max.get(schedule_id);
    if (nb) {
      return nb;
    } else {
      return 0;
    }
  }

  function task_line(task_id: number): number {
    let l = lines_task.get(task_id);
    if (l) {
      return l;
    } else {
      return 0;
    }
  }
  // function arrange_lines(schedule_id: number) {
  //   // attribute a line to each task such as they do not over lap.
  //   // returns the number of line needed
  //   let visited_tasks: number[] = [];
  //   let m_nb_lines = 1;
  //   let s_tasks = schedules.get(schedule_id)?.tasks;
  //   if (s_tasks === undefined) {
  //     return 0;
  //   }
  //   const tasks = new Map<number, Task>();
  //   s_tasks.forEach((t) => { tasks.set(t.id, t) });
  //   [...tasks.values()].sort((t1: Task, t2: Task) => t1.start - t2.start).forEach(
  //     (t, idx) => {
  //       if (idx !== 0) {
  //         //check with how many previous tasks do this on instersects with
  //         const intersect = visited_tasks.filter((t_id) => {
  //           const i_task = tasks.get(t_id);
  //           if (i_task) {
  //             return i_task.start + i_task.duration > t.start
  //           } else {
  //             return false;
  //           }
  //         });
  //         let affected = false;
  //         for (let i = 0; i <= m_nb_lines; i++) {
  //           const is_taken = intersect.filter((t_id) => tasks.get(t_id)?.line === i);
  //           if (is_taken.length === 0) {
  //             tasks.set(t.id, {
  //               ...t,
  //               line: i,
  //             });
  //             affected = true;
  //             break;
  //           }
  //         }
  //         if (!affected) {
  //           m_nb_lines += 1
  //           tasks.set(t.id, {
  //             ...t,
  //             line: m_nb_lines,
  //           });
  //         }
  //       } else {
  //         tasks.set(t.id, { ...t, line: 0 });
  //       }
  //       visited_tasks.push(t.id);
  //     }
  //   );
  //   schedules.set(schedule_id, { ...schedules.get(schedule_id), tasks } as Schedule)
  //   private_nb_lines.set(schedule_id, m_nb_lines + 1);
  // }

  function check(id: number) {
    let s = schedules.get(id);
    if (s) {
      checked.set(s.id, true)
    }
  }
  function uncheck(id: number) {
    let s = schedules.get(id);
    if (s) {
      checked.set(s.id, false)
    }
  }

  function is_check(id: number): boolean {
    let out = checked.get(id);
    if (out) {
      return out
    }
    return false;
  }

  function name(id: number): string {
    let s = schedules.get(id);
    if (s) {
      if (s.name) {
        return s.name;
      }
      return s.id.toString();
    }
    return "";
  }
  function are_checked(): SvelteMap<number, boolean> {
    return checked
  }

  function set_task(schedule_id: number, task: number) {
    let s = schedules.get(schedule_id);
    if (s) {
      s.tasks.add(task);
      schedules.set(schedule_id, s);
    }
  }

  return {
    get schedules() { return schedules; },
    schedule_by_id,
    append,
    add_schedules,
    ids,
    tasks,
    check,
    uncheck,
    is_check,
    are_checked,
    name,
    set_task,
    arrange_lines,
    nb_lines,
    task_line
  }
}

export const schedules_store = create_schedules();

import { pgTable, integer, varchar, boolean, primaryKey, serial } from 'drizzle-orm/pg-core';
import { group } from './group';
import { schedule } from './schedule';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { relations } from 'drizzle-orm';

export const scheduleToGroup = pgTable('schedule_group', {
	schedule_id: integer().notNull().references(() => schedule.id, { onDelete: "cascade", onUpdate: "cascade" }),
	groupname: varchar().notNull().references(() => group.name, { onDelete: "cascade", onUpdate: "cascade" }),
	write: boolean().notNull(),
}, (table) => [primaryKey({ columns: [table.schedule_id, table.groupname] })]);

export const scheduleToGroupSchema = createSelectSchema(scheduleToGroup);
export const scheduleToGroupInsertSchema = createInsertSchema(scheduleToGroup);
export const scheduleToGroupUpdateSchema = createUpdateSchema(scheduleToGroup);

export const scheduleRelations = relations(schedule, ({ many }) => ({
	scheduleToGroup: many(scheduleToGroup)
}));
export const groupScheduleRelations = relations(group, ({ many }) => ({
	scheduleToGroup: many(scheduleToGroup)
}));
export const scheduleToGroupRelations = relations(scheduleToGroup, ({ one }) => ({
	group: one(group, {
		fields: [scheduleToGroup.groupname],
		references: [group.name]
	}),
	schedule: one(schedule, {
		fields: [scheduleToGroup.schedule_id],
		references: [schedule.id]
	})
}))


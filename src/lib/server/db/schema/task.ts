import { pgTable, integer, varchar, text, bigint, serial } from 'drizzle-orm/pg-core';
import { category } from './category';
import { schedule } from './schedule';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

export const task = pgTable('task', {
	id: serial().primaryKey(),
	name: varchar().notNull(),
	start: bigint({ mode: "number" }).notNull(),
	duration: bigint({ mode: "number" }).notNull(),
	description: text(),
	category_id: integer().references(() => category.id).notNull(),
	schedule_id: integer().references(() => schedule.id).notNull(),
})

export const taskSchema = createSelectSchema(task);
export const taskInsertSchema = createInsertSchema(task);
export const taskUpdateSchema = createUpdateSchema(task);

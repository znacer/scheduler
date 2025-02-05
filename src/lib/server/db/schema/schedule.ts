import { pgTable, integer, varchar, text, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

export const schedule = pgTable('schedule', {
	id: serial().primaryKey(),
	name: varchar().notNull(),
	description: text()
})

export const scheduleSchema = createSelectSchema(schedule);
export const scheduleInsertSchema = createInsertSchema(schedule);
export const scheduleUpdateSchema = createUpdateSchema(schedule);

import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

export const group = pgTable('group', {
	id: serial('id').primaryKey(),
	name: varchar().unique().notNull(),
})
export const groupSchema = createSelectSchema(group);
export const groupInsertSchema = createInsertSchema(group);
export const groupUpdateSchema = createUpdateSchema(group);

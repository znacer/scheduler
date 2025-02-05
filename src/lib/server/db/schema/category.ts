import { pgTable, varchar, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

export const category = pgTable('category', {
	id: serial().primaryKey(),
	name: varchar().notNull().unique()
})

export const categorySchema = createSelectSchema(category);
export const categoryInsertSchema = createInsertSchema(category);
export const categoryUpdateSchema = createUpdateSchema(category);

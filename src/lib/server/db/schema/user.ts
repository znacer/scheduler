import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	name: varchar().unique(),
});

export const userSchema = createSelectSchema(user);
export const userInsertSchema = createInsertSchema(user);
export const userUpdateSchema = createUpdateSchema(user);

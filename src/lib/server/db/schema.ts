import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
	id: text('id').primaryKey(),
	username: text('username'),
});

export const sessionTable = pgTable("session", {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => userTable.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof sessionTable.$inferSelect;

export type User = typeof userTable.$inferSelect;

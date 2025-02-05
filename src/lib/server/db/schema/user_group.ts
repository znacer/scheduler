import { pgTable, integer, varchar, boolean, primaryKey, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { user } from './user';
import { group } from './group';
import { relations } from 'drizzle-orm';

export const userToGroup = pgTable('user_group', {
	username: varchar().references(() => user.name, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
	groupname: varchar().references(() => group.name, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
	admin: boolean().notNull(),
}, (table) => [primaryKey({ columns: [table.username, table.groupname] })]);

export const userToGroupSchema = createSelectSchema(userToGroup);
export const userToGroupInsertSchema = createInsertSchema(userToGroup);
export const userToGroupUpdateSchema = createUpdateSchema(userToGroup);

export const userRelations = relations(user, ({ many }) => ({
	userToGroup: many(userToGroup)
}));
export const groupUserRelations = relations(group, ({ many }) => ({
	userToGroup: many(userToGroup)
}));
export const userToGroupRelations = relations(userToGroup, ({ one }) => ({
	group: one(group, {
		fields: [userToGroup.groupname],
		references: [group.name]
	}),
	user: one(user, {
		fields: [userToGroup.username],
		references: [user.name]
	})
}))


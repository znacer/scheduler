import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./db/schema";

export async function createUser(keycloakId: string, username: string): Promise<User> {

	const row = await db.insert(schema.userTable).values([{
		id: keycloakId,
		username
	}]).returning();
	if (row === null) {
		throw new Error("Unexpected error");
	}
	const user: User = {
		id: keycloakId,
		keycloakId,
		username
	};
	return user;
}

export async function getUserFromkeycloakId(keycloakId: string): Promise<User | null> {
	const query = await db.select().from(schema.userTable).where(eq(schema.userTable.id, keycloakId.toString()));
	const row = query[0];

	if (row === null) {
		return null;
	}
	if (row.username === null) {
		return null
	}
	const user: User = {
		id: row.id,
		keycloakId: row.id,
		username: row.username
	};
	return user;
}

export interface User {
	id: string;
	keycloakId: string;
	username: string;
}

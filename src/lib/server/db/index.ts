import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import * as userToGroup from './schema/user_group';
import * as user from './schema/user';
import * as group from './schema/group';
import * as schedule from './schema/schedule';
import * as scheduleToGroup from './schema/schedule_group';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
	logger: true,
	schema: { ...userToGroup, ...user, ...group, ...scheduleToGroup, ...schedule }
});


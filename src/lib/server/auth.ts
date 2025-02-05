import { env } from "$env/dynamic/private";
import * as arctic from "arctic";
export interface User {
	username?: string;
	name?: string;
	email?: string;
	avatarUrl?: string;
	token: string;

	// Session identifier, stored in the cookie
	session: string;
}

const realmURL = "https://sso.apps.colbert.marine.defensecdd.gouv.fr/auth/realms/colbert";
const cliendId = "colbert-sso-datagrid";
export const clientSecret = ""
export const keycloak = new arctic.KeyCloak(realmURL, cliendId, clientSecret, `${env.APP_URL}/login/keycloak/callback`);
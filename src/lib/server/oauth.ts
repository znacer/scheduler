import { KeyCloak } from "arctic";
import { env } from "$env/dynamic/private";

export const keycloak = new KeyCloak(env.REALM_URL, env.KEYCLOAK_CLIENT_ID, env.KEYCLOAK_CLIENT_SECRET, `${env.APP_URL}/login/keycloak/callback`);

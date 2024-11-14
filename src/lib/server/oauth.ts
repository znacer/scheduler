import { KeyCloak } from "arctic";
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET, REALM_URL } from "$env/static/private";

export const keycloak = new KeyCloak(REALM_URL, KEYCLOAK_CLIENT_ID, KEYCLOAK_CLIENT_SECRET, "http://localhost:5173/login/keycloak/callback");

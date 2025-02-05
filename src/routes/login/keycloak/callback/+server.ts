import { keycloak } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { type OAuth2Tokens } from "arctic"
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema/user";
import { userToGroup } from "$lib/server/db/schema/user_group";
import { group } from "$lib/server/db/schema/group";

export async function GET(event: RequestEvent): Promise<Response> {
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");
    const storedState = event.cookies.get("keycloak_auth_state") ?? null;
    const code_verifier = event.cookies.get("keycloak_auth_code_verifier") ?? null;

    if (code === null || state === null || storedState === null || code_verifier === null) {
        return new Response("null", {
            status: 400
        })
    }
    if (state !== storedState) {
        event.cookies.delete("keycloak_auth_state", {
            httpOnly: true,
            path: "/",
            secure: import.meta.env.PROD,
            sameSite: "lax"

        });
        return new Response("state is different", {
            status: 400
        })
    }

    let tokens: OAuth2Tokens;
    let username: string;
    try {
        tokens = await keycloak.validateAuthorizationCode(code, code_verifier)
        let accessToken = tokens.accessToken()
        event.cookies.set("session", accessToken, {
            httpOnly: true,
            path: "/",
            secure: import.meta.env.PROD,
            sameSite: "lax"
        })
        username = JSON.parse(atob(accessToken.split(".")[1]))["preferred_username"]
    } catch (e) {
        event.cookies.delete("keycloak_auth_state", {
            httpOnly: true,
            path: "/",
            secure: import.meta.env.PROD,
            sameSite: "lax"

        });
        event.cookies.delete("keycloak_auth_code_verifier", {
            httpOnly: true,
            path: "/",
            secure: import.meta.env.PROD,
            sameSite: "lax"

        });
        throw e;
    }

        await db.insert(user).values({ name: username }).onConflictDoNothing()
        await db.insert(group).values({ name: username }).onConflictDoNothing()
        await db.insert(userToGroup).values({ username, groupname: username, admin: true }).onConflictDoNothing()

        event.cookies.set("username", username, {
            httpOnly: true,
            secure: import.meta.env.PROD,
            path: "/",
            sameSite: "lax"
        })
    
    return redirect(302, "/")
}

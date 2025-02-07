import { keycloak } from "$lib/server/auth"
import { generateCodeVerifier, generateState } from "arctic"
import type { RequestEvent } from "./$types"
import { redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema/user";
import { userToGroup } from "$lib/server/db/schema/user_group";
import { group } from "$lib/server/db/schema/group";

export async function GET(event: RequestEvent) {
    const state = generateState();
    const scopes = ["openid", "profile"];
    const code_verifier = generateCodeVerifier();
    const url = keycloak.createAuthorizationURL(state, code_verifier, scopes);

    event.cookies.set("keycloak_auth_state", state, {
        httpOnly: true,
        maxAge: 60 * 10,
        secure: import.meta.env.PROD,
        path: "/",
        sameSite: "lax"
    })

    event.cookies.set("keycloak_auth_code_verifier", code_verifier, {
        httpOnly: true,
        maxAge: 60 * 10,
        secure: import.meta.env.PROD,
        path: "/",
        sameSite: "lax"
    })
    if (env.SECURED === "UNSECURED") {
        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJqb2huLmRvZSJ9.eJfTn9ZLePPrBD-ia7GCadbA9jr6DRgNJ68D8WDohVo"
        event.cookies.set("session", access_token, {
            httpOnly: true,
            path: "/",
            secure: import.meta.env.PROD,
            sameSite: "lax"
        })
        const username: string = JSON.parse(atob(access_token.split(".")[1]))["preferred_username"]

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
    return redirect(302, url)
}

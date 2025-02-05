import { fail, redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent } from './$types';

export async function load(event: RequestEvent) {
    if (event.cookies.get("session") === undefined) {
        return redirect(302, "/login");
    } else {
        return redirect(302, "/app");
    }
}

export const actions: Actions = {
    default: (event: RequestEvent) => {
        if (event.locals.session === null) {
            return fail(401);
        }
        event.cookies.set("session", "", {
            httpOnly: true,
            path: "/",
            secure: import.meta.env.PROD,
            sameSite: "lax",
            maxAge: 0
        })
        return redirect(302, "/login");
    }
}
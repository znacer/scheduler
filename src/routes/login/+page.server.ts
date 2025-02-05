import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function load(event: RequestEvent) {
    if (event.locals.session !== null && event.locals.user !== null) {
        if (event.locals.session !== undefined && event.locals.user !== undefined) {
            return redirect(302, "/");
        }
    }
    return redirect(302, "/login/keycloak")
}
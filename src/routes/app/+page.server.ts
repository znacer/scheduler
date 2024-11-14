import { fail, redirect } from "@sveltejs/kit";
import type { Actions, RequestEvent } from "./$types";
import { deleteSessionTokenCookie, invalidateSession } from "$lib/server/session";


export const actions: Actions = {
	default: action
};

async function action(event: RequestEvent) {
	if (event.locals.session === null) {
		return fail(401);
	}
	invalidateSession(event.locals.session.id);
	deleteSessionTokenCookie(event);
	return redirect(302, "/login");
}

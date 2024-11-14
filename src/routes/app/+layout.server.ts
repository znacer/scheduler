import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }: any) => {
	console.log(locals)
	if (!locals.user) {
		return redirect(302, "/login");
	}

	return {
		user: locals.user
	};
};

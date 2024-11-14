import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }: any) => {
	console.log(locals)
	if (!locals.user) {
		return redirect(302, "/login");
	}

		return redirect(302, "/app");
};

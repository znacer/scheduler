import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }: any) => {
	// if (!locals.user) {
	// 	return redirect(302, "/login");
	// }

	return {
		user: locals.user
	};
};

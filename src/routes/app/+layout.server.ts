import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { get_all_users, get_categories, get_groups, get_schedules, get_tasks } from "$lib/server/db/utils";

export const load: LayoutServerLoad = async ({ cookies, depends, route }) => {
	depends("app:dataload");
	if (cookies.get("session") === undefined) {
		return redirect(302, "/login");
	}
	const username = cookies.get("username");
	if (!username) {
		redirect(300, "/");
	}

	const users = await get_all_users();
	// if username not in the database removes cookie and redirects to login page
	if (users.find((user) => user === username) === undefined) {
		cookies.delete("session", { path: "/" });
		cookies.delete("username", { path: "/" });
		return redirect(302, "/login");
	}


	const schedules = await get_schedules(username);
	const groups = await get_groups(username);
	const tasks = await get_tasks(username);
	const categories = await get_categories();

	return {
		groups,
		users,
		schedules,
		tasks,
		categories,
		route: route.id,
		username
	}
};

import { env } from "$env/dynamic/public";
import type { Group } from "$lib/components/ui/command";
import type { User } from "$lib/stores/users.svelte";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	let user_groups: Group[] = [];
	let users: User[] = [];
	try {

		const res = await fetch(`${env.PUBLIC_BACKEND_URL}/list-my-groups`);
		user_groups = await res.json();

	} catch {

	}
	const res = await fetch(`${env.PUBLIC_BACKEND_URL}/list-users`)
	users = await res.json();

	return {
		user_groups,
		users
	}
};

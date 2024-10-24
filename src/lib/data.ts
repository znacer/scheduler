import { schedules_store } from "$lib/stores/schedules.svelte";
import { tasks_store, type Task } from "$lib/stores/tasks.svelte";
import { SvelteSet } from "svelte/reactivity";

interface TaskApiModel {
	id: number,
	name: string,
	description: string,
	start: number,
	duration: number
}

interface ScheduleApiModel {
	id: number,
	name: string,
	tasks: TaskApiModel[]
}

export function test_producer(nb_objects: number): TaskApiModel[] {
	const initial_timestamp = 1729468800000;
	const objects = [];
	for (let i = 0; i < nb_objects; i++) {
		const id = Math.floor(Math.random() * 1789);
		const name = `Task ${i + 1}`;
		const description = `Description de l'objet ${i + 1}`;
		const start = initial_timestamp + (Math.random() * 43200000); // timestamp aléatoire dans les 24 prochaines heures
		const duration = Math.floor(Math.random() * 21) * 900000 + 900000; // durée aléatoire entre 15 minutes et 6 heures
		objects.push({ id, name, description, start, duration });
	}
	return objects;
}

export async function get_schedules() {
	let data = await fetch_data();
	data.forEach((s: ScheduleApiModel) => {
		schedules_store.append({
			id: s.id,
			name: s.name,
			tasks: new SvelteSet<number>(),
		})
		s.tasks.forEach((t) => {
			tasks_store.append({
				id: t.id,
				name: t.name,
				schedule_id: s.id,
				start: t.start,
				duration: t.duration
			})
			schedules_store.set_task(s.id, t.id);
		})
	});
}
async function fetch_data(): Promise<ScheduleApiModel[]> {
	const response = await fetch("/test");
	const data = await response.json();
	return data;
}


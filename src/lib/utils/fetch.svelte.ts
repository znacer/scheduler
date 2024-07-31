import { TaskElement, subrowingTasks } from '$lib/stores/tasks.svelte';
import { tasks } from '$lib/stores/tasks.svelte';

export async function events() {
	if (tasks.size() === 0) {
		const response = await fetch('/test');
		let getRows: { [k: string]: string | Date | string[] }[] = await response.json();
		if (response.ok) {
			// tasks.splice(0, tasks.size); // makes sure there is no previous data in the array
			getRows.forEach((row: { [k: string]: any }) => {
				let newTask = new TaskElement(
					row["name"],
					row["start"],
					row["end"],
					row["ships"]
				);
				tasks.set(newTask);
			});
			subrowingTasks(tasks.tasks)
			tasks.computeShips();
		} else {
			throw new Error('InvalidJSON');
		}
	}
}

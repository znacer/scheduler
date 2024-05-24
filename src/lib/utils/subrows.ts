import { TaskElement } from "$lib/stores/events";

export function subrowingTasks(tasks: TaskElement[], existingSubrows: TaskElement[][] = []): TaskElement[][] {
	// If no existing subrows, create an empty one
	if (!existingSubrows.length) {
		existingSubrows = [[]];
	}
	// Iterate over the tasks
	for (const task of tasks) {
		// Find the first subrow where the task doesn't intersect with any existing task
		let subrowIndex = -1;
		for (let i = 0; i < existingSubrows.length; i++) {
			const subrow = existingSubrows[i];
			let intersects = false;
			for (const existingTask of subrow) {
				if (task.intersect(existingTask)) {
					intersects = true;
					break;
				}
			}
			if (!intersects) {
				subrowIndex = i;
				break;
			}
		}

		// If no suitable subrow found, create a new one
		if (subrowIndex === -1) {
			existingSubrows.push([task]);
		} else {
			// Add the task to the suitable subrow
			existingSubrows[subrowIndex].push(task);
		}
	}

	return existingSubrows;
}



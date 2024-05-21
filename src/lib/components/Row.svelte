<script lang="ts">
	import { date2pos } from '$lib/utils/date2pos';
	import { subrowingTasks } from '$lib/utils/subrows';
	import { startDate, endDate, pixelWidth } from '$lib/stores/layout';
	import Task from './Task.svelte';
	import { TaskElement, taskExample } from '$lib/stores/events';
	import { onMount } from 'svelte';
	import { format, formatISO, startOfDay } from 'date-fns';

	let tasks: TaskElement[][] = [[$taskExample]];
	async function events() {
		const response = await fetch('/test');
		let taskList: TaskElement[] = await response.json();
		if (response.ok) {
			taskList = taskList.map((task) => new TaskElement(task.name, task.start, task.end));
			tasks = subrowingTasks(taskList);
			return tasks;
		} else {
			throw new Error('' + tasks);
		}
	}
	onMount(events);
</script>

<div style:width="90%" style:height="100px" bind:clientWidth={$pixelWidth} class="row">
	{#each tasks as subrow, i}
		{#each subrow as task}
			<Task
				posY={i * 50}
				pixelWidth={$pixelWidth}
				startDate={$startDate}
				endDate={$endDate}
				{task}
			/>
		{/each}
	{/each}
</div>

<style>
</style>

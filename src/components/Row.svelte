<script lang="ts">
	import { date2pos } from '$lib/utils';
	import { startDate, endDate, pixelWidth } from '../stores/layout';
	import Task from './Task.svelte';
	import { TaskElement, taskExample } from '../stores/events';
	import { onMount } from 'svelte';
	import { format, formatISO, startOfDay } from 'date-fns';

	let tasks: Array<TaskElement> = [$taskExample];
	async function events() {
		const response = await fetch('/test');
		tasks = await response.json();
		if (response.ok) {
			tasks = tasks.map((task) => new TaskElement(task.name, task.start, task.end));
			return tasks;
		} else {
			throw new Error(tasks);
		}
	}
	onMount(events);
</script>

<div style:width="90%" style:height="100px" bind:clientWidth={$pixelWidth} class="row">
	{#each tasks as task}
		<Task pixelWidth={$pixelWidth} startDate={$startDate} endDate={$endDate} {task} />
	{/each}
</div>

<style>
</style>

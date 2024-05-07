<script lang="ts">
	import { date2pos } from '$lib/utils';
	import { startDate, endDate, pixelWidth } from '../stores/layout';
	import Task from './Task.svelte';
	import { taskExample } from '../stores/events';
	import { onMount } from 'svelte';
	import { format, formatISO, startOfDay } from 'date-fns';

	let tasks = [$taskExample];
	async function events() {
		const response = await fetch('/test');
		tasks = await response.json();
		if (response.ok) {
			return tasks;
		} else {
			throw new Error(tasks);
		}
	}
	onMount(events);
</script>

<div
	style="
width: 100%;"
	bind:clientWidth={$pixelWidth}
	class="row"
>
	{#each tasks as task}
		<Task pixelWidth={$pixelWidth} startDate={$startDate} endDate={$endDate} {task} />
	{/each}
</div>

<style>
</style>

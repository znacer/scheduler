<script lang="ts">
	import { layoutDate, pixelWidth } from '$lib/stores/layout.svelte';
	import Task from './Task.svelte';
	import { tasks } from '$lib/stores/tasks.svelte';

	type RowProp = {
		name: string;
	};
	let { name }: RowProp = $props();
	let clientWidth = $state(0);
	$effect(() => {
		pixelWidth.pixelWidth = clientWidth;
	});
	let maxSubrows: number = tasks
		.shipsTasks(name)
		.reduce((acc, [_, task]) => Math.max(acc, task.subrow(name)), 1);
</script>

<div bind:clientWidth class="row">
	{#if tasks !== undefined}
		{#each tasks.shipsTasks(name) as [_, task]}
			{#if task !== undefined}
				{#if task.end > layoutDate.startDate && task.start < layoutDate.endDate}
					<Task task_id={task.id} subrow_id={task.subrow(name)} max_subrows={maxSubrows} />
				{/if}
			{/if}
		{/each}
	{/if}
</div>

<style>
	.row {
		height: 100px;
		max-height: 100px;
	}
</style>

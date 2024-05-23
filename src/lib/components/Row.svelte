<script lang="ts">
	import { startDate, endDate, pixelWidth } from '$lib/stores/layout';
	import Task from './Task.svelte';
	import { TaskElement } from '$lib/stores/events';

	export let tasks: TaskElement[][]; //= [[$taskExample]];
</script>

<div bind:clientWidth={$pixelWidth} class="row">
	{#if tasks !== undefined}
		{#each tasks as subrow, i}
			{#each subrow as task}
				<Task
					posY={i * (100 / tasks.length)}
					height={100 / tasks.length}
					pixelWidth={$pixelWidth}
					startDate={$startDate}
					endDate={$endDate}
					{task}
				/>
			{/each}
		{/each}
	{/if}
</div>

<style>
	.row {
		height: 100px;
	}
</style>

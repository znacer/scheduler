<script lang="ts">
	import { startDate, endDate, pixelWidth } from '$lib/stores/layout';
	import Task from './Task.svelte';
	import { TaskElement } from '$lib/stores/events';

	export let tasks: TaskElement[][]; //= [[$taskExample]];
</script>

<div
	style:width="90%"
	style:height="100px"
	style="min-width: 500px;"
	bind:clientWidth={$pixelWidth}
	class="row"
>
	{#if tasks !== undefined}
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
	{/if}
</div>

<style>
</style>

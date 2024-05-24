<script lang="ts">
	import TimeAxis from '$lib/components/TimeAxis.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import { TaskElement } from '$lib/stores/events';
	import type { RowContents } from '$lib/utils/types';

	let { rows } = $props();
</script>

<div id="main-grid">
	<div id="first-row" style:height="20px">
		<div id="row-holder"></div>
		<TimeAxis />
	</div>

	{#each rows as row}
		<div class="row-content" style:display="flex">
			<div class="row-name">
				<p>{row.name}</p>
			</div>
			<Timeline tasks={row.tasks as TaskElement[][]} />
		</div>
	{/each}
</div>

<style>
	#main-grid {
		border: 1px solid salmon;
	}
	#first-row {
		width: 100%;
		display: flex;
		top: 0px;
		border-bottom: 1px solid salmon;
	}
	.row-content {
		border-bottom: 1px solid salmon;
	}
	#row-holder,
	.row-name {
		width: 10%;
	}
	.row-name {
		height: 100px;
		align-content: center;
	}
</style>

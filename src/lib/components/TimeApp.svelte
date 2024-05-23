<script lang="ts">
	import TimeAxis from '$lib/components/TimeAxis.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import { TaskElement } from '$lib/stores/events';
	import { onMount } from 'svelte';
	import { subrowingTasks } from '$lib/utils/subrows';

	type RowsGet = {
		name: string;
		tasks: { name: string; start: Date; end: Date }[];
	};
	let rows: { name: string; tasks: TaskElement[][] }[];
	async function events() {
		const response = await fetch('/test');
		let getRows: RowsGet[] = await response.json();
		if (response.ok) {
			rows = [];
			getRows.forEach((row: RowsGet) => {
				let rowTasks = row.tasks.map((task: { name: string; start: Date; end: Date }) => {
					return new TaskElement(task.name, task.start, task.end);
				});
				rows.push({
					name: row.name,
					tasks: subrowingTasks(rowTasks)
				});
			});
			// return rows;
		} else {
			throw new Error('Did not got correct rows ' + rows);
		}
	}
	onMount(events);
</script>

<div id="main-grid">
	<div id="first-row" style:height="20px">
		<div id="row-holder"></div>
		<TimeAxis />
	</div>

	{#if rows !== undefined}
		{#each rows as row}
			<div class="row-content" style:display="flex">
				<div class="row-name">
					<p>{row.name}</p>
				</div>
				<Timeline tasks={row.tasks as TaskElement[][]} />
			</div>
		{/each}
	{/if}
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

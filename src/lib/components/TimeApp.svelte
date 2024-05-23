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
			console.log(rows);
			return rows;
		} else {
			throw new Error('rows are not ok' + rows);
		}
	}
	onMount(events);
</script>

<div id="main-grid" style:display="flex">
	<div id="row-titles" style:width="10%" style:height="100%" style:top="0px">
		<div
			id="row-holder"
			style:top="0px"
			style:height="20px"
			style:margin="0"
			style:padding="0"
		></div>
		{#if rows !== undefined}
			{#each rows as row}
				<div class="row-name">
					<p>{row.name}</p>
				</div>
			{/each}
		{/if}
	</div>
	<div id="row-content" style:width="90%">
		<TimeAxis />
		{#if rows !== undefined}
			{#each rows as row}
				<Timeline tasks={row.tasks as TaskElement[][]} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.row-name {
		height: 100px;
		border: 1px solid red;
		align-content: center;
	}
</style>

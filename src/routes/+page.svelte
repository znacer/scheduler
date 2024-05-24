<script lang="ts">
	import TimeApp from '$lib/components/TimeApp.svelte';
	import { setDefaultOptions } from 'date-fns';
	import { fr } from 'date-fns/locale';
	import { TaskElement } from '$lib/stores/events';
	import { subrowingTasks } from '$lib/utils/subrows';
	import type { RowContents, RowsGet } from '$lib/utils/types';
	import { rows } from '$lib/stores/rows.svelte';

	setDefaultOptions({ locale: fr });

	// let rows: RowContents[] = $state([]);
	async function events() {
		const response = await fetch('/test');
		let getRows: RowsGet[] = await response.json();
		if (response.ok) {
			// rows = [] as RowContents[];
			getRows.forEach((row: RowsGet) => {
				let rowTasks = row.tasks.map((task: { name: string; start: Date; end: Date }) => {
					return new TaskElement(task.name, task.start, task.end);
				});
				rows.push({
					name: row.name,
					tasks: subrowingTasks(rowTasks)
				});
			});
		} else {
			throw new Error('Did not got correct rows ' + rows);
		}
	}

	function onclick() {
		events();
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<button {onclick}>Fetch data</button>
	{#if rows !== undefined}
		<TimeApp {rows} />
	{/if}
</section>

<style>
	section {
		width: 100%;
	}
</style>

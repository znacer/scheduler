<script lang="ts">
	import TimeAxis from '$lib/components/TimeAxis.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import { TaskElement } from '$lib/stores/events';
	import { onMount } from 'svelte';
	import { subrowingTasks } from '$lib/utils/subrows';


	let tasks: TaskElement[][];
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

<div id="main-grid" style:display="flex">
	<div id="row-titles" style:width="10%" style:height="100%" style:top="0px">
		<div
			id="row-holder"
			style:top="0px"
			style:height="20px"
			style:margin="0"
			style:padding="0"
		></div>
		<div class="row-name">
			<p>Test</p>
		</div>
	</div>
	<div id="row-content" style:width="90%">
		<TimeAxis />
		<Timeline tasks={tasks}/>
	</div>
</div>

<style>
	.row-name {
		height: 100px;
		border: 1px solid red;
		align-content: center;
	}
</style>

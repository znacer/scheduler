<script lang="ts">
	import { format, parseISO } from 'date-fns';
	import { date2pos } from '$lib/utils/date2pos';
	import { TaskElement } from '$lib/stores/events';
	import Modal from './Modal.svelte';

	// export let startDate: Date;
	// export let endDate: Date;
	// export let task: TaskElement;
	// export let pixelWidth: number;
	// export let posY: number = 0;
	// export let height: number = 100 - posY;

	type MyProp = {
		startDate: Date|String,
		endDate: Date | String,
		task: TaskElement,
		pixelWidth: number,
		posY: number,
		height: number,
	}
	let {
		startDate,
		endDate,
		task = $bindable(), 
		pixelWidth,
		posY = 0,
		height = 100 - posY
	}: MyProp = $props();

	let posX = $derived(date2pos(task.start, startDate, endDate, pixelWidth));

	let width = $derived(
		date2pos(task.end, startDate, endDate, pixelWidth) -
			date2pos(task.start, startDate, endDate, pixelWidth)
	);

	let showModal = $state(false);
</script>

<div
	class="task"
	style:top={posY + 'px'}
	style:left={posX + 'px'}
	style:width={width + 'px'}
	style:height={height + 'px'}
	onclick={() => (showModal = true)}
	role="none"
>
	<p class="cardTitle" style="max-height: 30px;">{task.name}</p>
	<div style:overflow-y="auto" style:max-height={height - 32 + 'px'}>
		<p class="cardContent">
			{format(task.start, 'p')} <br />
			{format(task.end, 'p')}
		</p>
	</div>
</div>

<Modal bind:showModal>
	<form>
		<div>
			<label for="taskName">Task Name:</label>
			<input type="text" id="taskName" name="taskName" required bind:value={task.name} />
		</div>

		<div>
			<label for="startTime">Start Time:</label>
			<input type="text" id="startTime" name="startTime" bind:value={task.start} />
		</div>

		<div>
			<label for="endTime">End Time:</label>
			<input type="text" id="endTime" name="endTime" bind:value={task.end} />
		</div>
		<button onclick={() => console.log(task)}>Submit</button>
	</form>
</Modal>

<style>
	.task {
		position: absolute;
		background-color: darkslateblue;
		border: 1px solid red;
		border-radius: 1em;
		overflow-x: hidden;
	}
	.cardTitle {
		font-weight: 700;
		font-size: 0.7rem;
		color: darkgray;
		margin: 5px 10px 0px;
	}

	.cardContent {
		font-weight: 100;
		font-size: 0.7rem;
		color: lightgray;
		margin: 0px 10px 0px;
	}
</style>

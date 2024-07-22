<script lang="ts">
	import { date2pos } from '$lib/utils/date2pos';
	import Modal from './Modal.svelte';
	import { tasks } from '$lib/stores/tasks.svelte';
	// import TaskTooltip from './TaskTooltip.svelte';
	import { format } from 'date-fns';

	type MyProp = {
		task_id: string;
		subrow_id: number;
		max_subrows: number;
	};

	let { task_id, subrow_id, max_subrows }: MyProp = $props();
	let task = tasks.get(task_id);
	if (task === undefined) {
		throw new Error('TaskIdError');
	}
	let height = 100 / (max_subrows + 1);
	let posY = subrow_id * height;
	let posX = $derived(date2pos(task.start));
	let width = $derived(date2pos(task.end) - date2pos(task.start));

	let showModal = $state(false);
	let showTooltip = $state(false);
</script>

{#if showTooltip}
	<div
		style:top={posY - height + 'px'}
		style:left={posX - 0.25 * width + 'px'}
		style:width={1.5 * width + 'px'}
		class="tooltip"
	>
		start: {format(task.start, 'Pp')}<br />
		end: {format(task.end, 'Pp')}
		{task_id}
	</div>
{/if}
{#key task}
	<div
		class="task"
		style:top={posY + 'px'}
		style:left={posX + 'px'}
		style:width={width + 'px'}
		style:height={height + 'px'}
		role="none"
		onclick={() => (showModal = true)}
		onmouseenter={() => (showTooltip = true)}
		onmouseleave={() => (showTooltip = false)}
		onfocus={() => {}}
	>
		<p class="cardTitle" style:max-width={width}>{task.name}</p>
	</div>
{/key}

<Modal bind:showModal>
	<form>
		<div>
			<label for="taskName">Task Name:</label>
		</div>
		<input type="text" id="taskName" name="taskName" required bind:value={task.name} />

		<div>
			<label for="startTime">Start Time:</label>
		</div>
		<input type="text" id="startTime" name="startTime" bind:value={task.start} />

		<div>
			<label for="endTime">End Time:</label>
		</div>
		<input type="text" id="endTime" name="endTime" bind:value={task.end} />
		<button onclick={() => console.log(task)}>Submit</button>
	</form>
</Modal>

<style>
	.task {
		position: absolute;
		background-color: darkslateblue;
		border: 1px solid red;
		border-radius: 1em;
		/* overflow-x: hidden; */
		z-index: 1;
	}
	.cardTitle {
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		font-weight: 700;
		font-size: 0.6rem;
		color: darkgray;
		margin: 5px 10px 0px;
		max-height: 30px;
		text-align: center;
		overflow-y: clip;
	}
	.tooltip {
		position: absolute;
		z-index: 10;
		background-color: lightgrey;
		border: 1px solid black;
	}
</style>

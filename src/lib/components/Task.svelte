<script lang="ts">
	import { date2pos } from '$lib/utils/date2pos';
	import Modal from './Modal.svelte';
	import { subrowingTasks, tasks } from '$lib/stores/tasks.svelte';
	import TaskTooltip from './TaskTooltip.svelte';
	import { format } from 'date-fns';
	import type { ChangeEventHandler } from 'svelte/elements';

	type MyProp = {
		task_id: string;
		subrow_id: number;
		max_subrows: number;
	};

	let { task_id, subrow_id, max_subrows }: MyProp = $props();
	let task = $derived.by(() => {
		let myTask = tasks.get(task_id);
		if (myTask === undefined) {
			throw new Error('TaskIdError');
		} else {
			return myTask;
		}
	});

	let height = 100 / (max_subrows + 1);
	let posY: number = subrow_id * height;
	let posX: number = $derived(date2pos(task.start));
	let width = $derived(date2pos(task.end) - date2pos(task.start));

	let showModal = $state(false);
	let showTooltip = $state(false);

	enum ModalChangeEnum {
		Start = 1,
		End
	}
	function onModalChange(ev: ModalChangeEnum): ChangeEventHandler<HTMLInputElement> {
		let changeFn: ChangeEventHandler<HTMLInputElement> = (e) => {
			let target = e.target as HTMLInputElement;
			if (ev == ModalChangeEnum.Start) {
				task.start = new Date(target.value);
			} else if (ev == ModalChangeEnum.End) {
				task.end = new Date(target.value);
			}
		};
		return changeFn;
	}
</script>

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
	>
		<p class="cardTitle">{task.name}</p>
	</div>
{/key}

{#if showTooltip}
	<TaskTooltip {height} {subrow_id} {task_id}>
		start: {format(task.start, 'Pp')}<br />
		end: {format(task.end, 'Pp')}<br />
		{task_id}
	</TaskTooltip>
{/if}

<Modal bind:showModal>
	<form class="modal-form">
		<label for="taskName"
			>Task Name:
			<input type="text" id="taskName" name="taskName" required value={task.name} />
		</label>

		<label for="startTime"
			>Start Time:
			<input
				type="datetime-local"
				value={format(task.start, "yyyy-MM-dd'T'HH:mm")}
				onchange={onModalChange(ModalChangeEnum.Start)}
			/>
		</label>

		<label for="endTime"
			>End Time:
			<input
				type="datetime-local"
				value={format(task.end, "yyyy-MM-dd'T'HH:mm")}
				onchange={onModalChange(ModalChangeEnum.End)}
			/>
		</label>
		<button
			onclick={() => {
				console.log(task);
			}}
		>
			Submit
		</button>
	</form>
</Modal>

<style>
	.task {
		position: absolute;
		background-color: darkslateblue;
		border: 1px solid red;
		border-radius: 1em;
		z-index: 1;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}
	.cardTitle {
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		font-weight: 700;
		font-size: 0.5rem;
		color: darkgray;
		margin: 5px 10px 0px;
		max-height: 30px;
		text-align: center;
		overflow-y: clip;
	}
	.modal-form {
		display: flex;
		flex-direction: column;
	}
</style>

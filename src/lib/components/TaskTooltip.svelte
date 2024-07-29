<script lang="ts">
	import { tasks } from '$lib/stores/tasks.svelte';
	import { date2pos } from '$lib/utils/date2pos';
	import type { Snippet } from 'svelte';

	type TooltipType = {
		height: number;
		subrow_id: number;
		task_id: string;
		children: Snippet;
	};
	let { height, subrow_id, task_id, children }: TooltipType = $props();
	let task = tasks.get(task_id);
	if (task === undefined) {
		throw new Error('TaskIdError ' + task_id + subrow_id);
	}
	let posY: number = subrow_id * height;
	let posX: number = $derived(date2pos(task.start));
	let width = $derived(date2pos(task.end) - date2pos(task.start));
	let toolTipHeight = $state(100);
	let toolTipWidth = $state(100);
</script>

<div
	style:top={posY - toolTipHeight + 'px'}
	style:left={posX - 0.25 * toolTipWidth + 'px'}
	style:width={1.5 * width + 'px'}
	class="tooltip"
	bind:clientHeight={toolTipHeight}
	bind:clientWidth={toolTipWidth}
>
	{@render children()}
</div>

<style>
	/* .tooltip { */
	/* 	border: 1px solid #ddd; */
	/* 	box-shadow: 1px 1px 1px #ddd; */
	/* 	background: white; */
	/* 	border-radius: 4px; */
	/* 	padding: 4px; */
	/* 	position: absolute; */
	/* 	z-index: 100; */
	/* } */
	.tooltip {
		position: absolute;
		z-index: 10;
		background-color: lightgrey;
		border: 1px solid black;
		min-width: 20em;
	}
</style>

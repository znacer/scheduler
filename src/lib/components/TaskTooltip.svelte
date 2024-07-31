<script lang="ts">
	import { pixelWidth } from '$lib/stores/layout.svelte';
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
	let toolTipPosX = $derived.by(() => {
		let newPosX: number =  posX + 0.5 * width -  0.5 * toolTipWidth;
		if (newPosX < 0) {
			return 0;
		}
		if (newPosX > pixelWidth.pixelWidth - toolTipWidth ) {
			return pixelWidth.pixelWidth - toolTipWidth;
		}
		return newPosX;
		})
</script>

<div
	style:top={posY - toolTipHeight + 'px'}
	style:left={toolTipPosX + 'px'}
	class="tooltip"
	bind:clientHeight={toolTipHeight}
	bind:clientWidth={toolTipWidth}
>
	{@render children()}
</div>

<style>
	.tooltip {
		position: absolute;
		z-index: 10;
		background-color: lightgrey;
		border: 1px solid black;
		min-width: 20em;
	}
</style>

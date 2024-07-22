<script lang="ts">
	import type { Snippet } from 'svelte';

	type TooltipType = {
		title: string;
		posX: number;
		posY: number;
		width: number;
		children: Snippet;
	};
	let { title, posX, posY, width, children }: TooltipType = $props();
	let isHovered = $state(false);
	let x = posX;
	let y = posY;

	function mouseOver(event: MouseEvent) {
		isHovered = true;
		// x = event.pageX;
		// y = event.pageY;
	}
	function mouseMove(event: MouseEvent) {
		// x = event.pageX;
		// y = event.pageY;
	}
	function mouseLeave() {
		isHovered = false;
	}
</script>

<div
	onmouseover={mouseOver}
	onmouseleave={mouseLeave}
	onmousemove={mouseMove}
	onfocus={() => {}}
	role="tooltip"
>
	{@render children()}
</div>

{#if isHovered}
	<div style:top={posY + 'px'} style:left={posX + 'px'} style:width={width + 'px'} class="tooltip">
		{title}
	</div>
{/if}

<style>
	.tooltip {
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: white;
		border-radius: 4px;
		padding: 4px;
		position: absolute;
		z-index: 100;
	}
</style>

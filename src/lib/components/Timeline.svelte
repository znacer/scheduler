<script lang="ts">
	import { add } from 'date-fns';
	import { layoutDate } from '$lib/stores/layout.svelte';
	import { date2pos } from '$lib/utils/date2pos';
	import Row from '$lib/components/Row.svelte';
	let { name }: { name: string } = $props();
</script>

<div class="timeline">
	<div class="row">
		<Row {name} />
	</div>
	<div class="grid">
		{#each layoutDate.timeSteps as time}
			<div class="grid-columns" style:left={date2pos(time) + 'px'}></div>
		{/each}
	</div>
</div>

<style>
	.timeline {
		position: relative;
		height: 100%;
		max-height: 100px;
		width: 100%;
	}
	.row {
		position: relative;
		z-index: 1;
	}

	.grid {
		position: absolute;
		background-color: red;
		display: flex;
		height: 100%;
		z-index: -1;
		top: 0;
		left: 0;
	}
	.grid-columns {
		position: absolute;
		height: 100%;
		border-left: 1px solid;
	}
</style>

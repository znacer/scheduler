<script lang="ts">
	import { add } from 'date-fns';
	import { startDate } from '$lib/stores/layout.svelte';
	import { date2pos } from '$lib/utils/date2pos';
</script>

<div class="axis-line">
	{#each Array.from(Array(25).keys()) as time}
		<div class="axis-label" style:left={date2pos(add(startDate, { hours: time })) + 'px'}>
			{#if time !== 24}
				<p style:margin-left={date2pos(add(startDate, { hours: 1 })) / 3 + 'px'}>
					{time}
				</p>
			{/if}
		</div>
	{/each}
</div>

<style>
	.axis-line {
		display: flex;
		align-items: center;
		height: 20px;
		background-color: #ddd;
		position: relative;
		width: 100%;
	}
	.axis-label {
		position: absolute;
		border-left: 1px solid;
		font-size: 12px;
		color: darkblue;
		height: 100%;
	}
	.axis-label > p {
		margin-top: 0;
	}
</style>

<script lang="ts">
	import { add, sub } from 'date-fns';
	import { startDate, endDate, pixelWidth } from '$lib/stores/layout';
	import { date2pos } from '$lib/utils/date2pos';

	// const startDate = sub(new Date(), { hours: 1 });
	// const endDate = new Date();
	const timeScale = 'hour';
</script>

<div class="axis-line">
	{#each Array.from(Array(25).keys()) as time}
		<div
			class="axis-label"
			style:left={date2pos(add($startDate, { hours: time }), $startDate, $endDate, $pixelWidth) +
				'px'}
		>
			{#if time !== 24}
				<p
					style:margin-left={date2pos(
						add($startDate, { hours: 1 }),
						$startDate,
						$endDate,
						$pixelWidth
					) /
						3 +
						'px'}
				>
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

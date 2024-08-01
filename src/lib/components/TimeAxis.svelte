<script lang="ts">
	import { add, format } from 'date-fns';
	import { layoutDate } from '$lib/stores/layout.svelte';
	import { date2pos } from '$lib/utils/date2pos';
	let tz = $state('Z');
	let width: number = $derived(date2pos(add(layoutDate.startDate, { hours: 1 })));
</script>

<div id="first-row" style:height="20px">
	<div id="row-holder">
		<form id="timezone-selector" style="display: inline-flex;">
			<label for="tz-select">
				TimeZone:
				<select id="tz-select" bind:value={tz}>
					<option>Z</option>
					<option>A</option>
				</select>
			</label>
		</form>
	</div>
	<div class="axis-line">
		{#each layoutDate.timeSteps as time}
			<div class="axis-label" style:left={date2pos(time) + 'px'} style:width={width + 'px'}>
				<p style:margin-left={width / 1000 + 'px'}>
					{format(time, 'p')}
				</p>
			</div>
		{/each}
	</div>
</div>

<style>
	#first-row {
		width: 100%;
		display: inline-flex;
		top: 0px;
		border-bottom: 1px solid salmon;
	}
	#row-holder {
		width: 10%;
	}
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
		width: 100%;
		text-align: center;
	}
	.axis-label > p {
		margin-top: 0;
	}
</style>

<script lang="ts">
	import { format, parseISO } from 'date-fns';
	import { date2pos } from '$lib/utils/date2pos';
	import { TaskElement } from '$lib/stores/events';

	export let startDate: Date;
	export let endDate: Date;
	export let task: TaskElement;
	export let pixelWidth: number;
	$: posX = date2pos(parseISO(task.start), startDate, endDate, pixelWidth);

	export let posY: number = 0;
	$: width =
		date2pos(parseISO(task.end), startDate, endDate, pixelWidth) -
		date2pos(parseISO(task.start), startDate, endDate, pixelWidth);
	export let height: number = 100 - posY;
</script>

<div
	class="task"
	style:top={posY + 'px'}
	style:left={posX + 'px'}
	style:width={width + 'px'}
	style:height={height + 'px'}
>
	<p class="cardTitle">{task.name}</p>
	<p class="cardContent">
	{format(task.start, 'p')} <br />
	{format(task.end, 'p')}
	</p>
</div>

<style>
	.task {
		position: absolute;
		background-color: darkslateblue;
		border: 1px solid red;
		border-radius: 1em;
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

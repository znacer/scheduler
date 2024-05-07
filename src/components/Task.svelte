<script lang="ts">
	import { format, parseISO } from 'date-fns';
	import { date2pos, draggable } from '$lib/utils';
	import { TaskElement } from '../stores/events';

	export let startDate: Date;
	export let endDate: Date;
	export let task: TaskElement;
	export let pixelWidth: number;
	$: posX = date2pos(parseISO(task.start), startDate, endDate, pixelWidth);

	export let posY: number = 0;
	$: width =
		date2pos(parseISO(task.end), startDate, endDate, pixelWidth) -
		date2pos(parseISO(task.start), startDate, endDate, pixelWidth);
	export let height: number = 80;
</script>

<div
	class="task"
	style:top={posY + 'px'}
	style:left={posX + 'px'}
	style:width={width + 'px'}
	style:height="100%"
>
	<p class="cardTitle">{task.name}</p>
	<p class="cardContent">{format(task.start, 'p')}</p>
	<p class="cardContent">{format(task.end, 'p')}</p>
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
		color: darkgray;
		margin: 5px 10px 0px;
	}

	.cardContent {
		font-weight: 500;
		color: lightgray;
		margin: 0px 10px 0px;
	}
</style>

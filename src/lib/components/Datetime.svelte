<script>
	import { format, parseISO, startOfDay, setHours, setMinutes } from 'date-fns';

	export let value = '';

	let date = '';
	let time = '';

	$: combined = value ? format(parseISO(value), 'yyyy-MM-dd HH:mm') : '';

	function handleDateInput(event) {
		date = event.target.value;
		updateCombined();
	}

	function handleTimeInput(event) {
		time = event.target.value;
		updateCombined();
	}

	function updateCombined() {
		if (date && time) {
			const parsedDate = startOfDay(parseISO(date));
			const parsedTime = setMinutes(
				setHours(parsedDate, parseInt(time.split(':')[0])),
				parseInt(time.split(':')[1])
			);
			combined = format(parsedTime, 'yyyy-MM-dd HH:mm');
			value = format(parsedTime, 'yyyy-MM-ddTHH:mm');
		} else {
			combined = '';
			value = '';
		}
	}
</script>

<div>
	<input type="date" value={date} on:input={handleDateInput} />
	<input type="time" value={time} on:input={handleTimeInput} />
	<input type="hidden" bind:value />
</div>

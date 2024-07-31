<script lang="ts">
	import TimeAxis from '$lib/components/TimeAxis.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import { layoutDate } from '$lib/stores/layout.svelte';
	import { tasks } from '$lib/stores/tasks.svelte';
	import { format } from 'date-fns';
	import type { ChangeEventHandler } from 'svelte/elements';

	let onchangeStart: ChangeEventHandler<HTMLInputElement> = (event) => {
		let target = event.target as HTMLInputElement;
		layoutDate.startDate = new Date(target.value);
	};
	let onchangeEnd: ChangeEventHandler<HTMLInputElement> = (event) => {
		let target = event.target as HTMLInputElement;
		layoutDate.endDate = new Date(target.value);
	};
</script>

<div>
	<form>
		<label>
			Start Date:
			<input
				type="datetime-local"
				value={format(layoutDate.startDate, "yyyy-MM-dd'T'HH:mm")}
				onchange={onchangeStart}
			/>
		</label>
		<label>
			End Date:
			<input
				type="datetime-local"
				value={format(layoutDate.endDate, "yyyy-MM-dd'T'HH:mm")}
				onchange={onchangeEnd}
			/>
		</label>
	</form>
</div>
<div id="main-grid">
	<TimeAxis />

	{#each tasks.ships as ship}
		<div class="row-content" style:display="flex">
			<div class="row-name">
				<p>{ship}</p>
			</div>
			<!-- TODO: Change ship names  -->
			<Timeline name={ship} />
		</div>
	{/each}
</div>

<style>
	#main-grid {
		border: 1px solid salmon;
	}
	.row-content {
		border-bottom: 1px solid salmon;
	}
	.row-name {
		width: 10%;
	}
	.row-name {
		height: 100px;
		align-content: center;
	}
</style>

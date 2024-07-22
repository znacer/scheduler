<script lang="ts">
	import TimeAxis from '$lib/components/TimeAxis.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import { tasks } from '$lib/stores/tasks.svelte';
</script>

<div id="main-grid">
	<div id="first-row" style:height="20px">
		<div id="row-holder"></div>
		<TimeAxis />
	</div>

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
	#first-row {
		width: 100%;
		display: flex;
		top: 0px;
		border-bottom: 1px solid salmon;
	}
	.row-content {
		border-bottom: 1px solid salmon;
	}
	#row-holder,
	.row-name {
		width: 10%;
	}
	.row-name {
		height: 100px;
		align-content: center;
	}
</style>

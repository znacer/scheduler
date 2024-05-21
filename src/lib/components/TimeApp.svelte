<script lang="ts">
	import TimeAxis from '$lib/components/TimeAxis.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
</script>

<div id="main-grid" style:display="flex">
	<div id="row-titles" style:width="10%" style:height="100%" style:top="0px">
		<div
			id="row-holder"
			style:top="0px"
			style:height="20px"
			style:margin="0"
			style:padding="0"
		></div>
		<div class="row-name">
			<p>Test</p>
		</div>
	</div>
	<div id="row-content" style:width="90%">
		<TimeAxis />
		<Timeline />
	</div>
</div>

<style>
	.row-name {
		height: 100px;
		border: 1px solid red;
		align-content: center;
	}
</style>

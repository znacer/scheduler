<script lang="ts">
	import Plot from "./plot.svelte";
	import type { PageData } from "./$types";
	import type { Waypoint } from "./utils";

	let { in_data }: { in_data: PageData } = $props();
	let data: Waypoint[] = $derived.by(() => {
		if (in_data !== undefined) {
			return in_data.pims as Waypoint[];
		}
		return [];
	});
</script>

<Plot />

<script lang="ts">
	import Plot from "./plot.svelte";
	import type { PageData } from "./$types";
	let { data }: { data: PageData } = $props();
</script>

<Plot data={data.pims} />

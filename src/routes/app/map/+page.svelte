<script lang="ts">
	import { pim_store } from "$lib/stores/pims.svelte";
	import PimForm from "./pim-form.svelte";
	import Plot from "./plot.svelte";

	let form_values = $derived(pim_store.pim_by_id(1));
</script>

<div class="relative h-full w-full">
	<Plot />
</div>
<!-- <div class="relative h-2/6 w-full">
	{#if form_values}
		{#if form_values.length > 0}
			<PimForm pim={form_values} />
		{/if}
	{/if}
</div> -->

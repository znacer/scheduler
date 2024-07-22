<!-- <script lang="ts"> -->
<!-- 	import TimeApp from '$lib/components/TimeApp.svelte'; -->
<!-- 	import { setDefaultOptions } from 'date-fns'; -->
<!-- 	import { fr } from 'date-fns/locale'; -->
<!-- 	import type { RowContents, RowsGet } from '$lib/utils/types'; -->
<!-- 	import { events } from '$lib/utils/fetch'; -->
<!-- 	import { rows } from '$lib/stores/rows.svelte'; -->
<!---->
<!-- 	setDefaultOptions({ locale: fr }); -->
<!-- 	let selected = $state('all'); -->
<!-- 	let row_names: string[] = $derived(['all', ...rows.map((row) => row.name)]); -->
<!-- 	let current_row: RowContents[] = $derived( -->
<!-- 		rows.filter((row) => row.name === selected || selected == 'all') -->
<!-- 	); -->
<!---->
<!-- 	function onclick() { -->
<!-- 		events(); -->
<!-- 	} -->
<!-- </script> -->
<!---->
<!-- <svelte:head> -->
<!-- 	<title>Ship</title> -->
<!-- 	<meta name="description" content="Show a single ship schedule" /> -->
<!-- </svelte:head> -->
<!---->
<!-- <section> -->
<!-- 	<button {onclick}>Fetch data</button> -->
<!-- 	<select bind:value={selected}> -->
<!-- 		{#each row_names as row_name} -->
<!-- 			<option>{row_name}</option> -->
<!-- 		{/each} -->
<!-- 	</select> -->
<!-- 	{#if rows !== undefined} -->
<!-- 		{#if rows.length !== 0} -->
<!-- 			<TimeApp rows={current_row} /> -->
<!-- 		{/if} -->
<!-- 	{/if} -->
<!-- </section> -->
<!---->
<!-- <style> -->
<!-- 	section { -->
<!-- 		width: 100%; -->
<!-- 	} -->
<!-- </style> -->

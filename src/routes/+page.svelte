<script lang="ts">
	import TimeApp from '$lib/components/TimeApp.svelte';
	import { setDefaultOptions } from 'date-fns';
	import { fr } from 'date-fns/locale';
	import { events } from '$lib/utils/fetch.svelte';
	import { onMount } from 'svelte';

	setDefaultOptions({ locale: fr });

	// let fetchPromise = events();
	let ready = $state(false);
	onMount(async () => {
		await events();
		ready = true;
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<!-- <button onclick={() => (fetchPromise = events())}>Fetch data</button> -->
	{#if ready}
		<TimeApp />
	{:else}
		<p>loading..</p>
	{/if}
</section>

<style>
	section {
		width: 100%;
	}
</style>

<script>
	import TimeApp from '$lib/components/TimeApp.svelte';
	import { setDefaultOptions } from 'date-fns';
	import { fr } from 'date-fns/locale';

	setDefaultOptions({ locale: fr });
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<TimeApp />
</section>

<style>
</style>

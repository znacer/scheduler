<script>
	import TimeAxis from '../components/TimeAxis.svelte';
	import Timeline from '../components/Timeline.svelte';
	import { setDefaultOptions } from 'date-fns';
	import { fr } from 'date-fns/locale';

	setDefaultOptions({ locale: fr });
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<TimeAxis />
	<Timeline />
</section>

<style>
</style>

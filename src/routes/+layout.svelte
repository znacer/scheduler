<script lang="ts">
  import { fr } from 'date-fns/locale';
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  import Topbar from "$lib/components/layout/topbar.svelte";
    import { setDefaultOptions } from 'date-fns';

  setDefaultOptions({ locale: fr})
  let { children } = $props();
</script>

<ModeWatcher></ModeWatcher>
<div class="h-screen w-screen overflow-hidden">
<header class="pb-1">
  <Topbar />
</header>

<main class="h-full">
  {@render children()}
</main>
</div>

<style>
</style>

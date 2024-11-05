<script lang="ts">
  import { fr } from 'date-fns/locale';
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  import Topbar from "$lib/components/layout/topbar.svelte";
  import { setDefaultOptions } from 'date-fns';

  setDefaultOptions({ locale: fr})
  let { children } = $props();
  let top_height = $state();
</script>

<ModeWatcher></ModeWatcher>
<div class="h-dvh w-screen overflow-auto">
<header class="pb-1 fixed w-full z-50" bind:clientHeight={top_height}>
  <Topbar />
</header>

<main class="h-svh pb-2 overflow-scroll z-0" >
  <div style="height: {top_height}px;">
  </div>
  {@render children()}
</main>
</div>

<style>
</style>

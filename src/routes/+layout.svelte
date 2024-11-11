<script lang="ts">
  import { fr } from 'date-fns/locale';
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  import Topbar from "./topbar.svelte";
  import { setDefaultOptions } from 'date-fns';

  setDefaultOptions({ locale: fr})
  let { children } = $props();
  let top_height = $state();
</script>

<ModeWatcher></ModeWatcher>
<div class="fixed h-screen w-screen overflow-hidden bg-background">
<header class="pb-1 relative w-full z-50" bind:clientHeight={top_height}>
  <Topbar />
</header>

<main class="h-full pb-2 overflow-hidden z-0" >
  {@render children()}
</main>
</div>

<style>
</style>

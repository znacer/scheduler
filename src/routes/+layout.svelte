<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";
  import Topbar from "$lib/components/layout/topbar.svelte";

  let { children } = $props();
</script>

<ModeWatcher></ModeWatcher>
<div class="h-screen w-screen overflow-hidden">
<header class="pb-1">
  <Topbar />
</header>

<main >
  {@render children()}
</main>
</div>

<style>
</style>

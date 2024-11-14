<script lang="ts">
  import { fr } from "date-fns/locale";
  import { ModeWatcher } from "mode-watcher";
  import "/src/app.css";
  import Topbar from "./topbar.svelte";
  import { setDefaultOptions } from "date-fns";
  import type { Snippet } from "svelte";

  setDefaultOptions({ locale: fr });
  let { children }: { children: Snippet } = $props();
  let height = $state(0);
  let nav_height = $state(0);
</script>

<ModeWatcher></ModeWatcher>
<svelte:window bind:innerHeight={height} />
<div
  class=" w-full flex flex-col overflow-clip bg-background"
  style="height: {height}px"
>
  <nav class="relative top-0 pb-1 w-full z-50" bind:clientHeight={nav_height}>
    <Topbar />
  </nav>

  <main
    class="relative z-0 overflow-clip w-full pb-1"
    style="height: {height - nav_height}px"
  >
    {@render children()}
  </main>
</div>

<style>
</style>

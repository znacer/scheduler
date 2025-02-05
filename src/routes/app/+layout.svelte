<script lang="ts">
  import { fr } from "date-fns/locale";
  import { ModeWatcher } from "mode-watcher";
  import "/src/app.css";
  import Topbar from "./topbar.svelte";
  import { setDefaultOptions } from "date-fns";
  import { setContext, type Snippet } from "svelte";
  import type { LayoutServerData } from "./$types";
  import { group_store } from "$lib/stores/groups.svelte";
  import { user_store } from "$lib/stores/users.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import { tasks_store } from "$lib/stores/tasks.svelte";

  setDefaultOptions({ locale: fr });
  let { children, data }: { children: Snippet; data: LayoutServerData } =
    $props();
  let height = $state(0);
  let nav_height = $state(0);

  setContext("category", data.categories);
  $effect(() => {
    if (data) {
      user_store.init(data.users);
      group_store.init(data.groups);
      tasks_store.init(data.tasks);
      schedules_store.init(data.schedules);
    }
  });
</script>

<ModeWatcher nonce="avoid bug" />
<svelte:window bind:innerHeight={height} />
<div
  class=" w-full flex flex-col overflow-clip bg-background"
  style="height: {height}px"
>
  <nav class="relative top-0 pb-1 w-full z-50" bind:clientHeight={nav_height}>
    <Topbar route={data.route} />
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

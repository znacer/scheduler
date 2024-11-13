<script lang="ts">
  import { setMode, mode } from "mode-watcher";
  import { endOfDay } from "date-fns";
  import { parseAbsoluteToLocal } from "@internationalized/date";
  import { ChartGantt } from "lucide-svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import Tzmenu from "./tzmenu.svelte";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index";
  import NewTask from "$lib/components/new-task.svelte";
  import * as Menubar from "$lib/components/ui/menubar/index";
  import { get_schedules } from "$lib/test_data";
  import { get_data, reset_data } from "$lib/data";
  import { grid_layout_store, Zoom } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import NewSchedule from "$lib/components/new-schedule.svelte";

  setMode("system");
  const start = new Date(grid_layout_store.start);
  const end = endOfDay(start);
  let value = $state({
    start: parseAbsoluteToLocal(start.toISOString()),
    end: parseAbsoluteToLocal(end.toISOString()),
  });
  $effect(() => {
    if (value.start) {
      const new_start = value.start.toDate().getTime();
      grid_layout_store.set_start(new_start);
      const new_end = endOfDay(value.end.toDate()).getTime();
      grid_layout_store.set_end(new_end);
    }
  });

  let zoom = $state("hour");
  $effect(() => {
    switch (zoom) {
      case "hour":
        grid_layout_store.set_zoom(Zoom.HOUR);
        break;
      case "day":
        grid_layout_store.set_zoom(Zoom.DAY);
        break;
      default:
        grid_layout_store.set_zoom(Zoom.HOUR);
    }
  });

  const routes = new Map();
  routes.set("/", { value: "timeline", name: "Frise" });
  routes.set("/tasks", { value: "tasks", name: "Tableau" });
  routes.set("/map", { value: "map", name: "Carte" });
  let view = $derived.by(() => {
    const possible_route = routes.get($page.url.pathname);
    if (possible_route) {
      return possible_route.value;
    } else {
      return "timeline";
    }
  });
  function handle_route(new_route: string) {
    let route = "/";
    for (let [possible_route, elt] of routes.entries()) {
      if (elt.value === new_route) {
        route = possible_route;
      }
    }
    goto(route);
  }
</script>

<Menubar.Root class="bg-secondary px-2 rounded-none border-x-0 border-t-0">
  <ChartGantt />
  <Menubar.Menu>
    <Menubar.Trigger>Timelines</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item><NewSchedule /></Menubar.Item>

      <Menubar.Separator></Menubar.Separator>
      <Menubar.Item onclick={get_schedules}>TEST DATA</Menubar.Item>
      <Menubar.Item onclick={reset_data}>RESET</Menubar.Item>
      <Menubar.Item onclick={get_data}>LOAD DATA</Menubar.Item>
      <Menubar.Separator></Menubar.Separator>
      {#if schedules_store.ids().length > 0}
        <Menubar.CheckboxItem>Selectionner tout (TODO)</Menubar.CheckboxItem>
      {/if}
      <Menubar.Separator></Menubar.Separator>
      {#each schedules_store.ids() as id}
        <Menubar.CheckboxItem
          checked={schedules_store.is_check(id)}
          onclick={() => {
            schedules_store.is_check(id)
              ? schedules_store.uncheck(id)
              : schedules_store.check(id);
          }}
        >
          {schedules_store.name(id)}
        </Menubar.CheckboxItem>
      {/each}
    </Menubar.Content>
  </Menubar.Menu>

  <Menubar.Menu>
    <Menubar.Trigger>Vue</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.RadioGroup value={view} onValueChange={handle_route}>
        {#each routes.entries() as [_, v]}
          <Menubar.RadioItem value={v.value}>
            {v.name}
          </Menubar.RadioItem>
        {/each}
      </Menubar.RadioGroup>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <NewTask />
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Pédiode</Menubar.Trigger>
    <Menubar.Content>
      <RangeCalendar bind:value locale="fr" />
    </Menubar.Content>
  </Menubar.Menu>

  <Tzmenu />

  <Menubar.Menu>
    <Menubar.Trigger>Zoom</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.RadioGroup bind:value={zoom}>
        <Menubar.RadioItem value="hour">Heure</Menubar.RadioItem>
        <Menubar.RadioItem value="day">Jour</Menubar.RadioItem>
      </Menubar.RadioGroup>
    </Menubar.Content>
  </Menubar.Menu>
  <div class="grow">
    <p class="w-full text-center font-bold text-accent-foreground">
      Fuseau actuel: {grid_layout_store.tz}
    </p>
  </div>
  <Menubar.Menu>
    <Menubar.Trigger>Theme</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.RadioGroup value={$mode}>
        <Menubar.RadioItem value="system" onclick={() => setMode("system")}>
          System
        </Menubar.RadioItem>
        <Menubar.Separator></Menubar.Separator>
        <Menubar.RadioItem value="dark" onclick={() => setMode("dark")}>
          Dark
        </Menubar.RadioItem>
        <Menubar.Separator></Menubar.Separator>
        <Menubar.RadioItem value="light" onclick={() => setMode("light")}>
          Light
        </Menubar.RadioItem>
      </Menubar.RadioGroup>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>A propos</Menubar.Trigger>
    <Menubar.Content>version ???</Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>

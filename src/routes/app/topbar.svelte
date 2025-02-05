<script lang="ts">
  import { setMode, mode, toggleMode } from "mode-watcher";
  import { endOfDay } from "date-fns";
  import { parseAbsoluteToLocal } from "@internationalized/date";
  import { ChartGantt, Moon, Sun } from "lucide-svelte";
  import { goto } from "$app/navigation";
  import Tzmenu from "./tzmenu.svelte";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index";
  import NewTask from "./new-task.svelte";
  import * as Menubar from "$lib/components/ui/menubar/index";
  import Button from "$lib/components/ui/button/button.svelte";
  import { grid_layout_store, Zoom } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import NewSchedule from "./new-schedule.svelte";
  import { enhance } from "$app/forms";
    import Separator from "$lib/components/ui/separator/separator.svelte";
    import Input from "$lib/components/ui/input/input.svelte";

  let { route }: { route: string } = $props();

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
  routes.set("/app", { value: "timeline", name: "Linéaires" });
  routes.set("/app/tasks", { value: "tasks", name: "Tableau" });
  routes.set("/app/map", { value: "map", name: "Carte" });
  routes.set("/app/admin", { value: "admin", name: "Admin" });
  let view = $derived.by(() => {
    const possible_route = routes.get(route);
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
    <Menubar.Trigger>Linéaires</Menubar.Trigger>
    <Menubar.Content>
      <NewSchedule />
      <Menubar.Separator></Menubar.Separator>
      {#if schedules_store.ids().length > 0}
        <Menubar.CheckboxItem
          onclick={() => {
            schedules_store.check_switch();
          }}
        >
          Selectionner tout
        </Menubar.CheckboxItem>
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
    <Menubar.Trigger>Période</Menubar.Trigger>
    <Menubar.Content>
      <RangeCalendar bind:value locale="fr" />
    </Menubar.Content>
  </Menubar.Menu>

  <Tzmenu />

  <Menubar.Menu>
    <Menubar.Trigger>Zoom</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.RadioGroup
        onValueChange={(e) => {
          zoom = e;
        }}
      >
        <Menubar.RadioItem value="hour">Heure</Menubar.RadioItem>
        <Menubar.RadioItem value="day">Jour</Menubar.RadioItem>
      </Menubar.RadioGroup>
      <Separator />
      <Input type="range" min={1} max={100} step={5} onchange={(e) => grid_layout_store.set_cell_width(parseInt(e.currentTarget.value))}/>
    </Menubar.Content>
  </Menubar.Menu>
  <span class="grow">
    <p class="w-full text-center font-bold text-accent-foreground">
      Fuseau actuel: {grid_layout_store.tz}
    </p>
  </span>
  <Menubar.Menu>
    <Button onclick={toggleMode} size="icon" class="h-5/6">
      <Sun
        class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>
      <form method="post" use:enhance action="/app?/disconnect">
        <Button type="submit" variant="ghost">Déconnexion</Button>
      </form>
    </Menubar.Trigger>
  </Menubar.Menu>
</Menubar.Root>

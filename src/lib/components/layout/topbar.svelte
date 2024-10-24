<script lang="ts">
  import { setMode, mode } from "mode-watcher";
  import * as Menubar from "$lib/components/ui/menubar/index";
  import Tzmenu from "./tzmenu.svelte";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index";
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  import { parseAbsoluteToLocal } from "@internationalized/date";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import { get_schedules } from "$lib/data";

  setMode("system");
  const start = new Date(grid_layout_store.start);
  const end = new Date(
    grid_layout_store.start +
      grid_layout_store.millisec_by_cell * grid_layout_store.nb_columns,
  );
  let value = $state({
    start: parseAbsoluteToLocal(start.toISOString()),
    end: parseAbsoluteToLocal(end.toISOString()),
  });
  $effect(() => {
    if (value.start) {
      const new_start = value.start.toDate().getTime();
      grid_layout_store.set_start(new_start);
      const new_end = value.end.toDate().getTime();
      grid_layout_store.set_end(new_end);
    }
  });
  // async function get_schedules() {
  //   const response = await fetch("/test");
  //   const data = await response.json();
  //   console.log(data);
  //   schedules_store.add_schedules(data);
  // }
</script>

<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>Calendriers</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item onclick={get_schedules}>TEST DATA</Menubar.Item>
      <Menubar.Item>LOAD DATA (TODO)</Menubar.Item>
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
    <Menubar.Trigger>Pédiode</Menubar.Trigger>
    <Menubar.Content>
      <RangeCalendar bind:value />
    </Menubar.Content>
  </Menubar.Menu>

  <Tzmenu />

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
</Menubar.Root>

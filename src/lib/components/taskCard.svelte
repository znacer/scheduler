<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { fromDate, fromAbsolute } from "@internationalized/date";
  import {
    colorHashMap,
    ColorPalette,
    random_color,
  } from "$lib/stores/schedules.svelte";
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import { tasks_store, type Task } from "$lib/stores/tasks.svelte";
  import Button from "./ui/button/button.svelte";
  import Input from "./ui/input/input.svelte";
  import Label from "./ui/label/label.svelte";
  import Datetimepicker from "./datetimepicker.svelte";

  interface TaskCardProp {
    task: Task;
    schedule_id: number;
  }

  let { task, schedule_id }: TaskCardProp = $props();
  let width = $derived(
    grid_layout_store.nb_columns * grid_layout_store.cell_width,
  );

  function task_width(t: Task): number {
    const end =
      ((t.start - grid_layout_store.start + t.duration) *
        grid_layout_store.cell_width) /
      grid_layout_store.millisec_by_cell;
    if (end <= width) {
      return (
        (t.duration * grid_layout_store.cell_width) /
        grid_layout_store.millisec_by_cell
      );
    } else {
      return (
        width -
        ((t.start - grid_layout_store.start) * grid_layout_store.cell_width) /
          grid_layout_store.millisec_by_cell
      );
    }
  }

  let form_values: Task = $state(JSON.parse(JSON.stringify(task)));
  let task_end = $state(task.start + task.duration);
  $effect(() => {
    form_values.duration = task_end - form_values.start;
  });
  let backgroundColor: ColorPalette = $state(random_color());
  if (task.color) {
    backgroundColor = task.color;
  }
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <div
      class="taskcard border p-1 border-primary text-primary-foreground shadow rounded-2xl overflow-hidden"
      style="
        position: absolute;
        top: {schedules_store.task_line(task.id) *
        grid_layout_store.cell_height}px;  
        left: {((task.start - grid_layout_store.start) *
        grid_layout_store.cell_width) /
        grid_layout_store.millisec_by_cell}px;  
        width: {task_width(task)}px;  
        height: {grid_layout_store.cell_height}px;  
        background-color:  {backgroundColor};
      "
    >
      <p class="text-base text-red-500 font-mono font-bold">
        {task.name}
      </p>

      <p class="font-mono text-xs">
        {new Intl.DateTimeFormat("fr", {
          timeStyle: "short",
          timeZone: grid_layout_store.tz,
        }).format(task.start) +
          " - " +
          new Intl.DateTimeFormat("fr", {
            timeStyle: "short",
            timeZone: grid_layout_store.tz,
          }).format(task.start + task.duration)}
      </p>
    </div>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{task.name}</Dialog.Title>
      <Dialog.Description
        >Détails et modification de la tâche</Dialog.Description
      >
    </Dialog.Header>
    <div class="flex flex-col gap-4 py-4">
      <div class="flex flex-row items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input id="name" bind:value={form_values.name} class="col-span-3" />
      </div>
      <div class="flex flex-row items-center gap-4">
        <Label for="start" class="text-right">Début</Label>
        <Datetimepicker bind:timestamp={form_values.start} />
      </div>
      <div class="flex flex-row items-center gap-4">
        <Label for="end" class="text-right">Fin</Label>
        <Datetimepicker bind:timestamp={task_end} />
      </div>
      <div class="flex flex-row items-center gap-4">
        <Label for="color" class="text-right">Couleur</Label>
        <Select.Root
          onSelectedChange={(e) => {
            console.log(e?.value);
          }}
        >
          <Select.Trigger>
            <Select.Value placeholder={backgroundColor} />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              {#each colorHashMap as [k, color]}
                <Select.Item value={color}>{k}</Select.Item>
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </div>
    </div>
    <Dialog.Footer>
      <Button
        type="submit"
        onclick={() => {
          tasks_store.append(JSON.parse(JSON.stringify(form_values)));
        }}
      >
        Sauvegarder
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

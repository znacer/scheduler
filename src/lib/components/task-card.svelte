<script lang="ts">
  import { fly } from "svelte/transition";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as data from "$lib/data";
  import { ColorPalette, random_color } from "$lib/stores/schedules.svelte";
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import { tasks_store, type Task } from "$lib/stores/tasks.svelte";
  import Button from "./ui/button/button.svelte";
  import TaskForm from "./task-form.svelte";

  interface TaskCardProp {
    task: Task;
    schedule_id: number;
  }

  let { task }: TaskCardProp = $props();
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
  let backgroundColor: ColorPalette = $state(random_color());
  $effect(() => {
    if (task.color) {
      backgroundColor = task.color;
    }
  });
</script>

<Dialog.Root
  onOpenChange={(e) => {
    // make sure everything updates correctly if a changed occured since last time form was loaded
    if (e) {
      form_values = JSON.parse(JSON.stringify(task));
    }
  }}
>
  <Dialog.Trigger>
    <div
      class="
        p-1
        text-primary-foreground
        rounded-2xl
        overflow-hidden
        cursor-pointer
        hover:border-2
        hover:border-accent-foreground
        hover:scale-110
      "
      style="
        position: absolute;
        top: {schedules_store.task_line(task.id) *
        grid_layout_store.cell_height +
        1}px;  
        left: {((task.start - grid_layout_store.start) *
        grid_layout_store.cell_width) /
        grid_layout_store.millisec_by_cell}px;  
        width: {task_width(task)}px;  
        height: {grid_layout_store.cell_height - 2}px;  
        background-color:  {backgroundColor};
      "
      in:fly|global={{
        x: -(
          ((task.start - grid_layout_store.start) *
            grid_layout_store.cell_width) /
          grid_layout_store.millisec_by_cell
        ),
        y: -(
          schedules_store.task_line(task.id) * grid_layout_store.cell_height
        ),
        delay: 500,
        duration: 1000,
      }}
    >
      <p class="text-base text-primary-foreground font-mono font-bold">
        {task.name}
      </p>

      <p class="font-mono text-xs text-secondary-foreground">
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
    <TaskForm bind:form_values />
    <Dialog.Footer>
      <Button
        type="submit"
        onclick={() => {
          tasks_store.append(JSON.parse(JSON.stringify(form_values)));
        }}
      >
        Appliquer
      </Button>
      <Button
        type="submit"
        variant="destructive"
        onclick={() => {
          data.update_task(form_values).then((t) => {
            tasks_store.append(JSON.parse(JSON.stringify(t)));
          });
        }}
      >
        Sauvegarder
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

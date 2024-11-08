<script lang="ts">
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import { tasks_store } from "$lib/stores/tasks.svelte";
  import TaskCard from "./taskCard.svelte";

  let { schedule_id }: { schedule_id: number } = $props();
  schedules_store.arrange_lines(schedule_id);
  let nb_lines = $derived(schedules_store.nb_lines(schedule_id));
  $effect(() => {
    schedules_store.arrange_lines(schedule_id);
  });

  let height = $derived(nb_lines * grid_layout_store.cell_height);
  let width = $derived(
    grid_layout_store.nb_columns * grid_layout_store.cell_width,
  );
</script>

<div
  class="relative flex flex-row w-full h-fit"
  style="height: {nb_lines * grid_layout_store.cell_height}px"
>
  <div class="absolute">
    <svg id="grid" {width} {height} xmlns="http://www.w3.org/2000/svg">
      {#each Array(grid_layout_store.nb_columns + 1).keys() as column}
        <line
          x1={column * grid_layout_store.cell_width}
          y1="0"
          x2={column * grid_layout_store.cell_width}
          y2={height}
          stroke="#ccc"
          stroke-width={column == grid_layout_store.nb_columns ? 2 : 1}
          stroke-dasharray={"2," +
            (column == grid_layout_store.nb_columns ? 0 : 1)}
        />
      {/each}
      {#each Array(nb_lines).keys() as row}
        <line
          x1="0"
          y1={(row + 1) * grid_layout_store.cell_height}
          x2={width}
          y2={(row + 1) * grid_layout_store.cell_height}
          stroke="#ccc"
          stroke-width={row == nb_lines - 1 ? 2 : 1}
          stroke-dasharray={"2," + (row == nb_lines - 1 ? 0 : 1)}
        />
      {/each}
    </svg>
  </div>
  <div class="absolute">
    {#each tasks_store.from_schedule(schedule_id) as [_, task]}
      {#if task.start >= grid_layout_store.start || task.start < grid_layout_store.start + grid_layout_store.nb_columns * grid_layout_store.millisec_by_cell}
        <TaskCard {task} {schedule_id} />
      {/if}
    {/each}
  </div>
</div>

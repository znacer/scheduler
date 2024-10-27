<script lang="ts">
  import { grid_layout_store, Zoom } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import ChunckLabel from "./chucks/chunckLabel.svelte";
</script>

<div id="label-menu" class="w-64">
  {#if grid_layout_store.zoom == Zoom.DAY}
    <ChunckLabel height={grid_layout_store.axis_height}>
      <p class="h-full content-center indent-4">Semaine</p>
    </ChunckLabel>
    <ChunckLabel height={grid_layout_store.axis_height}>
      <p class="h-full content-center indent-4">JOUR</p>
    </ChunckLabel>
    <ChunckLabel height={grid_layout_store.axis_height}>
      <p class="h-full content-center indent-4">Date (UTC)</p>
    </ChunckLabel>
  {:else if grid_layout_store.zoom == Zoom.HOUR}
    <ChunckLabel height={grid_layout_store.axis_height}>
      <p class="h-full content-center indent-4">Date (UTC)</p>
    </ChunckLabel>

    <ChunckLabel height={grid_layout_store.axis_height}>
      <p class="h-full content-center indent-4">UTC</p>
    </ChunckLabel>
    <ChunckLabel height={grid_layout_store.axis_height}>
      <p class="h-full content-center indent-4">
        {grid_layout_store.tz}
      </p>
    </ChunckLabel>
  {/if}

  {#each schedules_store.are_checked() as [k, v]}
    {#if v}
      <ChunckLabel
        height={schedules_store.nb_lines(k) * grid_layout_store.cell_height}
      >
        <p class="h-full content-center indent-4">
          {schedules_store.name(k)}
        </p>
      </ChunckLabel>
    {/if}
  {/each}
</div>

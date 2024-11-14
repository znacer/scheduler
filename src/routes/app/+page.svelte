<script lang="ts">
  import { grid_layout_store, Zoom } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import GridChunk from "$lib/components/grid-chunck.svelte";
  import GridChunckAxis from "$lib/components/chucks/grid-chunck-axis.svelte";
  import GridLabels from "$lib/components/grid-labels.svelte";
</script>

<div class="flex flex-row pb-1 h-full overflow-auto">
  <div id="label-menu" class="sticky left-0 z-20 w-1/6 h-fit">
    <GridLabels />
  </div>
  <div id="grid-timeline" class="relative w-5/6 h-fit">
    <div class="sticky top-0 z-10">
      {#if grid_layout_store.zoom == Zoom.DAY}
        <div style="height: {grid_layout_store.axis_height}px;">
          <GridChunckAxis zoom={Zoom.WEEK} />
        </div>
        <div style="height: {grid_layout_store.axis_height}px;">
          <GridChunckAxis zoom={Zoom.DAY} week_day={true} />
        </div>
        <div style="height: {grid_layout_store.axis_height}px;">
          <GridChunckAxis zoom={Zoom.DAY} />
        </div>
      {:else if grid_layout_store.zoom == Zoom.HOUR}
        <div style="height: {grid_layout_store.axis_height}px;">
          <GridChunckAxis zoom={Zoom.DAY} />
        </div>
        <div style="height: {grid_layout_store.axis_height}px;">
          <GridChunckAxis utc={true} />
        </div>
        <div style="height: {grid_layout_store.axis_height}px;">
          <GridChunckAxis utc={false} />
        </div>
      {/if}
    </div>
    <div class="relative h-fit w-fit z-0">
      {#each schedules_store.are_checked() as [k, v]}
        {#if v}
          <GridChunk schedule_id={k} />
        {/if}
      {/each}
    </div>
  </div>
</div>

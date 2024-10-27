<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index";
  import { grid_layout_store, Zoom } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import GridChunk from "$lib/components/gridChunck.svelte";
  import GridChunckAxis from "$lib/components/chucks/gridChunckAxis.svelte";
  import GridLabels from "./gridLabels.svelte";
  $inspect(grid_layout_store.zoom);
</script>

  <div class="flex flex-row w-full h-fit">
    <GridLabels />
    <ScrollArea class="w-full" orientation="horizontal">
      <div class="sticky">
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
      <div class="relative h-fit">
        {#each schedules_store.are_checked() as [k, v]}
          {#if v}
            <GridChunk schedule_id={k} />
          {/if}
        {/each}
      </div>
    </ScrollArea>
  </div>

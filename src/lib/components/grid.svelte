<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index";
  import { grid_layout_store, Zoom } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import GridChunk from "$lib/components/gridChunck.svelte";
  import ChunckLabel from "$lib/components/chucks/chunckLabel.svelte";
  import GridChunckAxis from "$lib/components/chucks/gridChunckAxis.svelte";
  $inspect(grid_layout_store.zoom);
</script>

<ScrollArea class="h-full" orientation="vertical">
  <div class="flex flex-row w-full">
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

    <ScrollArea class="w-full" orientation="horizontal">
      <div class="relative">
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
</ScrollArea>

<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index";
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import GridChunk from "$lib/components/gridChunck.svelte";
  import ChunckLabel from "$lib/components/chucks/chunckLabel.svelte";
  import GridChunckAxis from "$lib/components/chucks/gridChunckAxis.svelte";
  import GridChunckAxisDaily from "$lib/components/chucks/gridChunckAxisDaily.svelte";
</script>

<ScrollArea class="h-screen " orientation="vertical">
  <div class="flex flex-row w-full">
    <div id="label-menu" class="w-64">
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
      <div class="sticky" style="height: {grid_layout_store.axis_height}px;">
        <GridChunckAxisDaily />
      </div>
      <div class="relative" style="height: {grid_layout_store.axis_height}px;">
        <GridChunckAxis utc={true} />
      </div>
      <div class="relative" style="height: {grid_layout_store.axis_height}px;">
        <GridChunckAxis utc={false} />
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

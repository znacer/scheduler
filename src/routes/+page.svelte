<script lang="ts">
  import { grid_layout_store, Zoom } from "$lib/stores/grid_layout.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import GridChunk from "$lib/components/gridChunck.svelte";
  import GridChunckAxis from "$lib/components/chucks/gridChunckAxis.svelte";
  import GridLabels from "$lib/components/gridLabels.svelte";

  let scrollY = $state(0);
  const bindScrollY = (node: HTMLElement, val: { scrollY: number }) => {
    $effect(() => {
      node.scrollTop = scrollY;
    });
    const handle = (e: any) => {
      scrollY = e.target.scrollTop;
    };
    node.addEventListener("scroll", handle);
    return {
      destroy: () => removeEventListener("scroll", handle),
    };
  };
  $inspect(scrollY);
  $effect(() => {
    document.getElementById("label-menu")?.scrollTo(0, scrollY);
    document.getElementById("grid-timeline")?.scrollTo(0, scrollY);
  });
</script>

<div class="flex flex-row w-full h-full overflow-scroll pb-10">
  <div
    id="label-menu"
    class="sticky left-0 z-20 w-1/6 h-full"
    use:bindScrollY={{ scrollY }}
  >
    <GridLabels />
  </div>
  <div id="grid-timeline" class="relative w-5/6" use:bindScrollY={{ scrollY }}>
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
    <div class="relative h-full w-full z-0">
      {#each schedules_store.are_checked() as [k, v]}
        {#if v}
          <GridChunk schedule_id={k} />
        {/if}
      {/each}
    </div>
  </div>
</div>

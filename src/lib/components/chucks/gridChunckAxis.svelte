<script lang="ts">
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  interface GridChunckAxisProps {
    utc?: boolean;
  }
  let { utc = false }: GridChunckAxisProps = $props();
  let width = $derived(
    grid_layout_store.nb_columns * grid_layout_store.cell_width,
  );
  let dates = $derived(
    [...Array(grid_layout_store.nb_columns).keys()].map((i) => {
      return grid_layout_store.start + i * grid_layout_store.millisec_by_cell;
    }),
  );
</script>

<div
  class="relative flex flex-row"
  style="height: {grid_layout_store.axis_height}px"
>
  <div class="relative">
    <div class="absolute">
      <svg
        id="grid"
        {width}
        height={grid_layout_store.axis_height}
        xmlns="http://www.w3.org/2000/svg"
      >
        {#each Array(dates.length + 1).keys() as column}
          <line
            x1={column * grid_layout_store.cell_width}
            y1="0"
            x2={column * grid_layout_store.cell_width}
            y2={grid_layout_store.axis_height}
            stroke="#ccc"
            stroke-width="1"
          />
        {/each}
        <line
          x1="0"
          y1={grid_layout_store.axis_height}
          x2={width}
          y2={grid_layout_store.axis_height}
          stroke="#ccc"
          stroke-width="2"
        />
      </svg>
    </div>

    <div class="absolute flex h-full">
      {#each dates as date_col}
        <p
          class="text-center text-sm content-center"
          style="
      width: {grid_layout_store.cell_width}px;
    "
        >
          {Intl.DateTimeFormat("fr", {
            timeStyle: "medium",
            timeZone: utc ? "utc" : grid_layout_store.tz,
          }).format(new Date(date_col))}
        </p>
      {/each}
    </div>
  </div>
</div>

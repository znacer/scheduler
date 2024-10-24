<script lang="ts">
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  let width = $derived(grid_layout_store.nb_columns * grid_layout_store.cell_width);
  let dates = $derived.by(() => {
    let m_dates = new Set();
    [...Array(grid_layout_store.nb_columns).keys()].forEach((i) => {
      let i_date = new Date(grid_layout_store.start + i * grid_layout_store.millisec_by_cell);
      i_date.setUTCHours(0,0,0,0);

      m_dates.add(i_date.getTime())
    })
      return m_dates;
    });
  let cell_width = $derived(24 * grid_layout_store.cell_width);
</script>

<!-- <div class=" flex flex-row" style="height: {grid_layout_store.axis_height}px"> -->
  <div class="relative">
    <div class="absolute">
      <svg
        id="grid"
        {width}
        height={grid_layout_store.axis_height}
        xmlns="http://www.w3.org/2000/svg"
      >
        {#each Array(dates.size + 1).keys() as column}
          <line
            x1={column * cell_width }
            y1="0"
            x2={column * cell_width }
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
          width: {cell_width}px;
        "
        >
          {Intl.DateTimeFormat("fr", {
            dateStyle: "full",
            timeZone: "utc",
          }).format(new Date(date_col as number))}
        </p>
      {/each}
    </div>
  </div>
<!-- </div> -->

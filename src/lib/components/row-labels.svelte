<script lang="ts">
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
</script>

<div>
  <p
    class="border-b border-primary"
    style="height: {grid_layout_store.axis_height}px;"
  >Dates
  </p>
  <p
    class="border-b border-primary"
    style="height: {grid_layout_store.axis_height}px;"
  >
    UTC
  </p>
  <p
    class="border-b border-primary"
    style="height: {grid_layout_store.axis_height}px;"
  >
    {grid_layout_store.tz}
  </p>
  <p
    class="border-b border-primary content-center"
    style="height: {grid_layout_store.cell_height *
      grid_layout_store.nb_lines}px;"
  >
    RowName {grid_layout_store.start} {grid_layout_store.nb_columns}
  </p>
</div>

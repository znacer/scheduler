<script lang="ts">
  import { grid_layout_store, Zoom } from "$lib/stores/grid_layout.svelte";
  import { TZDate } from "@date-fns/tz";
  import { format, startOfDay, startOfWeek } from "date-fns";

  interface GridChunckAxisProps {
    utc?: boolean;
    zoom?: Zoom;
    week_day?: boolean;
  }

  let {
    utc = false,
    zoom = Zoom.HOUR,
    week_day = false,
  }: GridChunckAxisProps = $props();

  let fmt: string = $state("p");
  switch (zoom) {
    case Zoom.DAY:
      fmt = "P";
      break;
    case Zoom.WEEK:
      fmt = "w";
      break;
    default:
      fmt = "p";
  }
  if (week_day) {
    fmt = "EEEEEE";
  }

  let [dates, grid_dates] = $derived.by(() => {
    let m_dates: Map<number, number> = new Map(); //Map<timestamp, size>
    let m_grid_dates: Map<number, number> = new Map(); //Map<timestamp, offset=cumsum(previous sizes)>
    m_dates = new Map();
    let cursor = 0;
    let all_dates: number[] = [];
    for (let i = 0; i < grid_layout_store.nb_columns; i++) {
      let i_date = new Date(
        grid_layout_store.start + i * grid_layout_store.millisec_by_cell,
      );
      switch (zoom) {
        case Zoom.DAY:
          i_date = startOfDay(i_date);
          break;
        case Zoom.WEEK:
          i_date = startOfWeek(i_date);
          break;
      }
      all_dates.push(i_date.getTime());
    }
    all_dates.sort();
    for (let ii_date of all_dates) {
      const previous = m_dates.get(ii_date);
      if (previous) {
        m_dates.set(ii_date, previous + 1);
        cursor += previous + 1;
      } else {
        m_dates.set(ii_date, 1);
        cursor += 1;
      }
      m_grid_dates.set(ii_date, cursor);
    }
    return [m_dates, m_grid_dates];
  });
  if (zoom === Zoom.DAY) {
    $inspect(dates);
    $inspect(grid_dates);
  }
</script>

<div class="flex flex-row" style="height: {grid_layout_store.axis_height}px">
  <div class="relative">
    <div class="absolute flex h-full">
      {#each dates as d_elt}
        <p
          class="text-center text-sm content-center border border-primary z-10"
          style="
          width: {d_elt[1] * grid_layout_store.cell_width}px;
          "
        >
          {(zoom == Zoom.WEEK ? "S" : "") +
            format(
              TZDate.tz(utc ? "utc" : grid_layout_store.tz, d_elt[0]),
              fmt,
            )}
        </p>
      {/each}
    </div>
  </div>
</div>

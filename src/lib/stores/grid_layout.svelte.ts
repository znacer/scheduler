export enum Zoom {
  HOUR = 60 * 60 * 1000,
  DAY = 24 * 60 * 60 * 1000,
  WEEK = 7 * 24 * 60 * 60 * 1000,
}
  function start_of_day_now(): number {
      let start = new Date()
      start.setHours(0)
      start.setMinutes(0)
      start.setSeconds(0)
      return start.getTime()
  }
export function create_layout() {
  let start = $state(start_of_day_now());
  let nb_lines = $state(5);
  let nb_colomns = $state(23);
  const cell_height = 50;
  const axis_height = 30;
  let zoom = $state(Zoom.HOUR);
  let millisec_by_cell = $derived(zoom); // 1 hour
  let cell_width = $state(60);
  let tz = $state("Europe/Paris");

  function set_tz(new_tz: string) {
    tz = new_tz;
  }
  function set_start(new_start: number) {
    start = new_start;
  }
  function set_end(new_end: number) {
    nb_colomns = Math.ceil((new_end - start) / millisec_by_cell);
  }
  function set_zoom(new_zoom: Zoom) {
    zoom = new_zoom;
    switch (zoom) {
      case Zoom.DAY:
        return 100;
      default:
        return 60;
    }
  }
  function set_nb_lines(new_nb_lines: number) {
    nb_lines = new_nb_lines;
  }
  function set_cell_width(v: number) {
    cell_width = v;
  }

  return {
    get nb_lines() {
      return nb_lines;
    },
    set_nb_lines,
    get nb_columns() {
      return nb_colomns;
    },
    get cell_height() {
      return cell_height;
    },
    get cell_width() {
      return cell_width;
    },
    get millisec_by_cell() {
      return millisec_by_cell;
    },
    get zoom() {
      return zoom;
    },
    set_zoom,
    get axis_height() {
      return axis_height;
    },
    get tz() {
      return tz;
    },
    set_tz,
    get start() {
      return start;
    },
    set_start,
    set_end,
    set_cell_width
  };
}

export const grid_layout_store = create_layout();

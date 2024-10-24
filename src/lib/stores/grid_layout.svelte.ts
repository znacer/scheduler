export function create_layout() {

  let start = $state(1729468800 * 1000);
  let nb_lines = $state(5);
  let nb_colomns = $state(24);
  let millisec_by_cell = $state(60 * 60 * 1000); // 1 hour
  const cell_height = 100;
  const cell_width = 100;
  const axis_height = 30;
  let tz = $state("Europe/Paris");

  function set_millisec_by_cell(new_sec_by_cell: number) { millisec_by_cell = new_sec_by_cell; }
  function set_tz(new_tz: string) { tz = new_tz; }
  function set_start(new_start: number) { start = new_start; }
  function set_end(new_end: number) { nb_colomns = (new_end - start) / millisec_by_cell; }
  function set_nb_lines(new_nb_lines: number) { nb_lines = new_nb_lines; }

  return {
    get nb_lines() { return nb_lines; },
    set_nb_lines,
    get nb_columns() { return nb_colomns; },
    get cell_height() { return cell_height; },
    get cell_width() { return cell_width; },
    get millisec_by_cell() { return millisec_by_cell; },
    set_sec_by_cell: set_millisec_by_cell,
    get axis_height() { return axis_height; },
    get tz() { return tz; },
    set_tz,
    get start() { return start; },
    set_start,
    set_end,
  }
}

export const grid_layout_store = create_layout();

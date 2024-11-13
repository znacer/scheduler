import { SvelteMap, SvelteSet } from "svelte/reactivity";
import { arrange_schedule_lines, tasks_store } from "./tasks.svelte";

export enum ColorPalette {
  NEUTRAL = "#404040",
  STONE = "#44403c",
  RED = "#b91c1c",
  ORANGE = "#c2410c",
  YELLOW = "#a16207",
  LIME = "#15803d",
  EMERALD = "#047857",
  SKY = "#0369a1",
  PURPLE = "#7e22ce",
}
export const colorHashMap: Map<string, ColorPalette> = new Map(
  Object.entries(ColorPalette),
);
export function random_color(): ColorPalette {
  return Object.values(
    ColorPalette,
  )[Math.floor(Math.random() * Object.keys(ColorPalette).length)];
}

export type Tasks = SvelteSet<number>;

export interface Schedule {
  id: number;
  name?: string;
  tasks: Tasks;
}

export function create_schedules() {
  let schedules: SvelteMap<number, Schedule> = $state(new SvelteMap());
  let checked: SvelteMap<number, boolean> = $state(new SvelteMap());
  let lines_task: SvelteMap<number, number> = $state(new SvelteMap());
  let lines_max: SvelteMap<number, number> = $state(new SvelteMap());

  function schedule_by_id(id: number): Schedule | undefined {
    return schedules.get(id);
  }

  function append(new_schedule: Schedule) {
    schedules.set(new_schedule.id, new_schedule);
    checked.set(new_schedule.id, true); //default to visible
  }

  function add_schedules(new_schedules: Schedule[]) {
    schedules = new SvelteMap();
    new_schedules.forEach((s) => {
      append(s);
    });
  }

  function ids() {
    return [...schedules.keys()];
  }

  function tasks(schedule_id: number): Tasks {
    let s = schedules.get(schedule_id);
    if (s) {
      return s.tasks;
    } else {
      return new SvelteSet();
    }
  }

  function arrange_lines(schedule_id: number): Map<number, number> {
    const out = arrange_schedule_lines(tasks_store.from_schedule(schedule_id));
    out.forEach((v, k) => {
      lines_task.set(k, v);
    });
    const nb = [...out.values()].reduce((p, c) => Math.max(p, c));
    lines_max.set(schedule_id, nb + 1);
    return out;
  }

  function nb_lines(schedule_id: number): number {
    let nb = lines_max.get(schedule_id);
    if (nb) {
      return nb;
    } else {
      return 0;
    }
  }

  function task_line(task_id: number): number {
    let l = lines_task.get(task_id);
    if (l) {
      return l;
    } else {
      return 0;
    }
  }

  function check(id: number) {
    let s = schedules.get(id);
    if (s) {
      checked.set(s.id, true);
    }
  }
  function uncheck(id: number) {
    let s = schedules.get(id);
    if (s) {
      checked.set(s.id, false);
    }
  }

  function is_check(id: number): boolean {
    let out = checked.get(id);
    if (out) {
      return out;
    }
    return false;
  }

  function name(id: number): string {
    let s = schedules.get(id);
    if (s) {
      if (s.name) {
        return s.name;
      }
      return s.id.toString();
    }
    return "";
  }
  function are_checked(): SvelteMap<number, boolean> {
    return checked;
  }

  function set_task(schedule_id: number, task: number) {
    let s = schedules.get(schedule_id);
    if (s) {
      s.tasks.add(task);
      schedules.set(schedule_id, s);
    }
  }

  function reset() {
    schedules = new SvelteMap();
    checked = new SvelteMap();
    lines_task = new SvelteMap();
    lines_max = new SvelteMap();
  }

  return {
    reset,
    get schedules() {
      return schedules;
    },
    schedule_by_id,
    append,
    add_schedules,
    ids,
    tasks,
    check,
    uncheck,
    is_check,
    are_checked,
    name,
    set_task,
    arrange_lines,
    nb_lines,
    task_line,
  };
}

export const schedules_store = create_schedules();

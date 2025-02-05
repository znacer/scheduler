import { SvelteMap, SvelteSet } from "svelte/reactivity";
import { arrange_schedule_lines, tasks_store } from "./tasks.svelte";
import { ColorPalette } from "./categories.svelte";
import type { z } from "zod";
import type { scheduleSchema } from "$lib/server/db/schema/schedule";

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
  name: string;
  tasks: Tasks;
  description: string,
  writer: string;
  readers: string[];
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
    // attach tasks to schedule
    tasks_store.from_schedule(new_schedule.id).forEach((_, t_id) => {
      set_task(new_schedule.id, t_id);
    })
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
    if (out.size === 0) {
      lines_max.set(schedule_id, 1);
      return out;
    }
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
  function check_switch() {
    let sum = [...checked.values()].reduce((p, c) => p + (c ? 1 : 0), 0)
    if (sum < schedules.size) {
      schedules.forEach((_, k) => {
        checked.set(k, true);
      })
    } else {
      schedules.forEach((_, k) => {
        checked.set(k, false);
      })
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

  function init(ss: Map<string, { name: string, id: number, description: string, readers: string[], writer: string }>) {
    schedules = new SvelteMap([...ss.values()].map((s) => [s.id,
    {
      ...s,
      tasks: new SvelteSet()
    }
    ]));
    checked = new SvelteMap([...ss.values()].map(s => [s.id, true]));
  }

  return {
    reset,
    init,
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
    check_switch,
  };
}

export const schedules_store = create_schedules();

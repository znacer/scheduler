import { SvelteMap } from "svelte/reactivity";
import type { ColorPalette } from "./schedules.svelte";

export interface Task {
  id: number;
  schedule_id: number;
  name: string;
  start: number;
  duration: number;
  color?: ColorPalette;
  status?: boolean;
  qualops?: boolean;
}

export function arrange_schedule_lines(
  tasks: Map<number, Task>,
): Map<number, number> {
  // attribute a line to each task such as they do not over lap.
  // returns the number of line needed
  let visited_tasks: number[] = [];
  let nb_lines = 1;
  let lines: Map<number, number> = new Map();

  tasks.forEach((_, k) => {
    lines.set(k, 0);
  }); // inialize all tasks on the first line
  [...tasks.values()].sort((t1: Task, t2: Task) => t1.start - t2.start).forEach(
    (t, idx) => {
      if (idx !== 0) {
        //check with how many previous tasks do this on instersects with
        const intersect = visited_tasks.filter((t_id) => {
          const i_task = tasks.get(t_id);
          if (i_task) {
            return i_task.start + i_task.duration > t.start;
          } else {
            return false;
          }
        });
        let affected = false;
        for (let i = 0; i <= nb_lines; i++) {
          const is_taken = intersect.filter((t_id) => lines.get(t_id) === i);
          if (is_taken.length === 0) {
            lines.set(t.id, i);
            affected = true;
            break;
          }
        }
        if (!affected) {
          nb_lines += 1;
          lines.set(t.id, nb_lines);
        }
      } else {
        lines.set(t.id, 0);
      }
      visited_tasks.push(t.id);
    },
  );
  return lines;
}

export function create_tasks() {
  let tasks: SvelteMap<number, Task> = $state(new SvelteMap());

  function task_by_id(id: number): Task | undefined {
    return tasks.get(id);
  }

  function append(new_task: Task) {
    tasks.set(new_task.id, new_task);
  }

  function from_schedule(schedule_id: number): Map<number, Task> {
    let s_tasks = new Map();
    tasks.forEach((v, k) => {
      if (v.schedule_id === schedule_id) {
        s_tasks.set(k, v);
      }
    });
    return s_tasks;
  }

  function reset() {
    tasks = new SvelteMap();
  }

  function new_task(
    schedule_id: number,
    name: string,
    start: number,
    duration: number,
  ): Task {
    return { id: 0, schedule_id, name, start, duration } as Task;
  }
  return {
    reset,
    get tasks() {
      return tasks;
    },
    task_by_id,
    append,
    from_schedule,
    new_task,
  };
}

export const tasks_store = create_tasks();

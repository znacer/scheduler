import { schedules_store, type Schedule } from "$lib/stores/schedules.svelte";
import { tasks_store, type Task } from "$lib/stores/tasks.svelte";
import { SvelteSet } from "svelte/reactivity";
import { pim_store } from "./stores/pims.svelte";

interface TaskRequest {
  id: number;
  name: string;
  description: string;
  start: number;
  duration: number;
  category: number;
  schedule_id: number;
}

interface ScheduleRequest {
  id: number;
  name: string;
  description: string;
}

export async function get_data() {
  const res_schedules = await fetch(`http://localhost:8081/scheduler/list-schedules`);
  const schedules: ScheduleRequest[] = await res_schedules.json();

  const res_tasks = await fetch(`http://localhost:8081/scheduler/list-tasks`);
  const tasks: TaskRequest[] = await res_tasks.json();

  schedules_store.reset();
  tasks_store.reset();
  pim_store.reset();
  schedules.forEach((s: ScheduleRequest) => {
    schedules_store.append({
      id: s.id,
      name: s.name,
      tasks: new SvelteSet<number>(),
    } as Schedule);
  });
  tasks.forEach((t) => {
    tasks_store.append({
      id: t.id,
      name: t.name,
      schedule_id: t.schedule_id,
      start: t.start,
      duration: t.duration,
    } as Task);
    schedules_store.set_task(t.schedule_id, t.id);
  });


  pim_store.append(1, [
    {
      position: [5.97, 43.05],
      timestamp: 1729468800000,
      name: "WP01",
      description: undefined,
    },
    {
      position: [5.92, 43],
      timestamp: 1729478800000,
      name: "WP02",
      description: "une description",
    },
    {
      position: [5.96, 43],
      timestamp: 1729528800000,
      name: "WP03",
      description: undefined,
    },
    {
      position: [6, 42.9],
      timestamp: 1729668800000,
      name: "WP04",
      description: undefined,
    },
  ]);
}
export function reset_data() {
  schedules_store.reset();
  tasks_store.reset();
  pim_store.reset();

}


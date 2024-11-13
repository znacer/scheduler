import { schedules_store, type Schedule } from "$lib/stores/schedules.svelte";
import { tasks_store, type Task } from "$lib/stores/tasks.svelte";
import { SvelteSet } from "svelte/reactivity";
import { pim_store } from "./stores/pims.svelte";
import { PUBLIC_BACKEND_URL } from "$env/static/public";

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
  const res_schedules = await fetch(`${PUBLIC_BACKEND_URL}/list-schedules`);
  const schedules: ScheduleRequest[] = await res_schedules.json();

  const res_tasks = await fetch(`${PUBLIC_BACKEND_URL}/list-tasks`);
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


function transform_task(t: Task): TaskRequest {
  return {
    id: t.id,
    name: t.name,
    description: "",
    start: t.start,
    duration: t.duration,
    category: 0,
    schedule_id: t.schedule_id,
  };
}

export async function new_task(t: Task): Promise<TaskRequest> {
  const body = JSON.stringify(transform_task(t))
  const request_options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body
  };
  const res = await fetch(`${PUBLIC_BACKEND_URL}/new-task`, request_options);
  const data = await res.json();
  return JSON.parse(data);
}

export async function update_task(t: Task) {
  const body = JSON.stringify(transform_task(t))
  const request_options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body
  };
  await fetch(`${PUBLIC_BACKEND_URL}/update-task`, request_options);
}

export async function update_all_tasks() {
  for (let [_, t] of tasks_store.tasks) {
    update_task(t)
  }
}

function transform_schedule(s: Schedule): ScheduleRequest {
  return {
    id: s.id,
    name: s.name ? s.name : s.id.toString(),
    description: ""
  };
}

export async function new_schedule(s: Schedule): Promise<ScheduleRequest> {
  let body = JSON.stringify(transform_schedule(s))
  const request_options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body
  };
  const res = await fetch(`${PUBLIC_BACKEND_URL}/scheduler/new-schedule`, request_options);
  const data = await res.json();
  return data;
}
export async function update_schedule(s: Schedule) {
  const body = JSON.stringify(transform_schedule(s))
  const request_options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body
  };
  await fetch(`${PUBLIC_BACKEND_URL}/update-schedule`, request_options);
}


export async function update_all_schedules() {
  for (let [_, s] of schedules_store.schedules) {
    update_schedule(s)
  }
}



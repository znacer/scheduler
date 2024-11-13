import { schedules_store } from "$lib/stores/schedules.svelte";
import { type Task, tasks_store } from "$lib/stores/tasks.svelte";
import { SvelteSet } from "svelte/reactivity";
import { pim_store } from "./stores/pims.svelte";

interface TaskApiModel {
  id: number;
  name: string;
  description: string;
  start: number;
  duration: number;
}

interface ScheduleApiModel {
  id: number;
  name: string;
  tasks: TaskApiModel[];
}

export function test_producer(nb_objects: number): TaskApiModel[] {
  const initial_timestamp = 1729468800000;
  const objects = [];
  for (let i = 0; i < nb_objects; i++) {
    const id = Math.floor(Math.random() * 1789);
    const name = `Task ${i + 1}`;
    const description = `Description de l'objet ${i + 1}`;
    let start = initial_timestamp + (Math.random() * 43200000); // timestamp aléatoire dans les 24 prochaines heures
    start -= start % 60_000;
    const duration = Math.floor(Math.random() * 21) * 900000 + 900000; // durée aléatoire entre 15 minutes et 6 heures
    objects.push({ id, name, description, start, duration });
  }
  return objects;
}

export async function get_schedules() {
  let data = await fetch_data();
  schedules_store.reset();
  tasks_store.reset();
  pim_store.reset();
  console.log(data)
  data.forEach((s: ScheduleApiModel) => {
    schedules_store.append({
      id: s.id,
      name: s.name,
      tasks: new SvelteSet<number>(),
    });
    s.tasks.forEach((t) => {
      tasks_store.append({
        id: t.id,
        name: t.name,
        schedule_id: s.id,
        start: t.start,
        duration: t.duration,
      });
      schedules_store.set_task(s.id, t.id);
    });
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
async function fetch_data(): Promise<ScheduleApiModel[]> {
  const response = await fetch("/test");
  const data = await response.json();
  return data;
}

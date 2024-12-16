import { get_user_groups } from "$lib/data";
import { SvelteMap } from "svelte/reactivity";

  export interface Group {
    id: number;
    name: string;
    admin?: boolean,
  }
export function create_groups() {
  let groups = $state(new SvelteMap<number, Group>());

  async function load() {
  get_user_groups().then((res: Group[]) => {
    res.forEach((g) => {
      groups.set(g.id, g);
    });
  });
  }
  function reset() {
    groups = new SvelteMap();
  }

  function group(id: number): Group | undefined {
    return groups.get(id);
  }

  return {
    get groups() { return groups; },
    reset,
    group,
    load
  }
}
export const group_store = create_groups();

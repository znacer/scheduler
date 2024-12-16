import { get_users } from "$lib/data";
import { SvelteMap } from "svelte/reactivity";

export interface User {
  id: number;
  name: string;
}
export function create_users() {
  let users = $state(new SvelteMap<number, User>());

  async function load() {
    get_users().then((res: User[]) => {
      res.forEach((g) => {
        users.set(g.id, g);
      });
    });
  }
  function reset() {
    users = new SvelteMap();
  }

  function user(id: number): User | undefined {
    return users.get(id);
  }

  return {
    get users() { return users; },
    reset,
    user,
    load
  }
}
export const user_store = create_users();

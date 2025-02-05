import { SvelteSet } from "svelte/reactivity";

export function create_users() {
  let users = $state(new SvelteSet<string>());

  function reset() {
    users = new SvelteSet();
  }

  
  function init(us: string[]) {
    users = new SvelteSet(us);
  }

  return {
    get users() { return users; },
    reset,
    init,
  }
}
export const user_store = create_users();

import { SvelteMap } from 'svelte/reactivity'

export interface Group {
  name: string
  members?: string[],
  admins?: string[]
}
export function create_groups() {
  let groups = $state(new SvelteMap<string, Group>())

  function reset() {
    groups = new SvelteMap()
  }

  function group(id: string): Group | undefined {
    return groups.get(id)
  }

  function init(gs: Map<string, { admins: string[]; members: string[] }>) {
    groups = new SvelteMap([...gs.entries()].map(([name, members]) => [name, {name,  ...members}]));
  }

  return {
    get groups() {
      return groups
    },
    reset,
    init,
    group,
  }
}
export const group_store = create_groups()

import { SvelteMap } from "svelte/reactivity";

export interface Waypoint {
  position: [longitude: number, latitude: number];
  timestamp: number;
  name: string;
  description?: string;
}
export type PIM = Waypoint[];

export function create_pim() {
  let pims: SvelteMap<number, PIM> = $state(new SvelteMap());

  function pim_by_id(id: number): Waypoint[] | undefined {
    return pims.get(id);
  }

  function append(pim_id: number, new_pim: PIM) {
    pims.set(pim_id, new_pim);
  }

  function reset() {
    pims = new SvelteMap();
  }

  function new_waypoint(
    position: [longitude: number, latitude: number],
    timestamp: number,
    name: string,
    description?: string
  ): Waypoint {
    return { position, timestamp, name, description } as Waypoint;
  }
  return {
    reset,
    get pims() {
      return pims;
    },
    pim_by_id,
    append,
    new_waypoint,
  };
}

export const pim_store = create_pim();

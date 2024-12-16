import { SvelteMap } from "svelte/reactivity";

export enum ColorPalette {
  NEUTRAL = "#3c6382",
  STONE = "#44403c",
  RED = "#b71540",
  ORANGE = "#e58e26",
  YELLOW = "#f6b93b",
  EMERALD = "#079992",
  SKY = "#4a69bd",
  PURPLE = "#7e22ce",
}

export function create_categories() {
  let categories = $state(new SvelteMap());
  let colors = $state(new SvelteMap());

  function reset() {
    categories = new SvelteMap();
    colors = new SvelteMap();
  }

  function set_name(id: number, name: string) {
    categories.set(id, name);
    colors.set(id, ColorPalette.STONE);
  }
  function set_color(id: number, color: ColorPalette) {
    colors.set(id, color);
  }
  function name(id: number) {
    return categories.get(id);
  }
  function color(id: number) {
    return colors.get(id);
  }

  return {
    get categories() { return categories; },
    get colors() { return colors; },
    reset,
    set_name,
    set_color,
    name,
    color,
  }
}
export const categories_store = create_categories();

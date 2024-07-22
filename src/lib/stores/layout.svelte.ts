import { endOfDay, startOfDay } from 'date-fns';
import { derived, writable } from 'svelte/store';
// import { clientWidth } from '$lib/components/Row.svelte'

const start = startOfDay(new Date());
const end = endOfDay(new Date());
export let startDate = $state(start);
export let endDate = $state(end);
// export let pixelWidth = $derived(clientWidth)
export function createPixelWidth() {
  let pixelWidth = $state(0);

  return {
    get pixelWidth() { return pixelWidth },
    set pixelWidth(newPixelWidth: number) { pixelWidth = newPixelWidth }
  }
}
export let pixelWidth = createPixelWidth();

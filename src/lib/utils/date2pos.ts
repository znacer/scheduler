import { endDate, pixelWidth, startDate } from "$lib/stores/layout.svelte";
export function date2pos(
  myDate: Date,
): number {
  const timeWidth: number = endDate - startDate;
  const myTimeWidth: number = myDate - startDate;
  const myPixelWidth: number = Math.floor(pixelWidth.pixelWidth * (myTimeWidth / timeWidth));
  return myPixelWidth;
}


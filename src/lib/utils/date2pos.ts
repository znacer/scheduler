import { pixelWidth, layoutDate } from "$lib/stores/layout.svelte";
export function date2pos(
  myDate: Date,
): number {
  const timeWidth: number = layoutDate.endDate - layoutDate.startDate;
  const myTimeWidth: number = myDate - layoutDate.startDate;
  const myPixelWidth: number = Math.floor(pixelWidth.pixelWidth * (myTimeWidth / timeWidth));
  return Math.max(myPixelWidth, 0);
}


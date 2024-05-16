import type { TaskElement } from "./stores/events";

export function date2pos(
  myDate: Date,
  initDate: Date,
  lastDate: Date,
  pixelWidth: number,
): number {
  const timeWidth: number = lastDate - initDate;
  const myTimeWidth: number = myDate - initDate;
  const myPixelWidth: number = Math.floor(pixelWidth * (myTimeWidth / timeWidth));
  return myPixelWidth;
}


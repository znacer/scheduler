import { endOfDay, startOfDay } from 'date-fns';
import { derived, writable } from 'svelte/store';

const start = startOfDay(new Date());
const end = endOfDay(new Date());
export const startDate = writable(start);
export const endDate = writable(end);
export const timeWidth = derived([startDate, endDate], ([$startDate, $endDate]) => $endDate - $startDate);
export const pixelWidth = writable(0);

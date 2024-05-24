import { TaskElement } from "$lib/stores/events";
export type RowsGet = {
	name: string;
	tasks: { name: string; start: Date; end: Date }[];
};
export type RowContents = {
	name: string,
	tasks: TaskElement[][]
};

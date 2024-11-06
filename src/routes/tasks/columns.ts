import type { Task } from "$lib/stores/tasks.svelte";
import type { ColumnDef } from "@tanstack/table-core";
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
 
export const columns: ColumnDef<Task>[] = [
 {
  accessorKey: "status",
  header: "Etat",
 },
 {
  accessorKey: "name",
  header: "Nom",
 },
 {
  accessorKey: "start",
  header: "Date",
 },
];

import { renderComponent, renderSnippet } from "$lib/components/ui/data-table";
import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
import type { Task } from "$lib/stores/tasks.svelte";
import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import DataTableActions from "./data-table-actions.svelte";
import DataTableDateButton from './data-table-date-button.svelte';
import { schedules_store } from "$lib/stores/schedules.svelte";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) =>
      renderComponent(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate:
          table.getIsSomePageRowsSelected() &&
          !table.getIsAllPageRowsSelected(),
        onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        controlledChecked: true,
        "aria-label": "Select all",
      }),
    cell: ({ row }) =>
      renderComponent(Checkbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
        controlledChecked: true,
        "aria-label": "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
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
    // header: "Date",
    header: ({ column }) =>
      renderComponent(DataTableDateButton, {
        onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
      }),
    cell: ({ row }) => {
      const formatter = new Intl.DateTimeFormat("fr", {
        dateStyle: "long",
        timeStyle: "long",
        timeZone: grid_layout_store.tz,
      });

      const dateCellSnippet = createRawSnippet<[string]>((getDate) => {
        const date = getDate();
        return {
          render: () => `${date}`,
        };
      });

      return renderSnippet(
        dateCellSnippet,
        formatter.format(parseFloat(row.getValue("start")))
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Durée",
    cell: ({ row }) => {
      const formatter = new Intl.DateTimeFormat("fr", {
        timeStyle: "medium",
      });

      const durationCellSnippet = createRawSnippet<[string]>((getDuration) => {
        const duration = getDuration();
        return {
          render: () => `${duration}`,
        };
      });

      return renderSnippet(
        durationCellSnippet,
        formatter.format(parseFloat(row.getValue("duration")) * 24)
      );
    },
  },
  {
    header: "Fin",
    cell: ({ row }) => {
      const formatter = new Intl.DateTimeFormat("fr", {
        dateStyle: "long",
        timeStyle: "long",
        timeZone: grid_layout_store.tz,
      });

      const dateCellSnippet = createRawSnippet<[string]>((getDate) => {
        const date = getDate();
        return {
          render: () => `${date}`,
        };
      });

      return renderSnippet(
        dateCellSnippet,
        formatter.format(parseFloat(row.getValue("start")) + parseFloat(row.getValue("duration")))
      );
    },
  },
  {
    accessorKey: "schedule_id",
    header: "Ressource",
    cell: ({ row }) => {

      const resourceCellSnippet = createRawSnippet<[string]>((getResource) => {
        const resource = getResource();
        return {
          render: () => `${resource}`,
        };
      });

      const schedule = schedules_store.schedule_by_id(row.getValue("schedule_id"));
      let name = "";
      if (schedule) {
        name = schedule.id.toString()
        if (schedule.name) {
          name = schedule.name
        }
      }
      return renderSnippet(
        resourceCellSnippet,
        name
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      // You can pass whatever you need from `row.original` to the component
      return renderComponent(DataTableActions, { id: row.original.id });
    },
  },
];

<script lang="ts" generics="TData, TValue">
  import {
    type ColumnDef,
    type PaginationState,
    type SortingState,
    type ColumnFiltersState,
    type RowSelectionState,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
  } from "@tanstack/table-core";
  import {
    createSvelteTable,
    FlexRender,
  } from "$lib/components/ui/data-table/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  type DateTableProps<TData, TValue> = {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
  };

  let { data, columns }: DateTableProps<TData, TValue> = $props();
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let columnFilters = $state<ColumnFiltersState>([]);
  let rowSelection = $state<RowSelectionState>({});

  $inspect(columnFilters);
  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    state: {
      get pagination() {
        return pagination;
      },
      get sorting() {
        return sorting;
      },
      get columnFilters() {
        return columnFilters;
      },
      get rowSelection() {
        return rowSelection;
      },
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === "function") {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
    },
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
</script>

<div class="flex items-center py-4">
  <Input
    placeholder="Filtrer les ressources... (WIP)"
    value={(table.getColumn("schedule_id")?.getFilterValue() as string) ?? ""}
    onchange={(e) => {
      table.getColumn("schedule_id")?.setFilterValue(e.currentTarget.value);
    }}
    oninput={(e) => {
      table.getColumn("schedule_id")?.setFilterValue(e.currentTarget.value);
    }}
    class="max-w-sm"
  />
</div>
<div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
        <Table.Row>
          {#each headerGroup.headers as header (header.id)}
            <Table.Head>
              {#if !header.isPlaceholder}
                <FlexRender
                  content={header.column.columnDef.header}
                  context={header.getContext()}
                />
              {/if}
            </Table.Head>
          {/each}
        </Table.Row>
      {/each}
    </Table.Header>
    <Table.Body class="h-full overflow-scroll">
      {#each table.getRowModel().rows as row (row.id)}
        <Table.Row data-state={row.getIsSelected() && "selected"}>
          {#each row.getVisibleCells() as cell (cell.id)}
            <Table.Cell>
              <FlexRender
                content={cell.column.columnDef.cell}
                context={cell.getContext()}
              />
            </Table.Cell>
          {/each}
        </Table.Row>
      {:else}
        <Table.Row>
          <Table.Cell colspan={columns.length} class="h-24 text-center">
            No results.
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
	
<div class="text-muted-foreground flex-1 text-sm">
  {table.getFilteredSelectedRowModel().rows.length} of{" "}
  {table.getFilteredRowModel().rows.length} row(s) selected.
</div>

<div class="flex items-center justify-end space-x-2 py-4">
  <Button
    variant="outline"
    size="sm"
    onclick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
  >
    Précédent
  </Button>
  <Button
    variant="outline"
    size="sm"
    onclick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
  >
    Suivant
  </Button>
</div>

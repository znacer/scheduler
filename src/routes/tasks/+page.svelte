<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import { tasks_store } from "$lib/stores/tasks.svelte";

  let data = $derived(Array.from(tasks_store.tasks.values()));
</script>

<DataTable {data} {columns} />

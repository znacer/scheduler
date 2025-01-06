<script lang="ts">
  import { group_store } from "$lib/stores/groups.svelte";

  let { selected_group_id }: { selected_group_id: number } = $props();
</script>

<p>{group_store.group(selected_group_id)?.name}</p>

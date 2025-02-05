<script lang="ts">
  import type { LayoutServerData } from "../$types";
  import GroupCard from "./group_card.svelte";
  let { data }: { data: LayoutServerData } = $props();
</script>

<div class="h-full w-full flex px-4 gap-4">
  <GroupCard class="w-full overflow-y-auto" username={data.username} />
</div>

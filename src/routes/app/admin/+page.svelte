<script lang="ts">
  import { group_store } from "$lib/stores/groups.svelte";
  import { user_store } from "$lib/stores/users.svelte";
  import GroupAddCard from "./group_add_card.svelte";
  import GroupCard from "./group_card.svelte";

  $effect(() => {
    group_store.load();
    user_store.load();
  });
</script>

<h1>Admin Panel</h1>
<div
  class="h-full overflow-auto grid grid-cols-6 grid-rows-4 items-start justify-center gap-2"
>
  <GroupCard
    class="col-span-3 row-span-2 h-full w-full overflow-scroll"
  />
  <GroupAddCard
    class="col-span-1 row-span-1 h-full w-full"
  />
  {#each Array(12).keys() as i}
    <div
      class="w-full h-full rounded-xl opacity-10 bg-orange-500 flex justify-center items-center"
    >
      {i}
    </div>
  {/each}
</div>

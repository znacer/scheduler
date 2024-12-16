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

<div class="wrapper"></div>
<h1>Admin Panel</h1>
<div class="grid grid-cols-6 grid-rows-12 items-start justify-center gap-2">
  <GroupCard class="col-span-2 row-span-2 h-full w-full" />
  <GroupAddCard class="col-span-1 row-span-1 h-full w-full" />
  {#each Array(24).keys() as i}
    <div
      class="w-full h-full rounded-xl bg-orange-500 flex justify-center items-center"
    >
      {i}
    </div>
  {/each}
</div>

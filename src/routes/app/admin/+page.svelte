<script lang="ts">
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";
  import { group_store, type Group } from "$lib/stores/groups.svelte";
  import { user_store, type User } from "$lib/stores/users.svelte";
  import type { PageServerData } from "./$types";
  import GroupAddCard from "./group_add_card.svelte";
  import GroupCard from "./group_card.svelte";
  import GroupManager from "./group_manager.svelte";
  import TimelineAddCard from "./timeline_add_card.svelte";

  let { data }: { data: PageServerData } = $props();
  $effect(() => {
    if (data) {
      data.user_groups.forEach((g: Group) => {
        group_store.groups.set(g.id, g);
      });
      data.users.forEach((u: User) => {
        user_store.users.set(u.id, u);
      });
    }
  });
</script>

<ScrollArea class="h-full">
  <div
    class="h-full overflow-auto grid grid-cols-6 grid-rows-6 items-start justify-center gap-2"
  >
    <GroupManager class="col-span-3 row-span-3 h-full w-full overflow-scroll" />
    <GroupCard class="col-span-3 row-span-3 h-full w-full overflow-scroll" />
    <GroupAddCard class="col-span-2 row-span-1 h-full w-full" />
    <TimelineAddCard class="col-span-2 row-span-1 h-full w-full" />
    {#each Array(22).keys() as i}
      <div
        class="w-full h-full rounded-xl opacity-10 bg-orange-500 flex justify-center items-center"
      >
        {i}
      </div>
    {/each}
  </div>
</ScrollArea>

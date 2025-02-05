<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { group_store } from "$lib/stores/groups.svelte";
  import { ChevronDown, ChevronLeft } from "lucide-svelte";
  import { SvelteSet } from "svelte/reactivity";
  import { slide } from "svelte/transition";
  import GroupAccordeonContent from "./group_accordeon_content.svelte";

  let { username }: { username: string } = $props();

  let open_items = $state(new SvelteSet());

  let my_groups = $derived([...group_store.groups.values()].filter((g) => g.members?.includes(username) || g.admins?.includes(username)));
  console.log(group_store.groups)
  function toggleItem(id: string) {
    if (open_items.has(id)) {
      open_items.delete(id);
    } else {
      open_items.add(id);
    }
  }
</script>

<div class="flex flex-col space-y-2">
  {#each my_groups as group}
    {#if group.name !== username }
        <Button
          variant="secondary"
          class="w-full justify-between"
          onclick={() => toggleItem(group.name)}
        >
          <span></span>
          <span>{group.name}</span>
          {#if open_items.has(group.name)}
            <ChevronDown />
          {:else}
            <ChevronLeft />
          {/if}
        </Button>
      {#if open_items.has(group.name)}
        <div in:slide={{ duration: 200 }} out:slide={{ duration: 200 }}>
          <GroupAccordeonContent groupname={group.name} {username} isadmin={group.admins?.includes(username) ?? false} />
        </div>
      {/if}
    {/if}
  {/each}
</div>

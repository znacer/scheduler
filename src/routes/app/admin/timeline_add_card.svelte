<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import { group_store } from "$lib/stores/groups.svelte";
  import { user_store } from "$lib/stores/users.svelte";
  import { cn } from "$lib/utils";

  interface GroupCardProps {
    class?: string;
  }
  let { class: className }: GroupCardProps = $props();

  let group_to_add: string | undefined = $state();
  let group_to_add_trigger = $derived(group_to_add ? group_to_add : "Groupe");
  let users_to_add = $state();
</script>

<Card.Root
  class={cn("bg-card text-card-foreground rounded-xl border shadow", className)}
>
  <Card.Header
    class="sticky top-0 rounded-xl bg-background bg-opacity-100 z-10 text-center py-2"
  >
    <Card.Title>Ajouter un linéaire</Card.Title>
  </Card.Header>
  <Card.Content class="flex flex-col space-y-2 w-full">
    <div class="flex flex-col space-x-2 w-full justify-center">
      <Input type="text" placeholder="Nom du linéaire" />

      <Select.Root type="single" bind:value={group_to_add}>
        <Select.Trigger class="w-[180px]">{group_to_add_trigger}</Select.Trigger
        >
        <Select.Content>
          {#each group_store.groups as [_, group]}
            {#if group.admin}
              <Select.Item value={group.name}>{group.name}</Select.Item>
            {/if}
          {/each}
        </Select.Content>
      </Select.Root>

      <Button class="w-1/3" onclick={() => console.log("add")}>Valider</Button>
    </div>
  </Card.Content>
</Card.Root>

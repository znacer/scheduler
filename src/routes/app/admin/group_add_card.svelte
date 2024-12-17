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
  let users_to_add = $state([]);
</script>

<Card.Root
  class={cn("bg-card text-card-foreground rounded-xl border shadow", className)}
>
  <Card.Header
    class="sticky top-0 rounded-xl bg-background bg-opacity-100 z-10 text-center py-2"
  >
    <Card.Title>Ajouter un utilisateur à un groupe</Card.Title>
  </Card.Header>
  <Card.Content class="flex flex-col space-y-2 w-full pb-0 pt-2 ">
    <div class="flex space-x-2 w-full justify-center">
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

      <Input
        list="users"
        placeholder="utilisteurs"
        oninput={(e) => console.log(e)}
      />
      <datalist id="users">
        {#each user_store.users as [_, user]}
          <option value={user.name}>{user.name}</option>
        {/each}
      </datalist>
    </div>
    {#if users_to_add.length > 0}
      {#each users_to_add as user}
        <p>{user}</p>
      {/each}
    {/if}
  </Card.Content>
  <Card.Footer
    class="space-x-2 sticky bottom-0 bg-background bg-opacity-100 py-2 w-full"
  >
    <div class="flex justify-center w-full">
      <Button class="w-1/3" onclick={() => console.log("add")}>Valider</Button>
    </div>
  </Card.Footer>
</Card.Root>

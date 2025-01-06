<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { new_group } from "$lib/data";
  import { group_store } from "$lib/stores/groups.svelte";
  import { cn } from "$lib/utils";
  import GroupCombobox from "./group_combobox.svelte";
  import GroupForm from "./group_form.svelte";

  interface GroupCardProps {
    class?: string;
  }
  let { class: className }: GroupCardProps = $props();

  let new_group_name = $state("");
  let selected_group_id: number | undefined = $state();
  $inspect(selected_group_id);
</script>

<Card.Root
  class={cn("bg-card text-card-foreground rounded-xl border shadow", className)}
>
  <Card.Header
    class="sticky top-0 rounded-xl bg-background bg-opacity-100 z-10 text-center py-2"
  >
    <Card.Title>Gestion des Groupes</Card.Title>
  </Card.Header>
  <Card.Content class="flex flex-col space-y-2 w-full">
    <GroupCombobox bind:selected_group_id />
    {#if selected_group_id !== undefined}
      <GroupForm {selected_group_id} />
    {/if}
  </Card.Content>
  <Card.Footer
    class="space-x-2 sticky bottom-0 bg-background bg-opacity-100 py-2"
  >
    <Input
      type="text"
      placeholder="Nom du nouveau groupe à créer"
      bind:value={new_group_name}
    />
    <Button
      onclick={() => {
        new_group(new_group_name).then(async () => {
          await group_store.load();
        });
      }}>Valider</Button
    >
  </Card.Footer>
</Card.Root>

<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { group_store } from "$lib/stores/groups.svelte";
  import { new_group } from "$lib/data";
  import GroupTable from "./group_table.svelte";
  import { cn } from "$lib/utils";

  interface GroupCardProps {
    class?: string;
  }
  let { class: className }: GroupCardProps = $props();
  let new_group_name = $state("");
</script>

<Card.Root
  class={cn("bg-card text-card-foreground rounded-xl border shadow", className)}
>
  <Card.Header
    class="sticky top-0 bg-background bg-opacity-100 z-10 text-center py-2"
  >
    <Card.Title>Mes groupes</Card.Title>
  </Card.Header>
  <Card.Content>
    <GroupTable />
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

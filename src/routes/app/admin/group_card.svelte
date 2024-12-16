<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { group_store } from "$lib/stores/groups.svelte";
  import { new_group } from "$lib/data";
  import GroupTable from "./group_table.svelte";
  import { cn } from "$lib/utils";
  import ScrollArea from "$lib/components/ui/scroll-area/scroll-area.svelte";

  interface GroupCardProps {
    class?: string;
  }
  let { class: className }: GroupCardProps = $props();
  let new_group_name = $state("");
</script>

<Card.Root
  class={cn("bg-card text-card-foreground rounded-xl border shadow", className)}
>
  <Card.Header class="h-1/12">
    <Card.Title>Mes groupes</Card.Title>
  </Card.Header>
  <Card.Content class="h-10/12">
    <ScrollArea class="max-h-52">
      <GroupTable />
    </ScrollArea>
  </Card.Content>
  <Card.Footer class="space-x-2 h-1/12">
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

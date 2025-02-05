<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { cn } from "$lib/utils";
  import { enhance } from "$app/forms";
  import GroupAccordeon from "./group_accordeon.svelte";

  interface GroupCardProps {
    class?: string;
    username: string;
  }
  let { class: className, username }: GroupCardProps = $props();
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
    <GroupAccordeon {username} />
  </Card.Content>
  <form action="?/new_group" method="post" use:enhance>
    <Card.Footer
      class="space-x-2 sticky bottom-0 bg-background bg-opacity-100 py-2"
    >
      <Input
        type="text"
        name="name"
        placeholder="Nom du nouveau groupe à créer"
        class="bg-secondary" 
        bind:value={new_group_name}
      />
      <Button type="submit">Valider</Button>
    </Card.Footer>
  </form>
</Card.Root>

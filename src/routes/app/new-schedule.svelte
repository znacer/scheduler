<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { type Schedule } from "$lib/stores/schedules.svelte";
  import { SvelteSet } from "svelte/reactivity";
  import Button from "../../lib/components/ui/button/button.svelte";
  import Input from "../../lib/components/ui/input/input.svelte";
  import { Label } from "../../lib/components/ui/label";
  import { enhance } from "$app/forms";
  import { invalidate } from "$app/navigation";

  let form_values: Schedule = $state({
    id: 1,
    name: "Nouvelle tâche",
    description: "",
    tasks: new SvelteSet(),
    readers: [],
    writer: ""
  });
  let open = $state(false);
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger
    class="h-full w-full hover:bg-accent outline-none rounded-sm px-2 py-1.5 text-left text-sm"
  >
    Nouveau Linéaire
  </Dialog.Trigger>
  <Dialog.Content>
    <form
      method="POST"
      action="/app?/new_schedule"
      use:enhance={({}) => {
        open = false;
        invalidate("app:dataload");
      }}
    >
      <Dialog.Header>
        <Dialog.Title>{form_values.name}</Dialog.Title>
        <Dialog.Description>Détails et modification</Dialog.Description>
      </Dialog.Header>

      <Label for="name">Nom</Label>
      <Input name="name" bind:value={form_values.name} />
      <Label for="description">Description</Label>
      <Input name="description" />
      <Dialog.Footer>
        <Button type="submit">Sauvegarder</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

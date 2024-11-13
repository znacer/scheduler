<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as data from "$lib/data";
  import { schedules_store, type Schedule } from "$lib/stores/schedules.svelte";
  import { SvelteSet } from "svelte/reactivity";
  import Button from "./ui/button/button.svelte";
  import Input from "./ui/input/input.svelte";
  import { Label } from "./ui/label";

  let form_values: Schedule = $state({
    id: -1,
    name: "Nouvelle tâche",
    tasks: new SvelteSet(),
  });
</script>

<Dialog.Root>
  <Dialog.Trigger class="h-full w-full">Nouvelle timeline</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{form_values.name}</Dialog.Title>
      <Dialog.Description>Détails et modification</Dialog.Description>
    </Dialog.Header>
    <Label for="name">Nom</Label>
    <Input id="name" bind:value={form_values.name} />
    <Dialog.Footer>
      <Dialog.Close>
        <Button
          type="submit"
          onclick={() => {
            data.new_schedule(form_values).then((s) => {
              const n_s = {
                id: s.id,
                name: s.name,
                tasks: new SvelteSet<number>(),
              } as Schedule;
              schedules_store.append(JSON.parse(JSON.stringify(n_s)));
            });
          }}
        >
          Sauvegarder
        </Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

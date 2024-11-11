<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { schedules_store, type Schedule } from "$lib/stores/schedules.svelte";
  import Button from "./ui/button/button.svelte";
  import Input from "./ui/input/input.svelte";
  import { Label } from "./ui/label";
  import { slide } from "svelte/transition";

  interface ScheduleDialogProps {
    schedule_id: number;
  }

  let { schedule_id }: ScheduleDialogProps = $props();
  let form_values: Schedule = $state(
    JSON.parse(JSON.stringify(schedules_store.schedule_by_id(schedule_id))),
  );
</script>

<Dialog.Root>
  <Dialog.Trigger class="h-full w-full">
    <p class="h-full content-center indent-4" transition:slide|global>
      {schedules_store.name(schedule_id)}
    </p>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{form_values.name}</Dialog.Title>
      <Dialog.Description>Détails et modification</Dialog.Description>
    </Dialog.Header>
    <Label for="name">Nom</Label>
    <Input id="name" bind:value={form_values.name} />
    <Dialog.Footer>
      <Button
        type="submit"
        onclick={() => {
          schedules_store.append(JSON.parse(JSON.stringify(form_values)));
        }}
      >
        Sauvegarder
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { schedules_store, type Schedule } from "$lib/stores/schedules.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import { Label } from "$lib/components/ui/label";
  import { slide } from "svelte/transition";
  import { enhance } from "$app/forms";
  import { group_store } from "$lib/stores/groups.svelte";

  interface ScheduleDialogProps {
    schedule_id: number;
  }

  let { schedule_id }: ScheduleDialogProps = $props();
  let form_values: Schedule = $state(
    JSON.parse(JSON.stringify(schedules_store.schedule_by_id(schedule_id))),
  );
  let open = $state(false);
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger class="h-full w-full">
    <p class="h-full content-center indent-4" in:slide|global>
      {schedules_store.name(schedule_id)}
    </p>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>{form_values.name}</Dialog.Title>
      <Dialog.Description>Détails et modification</Dialog.Description>
    </Dialog.Header>
    <form
      method="POST"
      class="flex flex-col gap-2"
    >
      <Input name="id" bind:value={form_values.id} class="hidden" />
      <Label for="name">Nom</Label>
      <Input name="name" bind:value={form_values.name} />
      <Label for="description">Description</Label>
      <Input name="description" bind:value={form_values.description} />

      <Label for="writer">Groupe éditeur</Label>
      <Select.Root
        type="single"
        name="writer"
        bind:value={form_values.writer}
      >
        <Select.Trigger>{form_values.writer}</Select.Trigger>
        <Select.Content>
          {#each group_store.groups as [_, group]}
            <Select.Item value={group.name}>{group.name}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root>

      <Label for="readers">Groupes observateurs</Label>
      <Select.Root
        type="multiple"
        name="readers"
        bind:value={form_values.readers}
      >
        <Select.Trigger></Select.Trigger>
        <Select.Content>
          {#each group_store.groups as [id, group]}
            {#if group.name === form_values.writer}
              <Select.Item value={group.name} disabled={true} data-disbled={id}>
                {group.name}
              </Select.Item>
            {:else}
              <Select.Item value={group.name}>{group.name}</Select.Item>
            {/if}
          {/each}
        </Select.Content>
      </Select.Root>
      <Dialog.Footer class="flex w-full sm:justify-between">
          <Button
            type="submit"
            variant="destructive"
            formaction="/app?/delete_schedule"
          >
            supprimer
          </Button>
          <Button type="submit" formaction="/app?/update_schedule">
            Appliquer
          </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

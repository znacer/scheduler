<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import * as data from "$lib/data";
  import TaskForm from "$lib/components/taskForm.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { tasks_store, type Task } from "$lib/stores/tasks.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";

  let form_values: Task = $state({
    id: -1,
    name: "",
    start: new Date().getTime(),
    duration: 15 * 60 * 1000,
    schedule_id: -1,
    color: undefined,
  });
</script>

<Dialog.Root>
  <Dialog.Trigger
    class="hover:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none"
    >Nouvelle tâche</Dialog.Trigger
  >
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Nouvelle tâche</Dialog.Title>
      <Dialog.Description
        >Détails et modification de la tâche</Dialog.Description
      >
    </Dialog.Header>
    <Select.Root
      type="single"
      value={form_values.schedule_id.toString()}
      onValueChange={(v) => {
        form_values.schedule_id = parseInt(v);
      }}
    >
      <Select.Trigger class="w-[180px]">
        {form_values.schedule_id > 0
          ? schedules_store.name(form_values.schedule_id)
          : "Choisir une timeline"}
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each schedules_store.schedules as [schedule_id, schedule]}
            <Select.Item value={schedule_id.toString()} label={schedule.name}>
              {schedule.name}
            </Select.Item>
          {/each}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <TaskForm bind:form_values />
    <Dialog.Footer>
      <Button
        type="submit"
        onclick={() => {
          data.new_task(form_values).then((t) => {
            tasks_store.append(JSON.parse(JSON.stringify(t as Task)));
          });
        }}
      >
        Sauvegarder
      </Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

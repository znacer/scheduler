<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import TaskForm from "./task-form.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import { tasks_store, type Task } from "$lib/stores/tasks.svelte";
  import { schedules_store } from "$lib/stores/schedules.svelte";
  import { enhance } from "$app/forms";

  const default_values = {
    id: -1,
    name: "",
    description: "",
    start: new Date().getTime(),
    duration: 30 * 60 * 1000,
    schedule_id: -1,
    color: undefined,
    category_id: 1,
  };
  let form_values: Task = $state(default_values);
  let open = $state(false);
</script>

<Dialog.Root bind:open>
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
    <form
      action="/app?/new_task"
      method="post"
      use:enhance={({ formData }) => {
        console.log("submit");
        open = false;
      }}
    >
      <Select.Root
        name="schedule_id"
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
        <Button type="submit">Sauvegarder</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

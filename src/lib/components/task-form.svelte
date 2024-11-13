<script lang="ts">
  import * as Select from "$lib/components/ui/select/index";
  import { colorHashMap } from "$lib/stores/schedules.svelte";
  import { type Task } from "$lib/stores/tasks.svelte";
  import Datetimepicker from "./datetimepicker.svelte";
  import Durationpicker from "./durationpicker.svelte";
  import Input from "./ui/input/input.svelte";
  import Label from "./ui/label/label.svelte";

  interface TaskFormProps {
    form_values: Task;
  }
  let { form_values = $bindable() }: TaskFormProps = $props();

  let task_end = $state(form_values.start + form_values.duration);
  $effect(() => {
    task_end = form_values.start + form_values.duration;
  });
  $effect(() => {
    form_values.duration = task_end - form_values.start;
  });
</script>

<div class="flex flex-col gap-4 py-4">
  <div class="flex flex-row items-center gap-4">
    <Label for="name" class="text-right">Name</Label>
    <Input id="name" bind:value={form_values.name} class="col-span-3" />
  </div>
  <div class="flex flex-row items-center gap-4">
    <Label for="start" class="text-right">Début</Label>
    <Datetimepicker bind:timestamp={form_values.start} />
  </div>
  <div class="flex flex-row items-center gap-4">
    <Label for="duration" class="text-right">Durée</Label>
    <Durationpicker bind:duration={form_values.duration} />
  </div>
  <div class="flex flex-row items-center gap-4">
    <Label for="end" class="text-right">Fin</Label>
    <Datetimepicker bind:timestamp={task_end} />
  </div>
  <div class="flex flex-row items-center gap-4">
    <Label for="color" class="text-right">Couleur</Label>
    <Select.Root bind:value={form_values.color} type="single">
      <Select.Trigger>{form_values.color}</Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each colorHashMap as [k, color]}
            <Select.Item value={color}>{k}</Select.Item>
          {/each}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  </div>
</div>

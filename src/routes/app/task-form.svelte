<script lang="ts">
  import * as Select from "$lib/components/ui/select/index";
  import { type Task } from "$lib/stores/tasks.svelte";
  import Datetimepicker from "$lib/components/datetimepicker.svelte";
  import Durationpicker from "$lib/components/durationpicker.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import { getContext } from "svelte";

  interface TaskFormProps {
    form_values: Task;
  }
  let { form_values = $bindable() }: TaskFormProps = $props();
  const categories: Map<number, string> = getContext("category");

  let form_start = $state(form_values.start.toString());
  $effect(() => {
    form_start = form_values.start.toString();
  });
  let form_duration = $state(form_values.duration.toString());
  $effect(() => {
    form_duration = form_values.duration.toString();
  });

  let task_end = $state(form_values.start + form_values.duration);
  let selected_category = $state([...categories.keys()][0].toString());
  $effect(()=>{
    form_values.category_id = parseInt(selected_category) ?? 0;
    })
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
    <Input name="name" bind:value={form_values.name} class="col-span-3" />
  </div>

  <div class="flex flex-row items-center gap-4">
    <Label for="start" class="text-right">Début</Label>
    <Input name="start" bind:value={form_start} type="hidden" />
    <Datetimepicker bind:value={form_values.start} />
  </div>

  <div class="flex flex-row items-center gap-4">
    <Label for="duration" class="text-right">Durée</Label>
    <Input name="duration" type="hidden" bind:value={form_values.duration} />
    <Durationpicker bind:duration={form_values.duration} />
  </div>

  <div class="flex flex-row items-center gap-4">
    <Label for="end" class="text-right">Fin</Label>
    <Datetimepicker bind:value={task_end} />
  </div>

  <div class="flex flex-row items-center gap-4">
    <Label for="category" class="text-right">Category</Label>
    <Input name="category" type="hidden" bind:value={form_values.category_id} />
    <Select.Root bind:value={selected_category} type="single">
      <Select.Trigger>{categories.get(form_values.category_id)}</Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each categories as [k, cat]}
            <Select.Item value={k.toString()}>{cat}</Select.Item>
          {/each}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  </div>
</div>

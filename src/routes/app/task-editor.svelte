<script lang="ts">
  import Input from "$lib/components/ui/input/input.svelte";
  import { enhance } from "$app/forms";
  import TaskForm from "./task-form.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import Button from "$lib/components/ui/button/button.svelte";

  let { task= $bindable(), open = $bindable() } = $props();
</script>

<form
  method="POST"
  use:enhance={({ formData }) => {
    console.log("submit");
    open = false;
  }}
>
  <Input type="hidden" name="id" value={task.id} />
  <Input type="hidden" name="schedule_id" value={task.schedule_id} />
  <TaskForm bind:form_values={task} />
  <Dialog.Footer class="place-content-between sm:justify-between">
    <Button type="submit" variant="destructive" formaction="/app?/delete_task">
      Supprimer
    </Button>
    <Button type="submit" formaction="/app?/update_task">Appliquer</Button>
  </Dialog.Footer>
</form>

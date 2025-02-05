<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { LogOut, Trash2 } from "lucide-svelte";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import Input from "$lib/components/ui/input/input.svelte";
  import { enhance } from "$app/forms";
  import MembersCard from "./members_card.svelte";

  let {
    groupname,
    username,
    isadmin,
  }: { groupname: string; username: string; isadmin: boolean } = $props();
  let dialog_leave_open = $state(false);
  let dialog_delete_open = $state(false);
</script>

<div class="flex w-full my-1 justify-evenly">
  {#if isadmin}
    <MembersCard {groupname} {username} />
  {/if}

  <Dialog.Root bind:open={dialog_leave_open}>
    <Dialog.Trigger>
      <Button variant="destructive">Quitter <LogOut /></Button>
    </Dialog.Trigger>
    <Dialog.Content>
      <Dialog.Title>Êtes vous sur de vouloir quitter le groupe ?</Dialog.Title>

      <form
        action="?/leave_group"
        method="post"
        class="flex justify-evenly"
        use:enhance
      >
        <Input type="hidden" name="name" value={groupname} />
        <Button variant="default" onclick={() => (dialog_leave_open = false)}>
          Annuler
        </Button>
        <Button type="submit" variant="destructive">Quitter le groupe</Button>
      </form>
    </Dialog.Content>
  </Dialog.Root>

  {#if isadmin}
    <Dialog.Root bind:open={dialog_delete_open}>
      <Dialog.Trigger>
        <Button variant="destructive">Supprimer <Trash2 /></Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>
          Êtes-vous sur de vouloir supprimer le groupe ?
        </Dialog.Title>

        <form
          action="?/delete_group"
          method="post"
          class="flex justify-evenly"
          use:enhance
        >
          <Input type="hidden" name="name" value={groupname} />
          <Button
            variant="default"
            onclick={() => (dialog_delete_open = false)}
          >
            Annuler
          </Button>
          <Button type="submit" variant="destructive"
            >Supprimer le groupe</Button
          >
        </form>
      </Dialog.Content>
    </Dialog.Root>
  {/if}
</div>
<div class="flex justify-evenly gap-2"></div>

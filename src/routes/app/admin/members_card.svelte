<script lang="ts">
  import { group_store } from "$lib/stores/groups.svelte";
  import { user_store } from "$lib/stores/users.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index";
  import { enhance } from "$app/forms";
  import {
    Minus,
    Plus,
    ShieldMinus,
    ShieldPlus,
    UserPlus,
  } from "lucide-svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  let { groupname, username }: { groupname: string; username: string } =
    $props();
  let members = $derived(group_store.group(groupname)?.members ?? []);
  let admins = $derived(group_store.group(groupname)?.admins ?? []);

  let add_modal_open = $state(false);
</script>

<Dialog.Root bind:open={add_modal_open}>
  <Dialog.Trigger>
    <Button>
      Ajouter un utilisateur <UserPlus />
    </Button>
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header class="flex w-full justify-center">
      Groupe {groupname}
    </Dialog.Header>
    <div class="flex w-full justify-evenly">
      <div class="flex flex-col justify-start items-center gap-1 w-1/2">
        <p class="font-bold text-lg">Utilisateurs</p>
        {#each user_store.users as user}
          {#if !members.includes(user) && !admins.includes(user)}
            <form method="POST" use:enhance action="?/add_user">
              <Input type="hidden" name="username" value={user} />
              <Input type="hidden" name="groupname" value={groupname} />
              <div
                class="flex bg-secondary gap-2 h-fit items-center border border-secondary rounded-lg p-1 pl-2 justify-between"
              >
                <p class="h-full">{user}</p>
                <Button type="submit" class="w-full">
                  <Plus />
                </Button>
              </div>
            </form>
          {/if}
        {/each}
      </div>
      <div class="flex flex-col justify-start items-center gap-1 w-1/2">
        <p class="font-bold text-lg">Membres</p>
        {#each members.concat(admins) as user}
          {#if user !== username}
            <form method="POST" use:enhance>
              <Input type="hidden" name="username" value={user} />
              <Input type="hidden" name="groupname" value={groupname} />
              <div
                class="flex bg-secondary gap-2 h-fit items-center border border-secondary rounded-lg p-1 pl-2 justify-between"
              >
                <p class="h-full">{user}</p>
                <Button type="submit" formaction="?/kick_user">
                  <Minus />
                </Button>
                {#if admins.includes(user)}
                  <Button
                    type="submit"
                    variant="destructive"
                    formaction="?/unadmin_user"
                  >
                    <ShieldMinus />
                  </Button>
                {:else}
                  <Button
                    type="submit"
                    variant="outline"
                    formaction="?/admin_user"
                  >
                    <ShieldPlus />
                  </Button>
                {/if}
              </div>
            </form>
          {/if}
        {/each}
      </div>
    </div>
  </Dialog.Content>
</Dialog.Root>

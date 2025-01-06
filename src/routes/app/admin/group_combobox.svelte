<script lang="ts">
  import Check from "lucide-svelte/icons/check";
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";
  import { group_store } from "$lib/stores/groups.svelte";

  let open = $state(false);
  let {
    selected_group_id = $bindable(),
  }: { selected_group_id: number | undefined } = $props();

  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived.by(() => {
    if (selected_group_id !== undefined) {
      return group_store.group(selected_group_id)?.name;
    }
    return null;
  });

  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class="w-[200px] justify-between"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || "Choisir un groupe..."}
        <ChevronsUpDown class="ml-2 size-4 shrink-0 opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Choisir un groupe..." />
      <Command.List>
        <Command.Empty>Aucun groupe trouvé.</Command.Empty>
        <Command.Group>
          {#each group_store.groups as [id, group]}
            <Command.Item
              value={group.name}
              onSelect={() => {
                selected_group_id = id;
                closeAndFocusTrigger();
              }}
            >
              <Check
                class={cn(
                  "mr-2 size-4",
                  selected_group_id !== id && "text-transparent",
                )}
              />
              {group.name}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>

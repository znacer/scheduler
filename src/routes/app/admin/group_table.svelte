<script lang="ts">
  import * as Table from "$lib/components/ui/table/index";
  import { CircleX, ShieldCheck } from "lucide-svelte";
  import { group_store } from "$lib/stores/groups.svelte";
  import Button from "$lib/components/ui/button/button.svelte";
</script>

{#if group_store.groups.size > 0}
  <Table.Root class="w-full border border-primary">
    <Table.Header>
      <Table.Row>
        <Table.Head>id</Table.Head>
        <Table.Head>Groupe</Table.Head>
        <Table.Head class="text-center w-1">Admin</Table.Head>
        <Table.Head class="text-center w-1">Quitter</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each group_store.groups as [_, group]}
        <Table.Row>
          <Table.Cell>{group.id}</Table.Cell>
          <Table.Cell>{group.name}</Table.Cell>
          <Table.Cell>
            <div class="flex justify-center">
              {#if group.admin}
                <ShieldCheck />
              {:else}{/if}
            </div>
          </Table.Cell>
          <Table.Cell>
            <div class="flex justify-center">
              <Button variant="destructive"><CircleX /></Button>
            </div>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
{/if}

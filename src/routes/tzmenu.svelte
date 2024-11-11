<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar/index";
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  import {ScrollArea} from "$lib/components/ui/scroll-area/index";
  import { CheckIcon } from "lucide-svelte";

  const all_tz_list = Intl.supportedValuesOf("timeZone");
  const all_zones = new Set();
  const special_tz = new Set();
  const all_tz = new Map();
  all_tz_list.forEach((tz) => {
    let tz_group: string, tz_entry: string;
    [tz_group, tz_entry] = tz.split("/");
    all_zones.add(tz_group);
    if (all_tz.get(tz_group)) {
      all_tz.set(tz_group, new Set([...all_tz.get(tz_group), tz_entry]));
    } else {
      if (tz_entry !== undefined) {
        all_tz.set(tz_group, new Set([tz_entry]));
      } else {
        special_tz.add(tz_group);
      }
    }
  });
</script>

<Menubar.Menu>
  <Menubar.Trigger>TimeZones</Menubar.Trigger>
  <Menubar.Content>
    <ScrollArea class="h-72 w-48">
      {#each all_tz as tzgroup}
        <Menubar.Sub>
          <Menubar.SubTrigger>{tzgroup[0]}</Menubar.SubTrigger>
          <Menubar.SubContent>
            <ScrollArea class="h-72 w-48">
            {#each tzgroup[1] as tzelt}
              <Menubar.Item
                onclick={() => {grid_layout_store.set_tz(tzgroup[0] + "/" + tzelt)}}
              >
                {#if (grid_layout_store.tz === tzgroup[0] + "/" + tzelt)}
                  <CheckIcon class="size-4"/>
                  <p class="font-bold">{tzelt}</p>
                {:else}
                  <p>{tzelt}</p>
                {/if}
              </Menubar.Item>
            {/each}
            </ScrollArea>
          </Menubar.SubContent>
          <Menubar.Separator></Menubar.Separator>
        </Menubar.Sub>
      {/each}
      {#each special_tz as tzelt, i}
          <Menubar.Item
            onclick={() => {
              grid_layout_store.set_tz(tzelt as string);
            }}
          >
            {tzelt}
            </Menubar.Item >
        {#if i < special_tz.size - 1}
          <Menubar.Separator></Menubar.Separator>
        {/if}
      {/each}
    </ScrollArea>
  </Menubar.Content>
</Menubar.Menu>

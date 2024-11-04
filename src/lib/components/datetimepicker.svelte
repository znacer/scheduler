<script lang="ts">
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  import {
    type ZonedDateTime,
    DateFormatter,
    parseAbsolute,
  } from "@internationalized/date";
  import * as Popover from "./ui/popover";
  import Button from "./ui/button/button.svelte";
  import { CalendarIcon, Clock } from "lucide-svelte";
  import { cn } from "$lib/utils";
  import Calendar from "./ui/calendar/calendar.svelte";
  import * as Select from "./ui/select";

  // Props
  interface DatetimepickerProps {
    timestamp: number;
  }

  let { timestamp = $bindable() }: DatetimepickerProps = $props();

  // Formatters
  const dateFormatter = new DateFormatter("fr", { dateStyle: "long" });
  const timeFormatter = $derived(
    new DateFormatter("fr", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: grid_layout_store.tz,
    }),
  );

  // State
  let selectedDate: ZonedDateTime | undefined = $state(undefined);

  // Generate hours and minutes options
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  // Initialize from timestamp
  $effect(() => {
    if (timestamp) {
      const date = new Date(timestamp);
      const zonedDate = parseAbsolute(date.toISOString(), grid_layout_store.tz);
      selectedDate = zonedDate;
    }
  });

  // Format display value
  let displayValue = $derived(
    timestamp
      ? `${dateFormatter.format(new Date(timestamp))} ${timeFormatter.format(new Date(timestamp))}`
      : "Select date and time",
  );
</script>

<div class="relative">
  <Popover.Root
    onOpenChange={(open) => {
      if (!open) {
        if (selectedDate) {
          timestamp = selectedDate.toDate().getTime();
        }
      }
    }}
  >
    <Popover.Trigger>
      <Button
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal bg-secondary",
          !timestamp && "text-muted-foreground",
        )}
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {displayValue}
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0">
      <div class="p-4">
        <Calendar
          type="single"
          bind:value={selectedDate}
          initialFocus
          onValueChange={() => {
            if (selectedDate === undefined) {
              selectedDate = parseAbsolute(
                new Date(timestamp).toISOString(),
                grid_layout_store.tz,
              );
            }
            timestamp = selectedDate.toDate().getTime();
          }}
        />
        <div class="flex items-center gap-2 mt-4">
          <Clock class="h-4 w-4" />
          <Select.Root
            type="single"
            onValueChange={(hour) => {
              if (selectedDate === undefined) {
                selectedDate = parseAbsolute(
                  new Date(timestamp).toISOString(),
                  grid_layout_store.tz,
                );
              }
              selectedDate = selectedDate.set({ hour: parseInt(hour) });
              timestamp = selectedDate.toDate().getTime();
            }}
          >
            <Select.Trigger class="w-[100px]">
              {selectedDate?.hour.toString().padStart(2, "0")}
            </Select.Trigger>
            <Select.Content>
              {#each hours as hour}
                <Select.Item value={hour}>{hour}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
          <span>:</span>
          <Select.Root
            type="single"
            onValueChange={(minute) => {
              if (selectedDate === undefined) {
                selectedDate = parseAbsolute(
                  new Date(timestamp).toISOString(),
                  grid_layout_store.tz,
                );
              }
              selectedDate = selectedDate.set({ minute: parseInt(minute) });
              timestamp = selectedDate.toDate().getTime();
            }}
          >
            <Select.Trigger class="w-[100px]">
              {selectedDate?.minute.toString().padStart(2, "0")}
            </Select.Trigger>
            <Select.Content>
              {#each minutes as minute}
                <Select.Item value={minute}>{minute}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </Popover.Content>
  </Popover.Root>
</div>

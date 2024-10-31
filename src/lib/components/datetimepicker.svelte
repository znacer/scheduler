<script lang="ts">
  import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
    parseAbsolute,
    parseAbsoluteToLocal,
    now,
    toZoned,
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
  const timeFormatter = new DateFormatter("fr", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // State
  let selectedDate: DateValue | undefined = $state(undefined);
  let selectedHour = $state("00");
  let selectedMinute = $state("00");

  // Generate hours and minutes options
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  // Update timestamp when date or time changes
  $effect(() => {
    if (selectedDate) {
      const date = selectedDate.toDate(grid_layout_store.tz);
      date.setHours(parseInt(selectedHour));
      date.setMinutes(parseInt(selectedMinute));
      timestamp = date.getTime();
    }
  });

  // Initialize from timestamp
  $effect(() => {
    if (timestamp) {
      const date = new Date(timestamp);
      const zonedDate = parseAbsoluteToLocal(date.toISOString());
      selectedDate = zonedDate;
      selectedHour = date.getHours().toString().padStart(2, "0");
      selectedMinute = date.getMinutes().toString().padStart(2, "0");
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
  <Popover.Root openFocus>
    <Popover.Trigger asChild let:builder>
      <Button
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-left font-normal",
          !timestamp && "text-muted-foreground",
        )}
        builders={[builder]}
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {displayValue}
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0">
      <div class="p-4">
        <Calendar bind:value={selectedDate} initialFocus />
        <div class="flex items-center gap-2 mt-4">
          <Clock class="h-4 w-4" />
          <Select.Root>
            <Select.Trigger class="w-[100px]">
              <Select.Value>{selectedHour}</Select.Value>
            </Select.Trigger>
            <Select.Content>
              {#each hours as hour}
                <Select.Item
                  value={hour}
                  onclick={() => {
                    selectedHour = hour;
                  }}>{hour}</Select.Item
                >
              {/each}
            </Select.Content>
          </Select.Root>
          <span>:</span>
          <Select.Root>
            <Select.Trigger class="w-[100px]">
              <Select.Value>{selectedMinute}</Select.Value>
            </Select.Trigger>
            <Select.Content>
              {#each minutes as minute}
                <Select.Item
                  value={minute}
                  onclick={() => {
                    selectedMinute = minute;
                  }}>{minute}</Select.Item
                >
              {/each}
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </Popover.Content>
  </Popover.Root>
</div>

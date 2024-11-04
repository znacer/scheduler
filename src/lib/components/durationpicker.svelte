<script lang="ts">
  import Button from "./ui/button/button.svelte";
  import Input from "./ui/input/input.svelte";
  import Label from "./ui/label/label.svelte";

  interface DurationPickerProps {
    /** Duration in minutes */
    duration: number;
    /** Optional minimum duration in minutes */
    minDuration?: number;
    /** Optional maximum duration in minutes */
    maxDuration?: number;
  }

  let {
    duration = $bindable(),
    minDuration = 1,
    maxDuration = 24 * 60 * 365, // Default max: 1 year
  }: DurationPickerProps = $props();

  let duration_in_minutes = $derived(duration / 60_000);
  // Internal state for days, hours, minutes
  let days = $state(0);
  let hours = $state(0);
  let minutes = $state(0);

  // Constants for conversion
  const MINUTES_PER_HOUR = 60;
  const HOURS_PER_DAY = 24;
  const MINUTES_PER_DAY = MINUTES_PER_HOUR * HOURS_PER_DAY;

  // Initialize from duration
  $effect(() => {
    if (typeof duration_in_minutes === "number") {
      days = Math.floor(duration_in_minutes / MINUTES_PER_DAY);
      const remainingMinutes = duration_in_minutes % MINUTES_PER_DAY;
      hours = Math.floor(remainingMinutes / MINUTES_PER_HOUR);
      minutes = remainingMinutes % MINUTES_PER_HOUR;
    }
  });

  // Update duration when days/hours/minutes change
  $effect(() => {
    const newDuration =
      days * MINUTES_PER_DAY + hours * MINUTES_PER_HOUR + minutes;

    // Clamp to min/max duration
    duration =
      Math.min(Math.max(newDuration, minDuration), maxDuration) * 60 * 1000;
  });

  // update on overflow
  $effect(() => {
    if (hours >= HOURS_PER_DAY) {
      days = Math.floor(hours / HOURS_PER_DAY);
      hours = hours % HOURS_PER_DAY;
    }
    if (minutes >= MINUTES_PER_DAY) {
      hours = Math.floor(minutes / MINUTES_PER_HOUR);
      minutes = minutes % MINUTES_PER_HOUR;
    }
  });

  // Quick duration presets
  const presets = [
    { label: "30m", minutes: 30 },
    { label: "1h", minutes: 60 },
    { label: "2h", minutes: 120 },
    { label: "4h", minutes: 240 },
    { label: "1j", minutes: MINUTES_PER_DAY },
  ];

  function applyPreset(presetMinutes: number) {
    if (presetMinutes <= maxDuration && presetMinutes >= minDuration) {
      duration = presetMinutes * 60 * 1000;
    }
  }

  const label_class = "text-sm text-primary";
</script>

<div class="space-y-4">
  <!-- Duration inputs -->
  <div class="flex items-center gap-4">
    <div class="space-y-2 flex flex-col">
      <Label for="days" class={label_class}>Jours</Label>
      <Input
        type="number"
        id="days"
        min="0"
        max={Math.floor(maxDuration / MINUTES_PER_DAY)}
        bind:value={days}
      />
    </div>

    <div class="space-y-2">
      <Label for="hours" class={label_class}>Heures</Label>
      <Input type="number" id="hours" min="0" max="23" bind:value={hours} />
    </div>

    <div class="space-y-2">
      <Label for="minutes" class={label_class}>Minutes</Label>
      <Input type="number" id="minutes" min="0" max="59" bind:value={minutes} />
    </div>
  </div>

  <!-- Quick presets -->
  <div class="flex gap-2">
    {#each presets as preset}
      <Button
        type="button"
        onclick={() => applyPreset(preset.minutes)}
        disabled={preset.minutes > maxDuration || preset.minutes < minDuration}
      >
        {preset.label}
      </Button>
    {/each}
  </div>

  <!-- Optional total display -->
  <div class="text-sm text-gray-500">
    Total: {duration / 3_600_000} Heures
  </div>
</div>

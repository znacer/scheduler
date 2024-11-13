<script lang="ts">
  import type { Snippet } from "svelte";
  import { scale } from "svelte/transition";

  let { children, height }: {children: Snippet, height: number} = $props()
</script>

<div
  class="sticky w-full h-full content-center left-0 z-10 border border-primary"
  style="height: {height}px;"
  transition:scale|global = {{
    delay: 100,
    duration: 1000
  }}
>
  {@render children?.()}
</div>

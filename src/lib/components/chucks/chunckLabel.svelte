<script lang="ts">
  import type { Snippet } from "svelte";

  let { children, height }: {children: Snippet, height: number} = $props()
</script>

<div
  class="sticky w-full h-full content-center left-0 z-10 border border-primary"
  style="height: {height}px;"
>
  {@render children?.()}
</div>

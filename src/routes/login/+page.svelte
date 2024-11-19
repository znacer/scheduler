<script lang="ts">
  import "/src/app.css";
  import Button from "$lib/components/ui/button/button.svelte";
  import { KeyRound } from "lucide-svelte";
  import { setMode, ModeWatcher } from "mode-watcher";
  $effect(() => {
    setMode("dark");
  });
</script>

<ModeWatcher></ModeWatcher>

<div class="flex h-screen bg-background">
  <div class="m-auto">
    <Button
      class="w-fit"
      variant="default"
      type="button"
      href="/login/keycloak"
    >
      <KeyRound />
      Se connecter
    </Button>
  </div>
</div>

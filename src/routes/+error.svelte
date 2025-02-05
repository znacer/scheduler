<script lang="ts">
    import { page } from "$app/state";
    import Button from "$lib/components/ui/button/button.svelte";
    import { House, Undo2 } from "lucide-svelte";
</script>

<div class="min-h-screen flex items-center justify-center bg-background">
    <div class="bg-secondary p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 class="text-4xl font-bold text-secondary-foreground mb-4">
            {page.status}: {page.error?.message || "An error occurred"}
        </h1>

        <p class="text-secondary-foreground mb-6">
            {#if page.status === 404}
                The page you're looking for doesn't exist.
            {:else if page.status === 403}
                You don't have permission to access this resource.
            {:else if page.status === 401}
                Please log in to access this page.
            {:else}
                Something went wrong. Please try again later.
            {/if}
        </p>

        <div class="flex justify-between">
            <Button variant="default" href="/">
                Go Home <House />
            </Button>
            <Button variant="outline" onclick={() => window.history.back()}>
                Go Back <Undo2 />
            </Button>
        </div>
    </div>
</div>

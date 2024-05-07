<script lang="ts">
    import { add, sub } from "date-fns";
    import { startDate, endDate, pixelWidth } from "../stores/layout";
    import { date2pos } from "$lib/utils";
    import Row from "./Row.svelte";
</script>

<div class="timeline">
    <div class="row">
        <Row />
    </div>
    <div class="grid">
        {#each Array.from(Array(24).keys()) as time}
            <div
                class="grid-columns"
                style:border-left="1px solid"
                style="
                    position: absolute;
                    height: 100%;
                    "
                style:left={date2pos(
                    add($startDate, { hours: time }),
                    $startDate,
                    $endDate,
                    $pixelWidth,
                ) + "px"}
            ></div>
        {/each}
    </div>
</div>

<style>
    .timeline {
        position: relative;
        height: 100%;
        border: solid salmon 1px;
    }
    .row {
        position: relative;
        z-index: 1;
    }

    .grid {
        position: absolute;
        background-color: red;
        display: flex;
        height: 100%;
        z-index: -1;
        top: 0;
        left: 0;
    }
</style>

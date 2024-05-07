<script lang="ts">
    import { add, sub } from "date-fns";
    import { startDate, endDate, pixelWidth } from "../stores/layout";
    import { date2pos } from "$lib/utils";

    // const startDate = sub(new Date(), { hours: 1 });
    // const endDate = new Date();
    const timeScale = "hour";
</script>

<div class="time-axis">
    <div class="axis-line">
        {#each Array.from(Array(24).keys()) as time}
            <div
                class="axis-label"
                style:left={date2pos(
                    add($startDate, { hours: time }),
                    $startDate,
                    $endDate,
                    $pixelWidth,
                ) + "px"}
            >
                <p
                    style:margin-left={date2pos(
                        add($startDate, { hours: 1 }),
                        $startDate,
                        $endDate,
                        $pixelWidth,
                    ) /
                        3 +
                        "px"}
                >
                    {time}
                </p>
            </div>
        {/each}
    </div>
</div>

<style>
    .time-axis {
    }
    .axis-line {
        display: flex;
        align-items: center;
        height: 20px;
        background-color: #ddd;
        position: relative;
    }
    .axis-label {
        position: absolute;
        border-left: 1px solid;
        font-size: 12px;
        color: darkblue;
        height: 100%;
    }
    .axis-label > p {
        margin-top: 0;
    }
</style>

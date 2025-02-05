<script lang="ts">
	import Datetimepicker from "$lib/components/datetimepicker.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import { pim_store, type PIM, type Waypoint } from "$lib/stores/pims.svelte";
	import * as turf from "@turf/turf";

	interface PimFormProps {
		pim: PIM;
	}
	let { pim }: PimFormProps = $props();
	let form_values: Waypoint[] = $state(JSON.parse(JSON.stringify(pim)));

	function calculateDistance(w_from: Waypoint, w_to: Waypoint) {
		let from = turf.point(w_from.position);
		let to = turf.point(w_to.position);

		return turf.rhumbDistance(from, to, { units: "nauticalmiles" });
	}
	function calculateBearing(w_from: Waypoint, w_to: Waypoint) {
		let from = turf.point(w_from.position);
		let to = turf.point(w_to.position);

		return turf.rhumbBearing(from, to);
	}
</script>

<div id="controls" class="relative flex space-x-2 pl-2">
	<Button
		variant="destructive"
		onclick={() => {
			form_values = JSON.parse(JSON.stringify(pim));
		}}
	>
		Reset
	</Button>
	<Button
		variant="default"
		onclick={() => {
			console.log(form_values);
			/*	TODO: write a validation function
			 * timestamps must increase
			 * each name shall be unique
			 */
			pim_store.append(1, JSON.parse(JSON.stringify(form_values)));
		}}
	>
		Valider
	</Button>
</div>
<div class="h-full overflow-scroll">
	{#each form_values as form_v, idx}
		<div class="flex space-x-1 border border-primary p-2">
			<div>
				<Label for="name">Nom</Label>
				<Input id="name" bind:value={form_v.name} />
			</div>
			<div>
				<Label for="desc">Description</Label>
				<Input id="desc" bind:value={form_v.description} />
			</div>
			<div>
				<Label for="latitude">Latitude</Label>
				<Input
					id="latitude"
					type="number"
					bind:value={form_v.position[1]}
					max={90}
					min={-90}
				/>
			</div>
			<div>
				<Label for="longitude">Longitude</Label>
				<Input
					id="longitude"
					type="number"
					bind:value={form_v.position[0]}
					max={90}
					min={-90}
				/>
			</div>
			<div>
				<Label>Date</Label>
				<Datetimepicker bind:value={form_v.timestamp} />
			</div>
			{#if form_values[idx + 1]}
				<div>
					<p>
						Vistesse = {(
							calculateDistance(form_v, form_values[idx + 1]) /
							((form_values[idx + 1].timestamp - form_values[idx].timestamp) /
								3_600_000)
						).toLocaleString("fr-FR", {
							style: "unit",
							unit: "mile-per-hour",
						})}
					</p>
					<p>
						Cap = {(
							(calculateBearing(form_v, form_values[idx + 1]) + 360) %
							360
						).toLocaleString("fr-FR", {
							style: "unit",
							unit: "degree",
							maximumFractionDigits: 1,
						})}
					</p>
				</div>
			{/if}
		</div>
	{/each}
</div>

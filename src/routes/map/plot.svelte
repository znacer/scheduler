<script lang="ts">
	import { MapboxOverlay } from "@deck.gl/mapbox";
	import { PathLayer, ScatterplotLayer, TextLayer } from "deck.gl";
	import maplibregl from "maplibre-gl";
	import { type PickingInfo } from "@deck.gl/core";
	import { DateFormatter } from "@internationalized/date";
	import { grid_layout_store } from "$lib/stores/grid_layout.svelte";

	interface Waypoint {
		position: [longitude: number, latitude: number];
		timestamp: number;
		name: string;
		description?: string;
	}
	let { data }: { data: Waypoint[] } = $props();
	let map_element: HTMLDivElement | undefined = $state(undefined);

	let center = data
		.map((elt) => elt.position)
		.reduce((prev, cur) => [prev[0] + cur[0], prev[1] + cur[1]])
		.map((elt: number) => elt / data.length);

	const path_layer = new PathLayer<Waypoint[]>({
		data: [data],
		getPath: (d: Waypoint[]) => d.map((e) => e.position),
		getColor: [255, 0, 0],
		getWidth: 10,
		widthMinPixels: 1,
		capRounded: true,
		jointRounded: true,
	});

	const waypoints_layer = new ScatterplotLayer<Waypoint>({
		data,
		stroked: true,
		getPosition: (d: Waypoint) => d.position,
		getFillColor: [255, 255, 0, 100],
		getRadius: 100,
		pickable: true,
	});

	const waypoints_tag_layer = new TextLayer<Waypoint>({
		data,
		getPosition: (d: Waypoint) => d.position,
		getText: (d: Waypoint) => d.name,
		getSize: 10,
		sizeMinPixels: 2,
		sizeMaxPixels: 16,
	});
	const dateFormatter = $derived(
		new DateFormatter("fr", {
			dateStyle: "short",
			timeStyle: "short",
			timeZone: grid_layout_store.tz,
		}),
	);
	function getTooltip({ object }: PickingInfo<Waypoint>) {
		if (object) {
			return (
				object && {
					html: `<h2>${object.name}</h2> <p>${dateFormatter.format(new Date(object.timestamp))}</p>`,
					style: {
						fontSize: "0.8em",
					},
				}
			);
		}
		return null;
	}
	const deck_instance = new MapboxOverlay({
		interleaved: true,
		getTooltip,
		layers: [path_layer, waypoints_layer, waypoints_tag_layer],
	});

	$effect(() => {
		if (map_element) {
			const map = new maplibregl.Map({
				attributionControl: false,
				container: map_element,
				style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
				center: [center[0], center[1]],
				zoom: 11,
			});
			map.once("load");
			map.addControl(deck_instance);
		}
	});
</script>

<div class="relative h-full">
	<div id="map" bind:this={map_element} class="absolute h-full w-full"></div>
</div>

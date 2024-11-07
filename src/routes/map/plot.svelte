<script lang="ts">
	import "maplibre-gl/dist/maplibre-gl.css";
	import { MapboxOverlay } from "@deck.gl/mapbox";
	import { PathLayer, ScatterplotLayer, TextLayer } from "deck.gl";
	import maplibregl from "maplibre-gl";
	import { type PickingInfo } from "@deck.gl/core";
	import { DateFormatter } from "@internationalized/date";
	import { grid_layout_store } from "$lib/stores/grid_layout.svelte";
	import { type Waypoint, pim_store } from "$lib/stores/pims.svelte";
	import { env } from '$env/dynamic/public';

	let data = $derived.by(() => {
		const my_pim = pim_store.pim_by_id(1);
		if (my_pim) {
			return my_pim;
		}
		return [];
	});

	let map_element: HTMLDivElement | undefined = $state(undefined);

	let center = $derived.by(() => {
		if (data.length > 0) {
			return data
				.map((elt) => elt.position)
				.reduce((prev, cur) => [prev[0] + cur[0], prev[1] + cur[1]])
				.map((elt: number) => elt / data.length);
		}
		return [0, 0];
	});

	function path_layer(points: Waypoint[][]) {
		return new PathLayer<Waypoint[]>({
			data: points,
			getPath: (d: Waypoint[]) => d.map((e) => e.position),
			getColor: [255, 0, 0],
			getWidth: 10,
			widthMinPixels: 1,
			capRounded: true,
			jointRounded: true,
		});
	}

	function waypoints_layer(points: Waypoint[]) {
		return new ScatterplotLayer<Waypoint>({
			id: "scatter-layer",
			data: points,
			stroked: true,
			getPosition: (d: Waypoint) => d.position,
			getFillColor: [255, 255, 0, 100],
			getRadius: 100,
			pickable: true,
		});
	}
	function waypoints_tag_layer(points: Waypoint[]) {
		return new TextLayer<Waypoint>({
			id: "text-layer",
			data: points,
			getPosition: (d: Waypoint) => d.position,
			getText: (d: Waypoint) => d.name,
			getSize: 10,
			sizeMinPixels: 2,
			sizeMaxPixels: 16,
		});
	}
	let dateFormatter = $derived(
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

	let deck_instance = $state(
		new MapboxOverlay({
			interleaved: true,
			getTooltip,
		}),
	);

	let map = $derived.by(() => {
		if (map_element) {
			return new maplibregl.Map({
				container: "map",
				style: env.PUBLIC_TILE_STYLE,
				center: [0, 0],
				zoom: 2,
				attributionControl: false,
			});
		}
	});

	$effect(() => {
		map?.once("load");
		map?.addControl(deck_instance);
		map?.addControl(
			new maplibregl.ScaleControl({
				maxWidth: 200,
				unit: "nautical",
			}),
		);
		map?.addControl(new maplibregl.NavigationControl({}), "top-right");
	});
	$effect(() => {
		deck_instance.setProps({
			layers: [
				path_layer([data]),
				waypoints_layer(data),
				waypoints_tag_layer(data),
			],
		});
		if (data.length > 0) {
			map?.flyTo({ center: [center[0], center[1]], zoom: 11 });
		}
	});
</script>

<div class="relative h-5/6 w-full">
	<div id="map" bind:this={map_element}></div>
</div>

<style>
	#map {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 1;
	}
</style>

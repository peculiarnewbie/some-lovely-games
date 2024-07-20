import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import "../styles.css";
import { css } from "@tokenami/css";

let webSocket: WebSocket | null = null;

export default function RoomClient(props: { room: string; wsUrl: string }) {
	onMount(() => {
		console.log(props.wsUrl);

		webSocket = new WebSocket(props.wsUrl);

		webSocket.onmessage = (event) => {
			const data = JSON.parse(event.data as string);

			console.log(data);
		};
	});

	return (
		<div
			style={css({
				"--padding": 4,
				"--background-color": "var(--color_primary)",
			})}
		>
			<div>hey</div>
		</div>
	);
}

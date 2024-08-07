import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import "../../styles.css";
import { css } from "../../css";

let webSocket: WebSocket | null = null;

export default function RoomClient(props: { room: string; wsUrl: string }) {
	const connectWS = () => {
		webSocket = new WebSocket(props.wsUrl);

		webSocket.onopen = () => {
			console.log("connected");
		};

		webSocket.onmessage = (event) => {
			const data = JSON.parse(event.data as string);
			console.log(data);
		};
	};

	onMount(() => {
		connectWS();
	});

	return (
		<div
			style={css({
				"--padding": 4,
				"--bg": "var(--color_purple-0)",
			})}
		>
			<div>hey</div>
		</div>
	);
}

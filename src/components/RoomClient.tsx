import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

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
		<div>
			<div></div>
		</div>
	);
}

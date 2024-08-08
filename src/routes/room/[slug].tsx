// import "../../styles.css";
// import { css } from "../../css";

import { onMount } from "solid-js";

let webSocket: WebSocket | null = null;

export default function Room() {
	const connectWS = () => {
		// webSocket = new WebSocket(import.meta.env.WS_URL);
		webSocket = new WebSocket(
			"wss://you-know-it-do.peculiarnewbie.workers.dev/room/hey/websocket"
		);

		webSocket.onopen = () => {
			console.log("connected");
		};

		webSocket.onmessage = (event) => {
			const data = JSON.parse(event.data as string);
			console.log(data);
		};
	};

	onMount(() => {
		if (true) {
			connectWS();
		}
	});

	return <div>hey</div>;
}

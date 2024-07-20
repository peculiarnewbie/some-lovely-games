import { onMount } from "solid-js";

export default async function WS() {
	let ws: WebSocket | undefined = undefined;

	// const connectWS = async () => {
	//     ws = await fetch("/api/room/hey/websocket", {

	//     })
	// }

	onMount(() => {
		const host = window.location.host;
		ws = new WebSocket(`wss://${host}/api/room/hey/websocket`);

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data as string);
			console.log(data);
		};
	});

	return (
		<div>
			<div>ws test</div>
		</div>
	);
}

// import "../../styles.css";
// import { css } from "../../css";

import { For, onMount } from "solid-js";
import { createSignal } from "solid-js";
import * as R from "remeda"

let webSocket: WebSocket | null = null;

export default function Room() {
    const [currentPlayer, setCurrentPlayer] = createSignal<string>("");
    const [inGame, setInGame] = createSignal<boolean>(false);
    const [players, setPlayers] = createSignal<string[]>([]);

    const connectWS = () => {
        // webSocket = new WebSocket(import.meta.env.WS_URL);
        webSocket = new WebSocket(
            "wss://you-know-it-do.peculiarnewbie.workers.dev/room/hey/websocket"
        );

        webSocket.onopen = () => {
            console.log("connected");
            webSocket?.send(JSON.stringify({ type: "join", player: currentPlayer() }));
        };

        webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data as string);
            console.log(data);
            switch (data.type) {
                case "join":
                    setPlayers((prev) => [...prev, data.player]);
                    break;
                case "leave":
                    setPlayers((prev) => prev.filter((player) => player !== data.player));
            }
        };
    };

    const joinRoom = (player: string) => {
        console.log(currentPlayer())
        if (import.meta.env.VITE_WS_FLAG === "true") {
            console.log("joining")
            connectWS();
        }
        setInGame(true);
    }

    return (
        <div>
            {inGame() ?
                <div>
                    <div>hey</div>
                    <For each={players()}>{(player, i) => <div>{i() + 1}. {player}</div>}</For>
                </div>
                :
                <div>
                    <form >
                        <input type="text" value={currentPlayer()} onchange={(e) => setCurrentPlayer(e.currentTarget.value)} />
                        <button onclick={() => joinRoom(currentPlayer())}>Join</button>
                    </form>
                </div>
            }
        </div>
    )
}

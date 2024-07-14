import {
	type DurableObjectNamespace,
	type DurableObjectState,
} from "@cloudflare/workers-types";

import { APIEvent, APIHandler } from "@solidjs/start/server";

interface CloudflareWebsocket {
	accept(): unknown;
	addEventListener(
		event: "close",
		callbackFunction: (code?: number, reason?: string) => unknown
	): unknown;
	addEventListener(
		event: "error",
		callbackFunction: (e: unknown) => unknown
	): unknown;
	addEventListener(
		event: "message",
		callbackFunction: (event: { data: any }) => unknown
	): unknown;

	/**
	 * @param code https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
	 * @param reason
	 */
	close(code?: number, reason?: string): unknown;
	send(message: string | Uint8Array): unknown;
}

class WebSocketPair {
	0: CloudflareWebsocket & WebSocket; // Client
	1: CloudflareWebsocket & WebSocket; // Server
}

interface ResponseInit {
	status?: number;
	webSocket?: CloudflareWebsocket;
}

// `handleErrors()` is a little utility function that can wrap an HTTP request handler in a
// try/catch and return errors to the client. You probably wouldn't want to use this in production
// code but it is convenient when debugging and iterating.

async function handleErrors(request: Request, func: () => Promise<Response>) {
	try {
		return await func();
	} catch (err) {
		if (
			request.headers.get("Upgrade") == "websocket" &&
			err instanceof Error
		) {
			let pair: WebSocketPair = new WebSocketPair();
			const [client, server] = Object.values(pair);
			pair[1].accept();
			pair[1].send(JSON.stringify({ error: err.stack }));
			pair[1].close(1011, "Uncaught exception during session setup");

			return new Response(null, { status: 101, webSocket: client });
		} else {
			if (err instanceof Error) {
				return new Response(err.stack, { status: 500 });
			}
		}
	}
}

// In modules-syntax workers, we use `export default` to export our script's main event handlers.
// Here, we export one handler, `fetch`, for receiving HTTP requests. In pre-modules workers, the
// fetch handler was registered using `addEventHandler("fetch", event => { ... })`; this is just
// new syntax for essentially the same thing.
//
// `fetch` isn't the only handler. If your worker runs on a Cron schedule, it will receive calls
// to a handler named `scheduled`, which should be exported here in a similar way. We will be
// adding other handlers for other types of events over time.
export async function GET(context: APIEvent) {
	return await handleErrors(context.request, async () => {
		// We have received an HTTP request! Parse the URL and route the request.

		const { name, procedure } = context.params;

		try {
			return await handleApiRequest(
				name ?? "hey",
				context.request,
				context.locals.runtime.env
			);
		} catch (err) {
			console.error(err);
			return new Response("fails", { status: 500 });
		}
	});
}

async function handleApiRequest(name: string, request: Request, env: ENV) {
	// We've received at API request. Route the request based on the path.

	let id;
	if (name.match(/^[0-9a-f]{64}$/)) {
		id = env.DO.idFromString(name);
	} else if (name.length <= 32) {
		id = env.DO.idFromName(name);
	} else {
		return new Response("Name too long", { status: 404 });
	}

	let roomObject = env.DO.get(id);

	return await roomObject.fetch(request);
}

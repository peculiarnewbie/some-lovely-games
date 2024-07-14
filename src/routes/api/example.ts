import type { APIEvent } from "@solidjs/start/server";
import { DurableObjectNamespace } from "@cloudflare/workers-types";

interface Env {
	DURABLE_OBJECT: DurableObjectNamespace;
}

export function GET() {
	const huh = import.meta.env.VITE_TEST ?? "ok";
	return huh;
}

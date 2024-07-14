import type { APIEvent } from "@solidjs/start/server";

interface Env {
	DURABLE_OBJECT: DurableObjectNamespace;
}

export function GET() {
	const huh = import.meta.env.VITE_TEST ?? "ok";
	return huh;
}

/// <reference types="astro/client" />
import type { Config } from "../.tokenami/tokenami.env";

type ENV = {
	DO: DurableObjectNamespace;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;

declare namespace App {
	interface Locals extends Runtime {
		session: import("lucia").Session | null;
		user: import("lucia").User | null;
	}
	module "@tokenami/dev" {
		interface TokenamiConfig extends Config {
			CI: true;
		}
	}
}

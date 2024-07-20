/// <reference types="astro/client" />

type ENV = {
	DO: DurableObjectNamespace;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;

declare namespace App {
	interface Locals extends Runtime {}
}

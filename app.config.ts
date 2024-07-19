import { defineConfig } from "@solidjs/start/config";
import nitroCloudflareBindings from "nitro-cloudflare-dev";

export default defineConfig({
	server: {
		preset: "cloudflare-pages",
		rollupConfig: {
			external: ["node:async_hooks"],
		},
		// modules: [nitroCloudflareBindings],
	},
});

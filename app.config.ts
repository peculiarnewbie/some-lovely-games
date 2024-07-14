import { defineConfig } from "@solidjs/start/config";
import nitroCloudflareBindings from "nitro-cloudflare-dev";

export default defineConfig({
	server: {
		preset: "cloudflare-pages",
		modules: [nitroCloudflareBindings],
	},
});

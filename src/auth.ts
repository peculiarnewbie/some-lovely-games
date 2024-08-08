import { Lucia } from "lucia";
import { getAdapter } from "./db";

const adapter = getAdapter(); // your adapter

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD,
		},
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

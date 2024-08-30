import { config } from "@dotenvx/dotenvx";
import type { Config } from "drizzle-kit";

config({ path: ".env" });

export default {
	schema: "./src/db/schema.ts",
	out: "./src/db/migrations",
	dialect: "sqlite",
	driver: "turso",
	// seems there is issue with drizzle-kit https://github.com/drizzle-team/drizzle-orm/issues/2719
	dbCredentials: {
		url: process.env.TURSO_DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN,
	},
} satisfies Config;

import type { APIEvent } from "@solidjs/start/server";
import { getDB } from "~/db";
import { userTable } from "~/db/schema";

export async function GET(event: APIEvent) {
	const env = process.env;
	console.log(env.TURSO_DATABASE_URL);
	const db = getDB(env.TURSO_DATABASE_URL!, env.TURSO_AUTH_TOKEN!);

	const user = await db.select().from(userTable);

	return user;
}

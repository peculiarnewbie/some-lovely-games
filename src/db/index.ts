import { drizzle } from "drizzle-orm/libsql";

// export const client = createClient({
// 	url: import.meta.env.TURSO_DATABASE_URL,
// 	authToken: import.meta.env.TURSO_AUTH_TOKEN,
// });

// export const db = drizzle(client);

// export const getDB = (url: string, token: string) => {
//     const localClient = createClient({
//         url: url,
//         authToken: token,
//     });
//     return drizzle(localClient);
// };

// export const getAdapter = () =>
// 	new DrizzleSQLiteAdapter(db, sessionTable, userTable);

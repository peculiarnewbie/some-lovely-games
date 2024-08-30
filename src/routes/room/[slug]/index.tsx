import { action } from "@solidjs/router"
import { eq } from "drizzle-orm";
import { getDB } from "~/db";
import { gameTable, userTable, youKnowItGameTable } from "~/db/schema";
import { nanoid } from "nanoid";
import { useParams } from "@solidjs/router";

const joinRoom = action(async (formData: FormData) => {
    "use server"
    const player = String(formData.get("player"))
    const gameName = String(formData.get("room"))
    const env = process.env;
    const db = getDB(env.TURSO_DATABASE_URL!, env.TURSO_AUTH_TOKEN!);
    let game = await db.select().from(gameTable).where(eq(gameTable.name, gameName)).limit(1)
    if (game.length === 0) {
        const id = nanoid()
        const createdAt = Date.now()
        game = (await db.insert(gameTable).values({ id: id, name: gameName, type: "you-know-it", createdAt: createdAt }).returning())
    }

    let user = await db.select().from(userTable).where(eq(userTable.username, player)).limit(1)
    if (user.length === 0) {
        const id = nanoid()
        const createdAt = Date.now()
        await db.insert(userTable).values({ id: id, username: player, currentGame: game[0].id })
        user = await db.select().from(userTable).where(eq(userTable.username, player)).limit(1)
    }
})

export default function Room() {

    const params = useParams()

    return (
        <div>
            <div>hey</div>
            <form action={joinRoom} method="post">
                <input type="text" name="player" />
                <input type="text" name="room" hidden value={params.slug} />
                <button type="submit">Join</button>
            </form>
        </div>
    )
}

import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
	id: text("id").notNull().primaryKey(),
	username: text("username").notNull(),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export const sessionTable = sqliteTable("session", {
	id: text("id").notNull().primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer("expires_at").notNull(),
});

export const gameTable = sqliteTable("game", {
	id: text("id").notNull().primaryKey(),
	name: text("name").notNull(),
	createdAt: integer("created_at").notNull(),
	type: text("type").notNull(),
	round: integer("round").notNull().default(0),
	leader: text("leader")
		.notNull()
		.references(() => userTable.id),
});

export const gameRelations = relations(gameTable, ({ many }) => ({
	players: many(userTable),
}));

export const playerTable = sqliteTable("player", {
	id: text("id")
		.notNull()
		.references(() => userTable.id)
		.primaryKey(),
	gameId: text("game_id"),
});

export const playerRelations = relations(playerTable, ({ one }) => ({
	author: one(gameTable, {
		fields: [playerTable.gameId],
		references: [gameTable.id],
	}),
}));

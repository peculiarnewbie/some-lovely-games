import { relations } from "drizzle-orm";
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("user", {
    id: text("id").notNull().primaryKey(),
    username: text("username").notNull(),
    currentGame: text("current_game").references(() => gameTable.id)
});

export const userRelations = relations(userTable, ({ one }) => ({
    game: one(gameTable, {
        fields: [userTable.currentGame],
        references: [gameTable.id],
    })
}))

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
    subGameId: text("sub_game_id")
});

export const gameRelations = relations(gameTable, ({ many }) => ({
    players: many(userTable)
}));

export const youKnowItGameTable = sqliteTable("you_know_it_game", {
    id: text("id")
        .references(() => gameTable.id)
        .notNull()
        .primaryKey(),
    rounds: integer("rounds").notNull(),
    player1Id: text("player1_id").notNull(),
    player2Id: text("player2_id").notNull(),
    player3Id: text("player3_id").notNull(),
    player4Id: text("player4_id"),
    player5Id: text("player5_id"),
    player6Id: text("player6_id"),
    playerScores: text("player_scores").$type<number[]>(),
    playerTokens: text("player_tokens").$type<[number, number][]>(),
});

export const youKnowItRounds = sqliteTable("you_know_it_rounds", {
    roundId: text("round_id").notNull(),
    roundNumber: integer("round_number").notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    player1Answer: text("player1_answer"),
    player2Answer: text("player2_answer"),
    player3Answer: text("player3_answer"),
    player4Answer: text("player4_answer"),
    player5Answer: text("player5_answer"),
    player6Answer: text("player6_answer"),
    player1KnowGuess: integer("player1_know_guess"),
    player2KnowGuess: integer("player2_know_guess"),
    player3KnowGuess: integer("player3_know_guess"),
    player4KnowGuess: integer("player4_know_guess"),
    player5KnowGuess: integer("player5_know_guess"),
    player6KnowGuess: integer("player6_know_guess"),
    player1Bet: text("player1_bet").$type<[number, number]>(),
    player2Bet: text("player2_bet").$type<[number, number]>(),
    player3Bet: text("player3_bet").$type<[number, number]>(),
    player4Bet: text("player4_bet").$type<[number, number]>(),
    player5Bet: text("player5_bet").$type<[number, number]>(),
    player6Bet: text("player6_bet").$type<[number, number]>(),
});

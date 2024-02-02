import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export interface GoalParams {
  currentLevel: string;
  timeline: string;
  challengesFaced: string;
  daysPerWeekAvailable: number;
}

export const quest = sqliteTable("quest", {
  id: text("id").primaryKey(),
  goal: text("goal").notNull(),
  goalParams: text("goal_params", { mode: "json" })
    .notNull()
    // Making everything optional.
    // Things could change in the future.
    .$type<Partial<GoalParams>>(),
  rawOpenAIResponse: text("raw_openai_response"),
  openAIResponse: text("openai_response"),
  isResponseValid: integer("is_response_valid", { mode: "boolean" }),
  promptId: integer("prompt_id")
    .notNull()
    .references(() => prompt.id),
  characterId: integer("character_id")
    .references(() => character.id),
  createdBy: text("created_by").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const prompt = sqliteTable("prompt", {
  id: integer("id").primaryKey(),
  prompt: text("prompt").notNull(),
  variables: text("variables", { mode: "json" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});


export const character = sqliteTable("character", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  path: text("path").notNull()
})

export const tasks = sqliteTable("task", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questId: text("quest_id").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  isComplete: integer("is_complete", { mode: "boolean" }),
  index: integer("index", { mode: "number" }),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
})

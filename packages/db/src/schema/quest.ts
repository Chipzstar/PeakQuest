import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

type GoalParams = {
  currentLevel: string;
  timeline: string;
  challengesFaced: string;
  daysPerWeekAvailable: number;
};

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

import { sqliteTable, AnySQLiteColumn, numeric, text, integer, foreignKey, uniqueIndex } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
	id: numeric("id").primaryKey(),
	hash: text("hash").notNull(),
	createdAt: numeric("created_at"),
});

export const character = sqliteTable("character", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	path: text("path").notNull(),
});

export const prompt = sqliteTable("prompt", {
	id: integer("id").primaryKey().notNull(),
	prompt: text("prompt").notNull(),
	variables: text("variables"),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const quest = sqliteTable("quest", {
	id: text("id").primaryKey().notNull(),
	goal: text("goal").notNull(),
	goalParams: text("goal_params").notNull(),
	rawOpenaiResponse: text("raw_openai_response"),
	openaiResponse: text("openai_response"),
	isResponseValid: integer("is_response_valid"),
	promptId: integer("prompt_id").notNull().references(() => prompt.id),
	characterId: integer("character_id").references(() => character.id),
	createdBy: text("created_by").notNull(),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

export const user = sqliteTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: integer("email_verified"),
	image: text("image"),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
},
(table) => {
	return {
		emailUnique: uniqueIndex("user_email_unique").on(table.email),
	}
});

export const task = sqliteTable("task", {
	id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
	questId: text("quest_id").notNull(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	isComplete: integer("is_complete"),
	index: integer("index"),
	createdAt: text("created_at").default("sql`(CURRENT_TIMESTAMP)`"),
	updatedAt: text("updated_at").default("sql`(CURRENT_TIMESTAMP)`"),
});

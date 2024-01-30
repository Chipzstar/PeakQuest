import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("email_verified", { mode: "boolean" }),
    image: text("image"),
})

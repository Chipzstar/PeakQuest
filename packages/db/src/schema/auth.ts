import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm";


export const users = sqliteTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" }),
    image: text("image"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from './schema/quest';

export * from './schema/quest';
export * from './schema/auth';

export * from "./seed-data"

const DATABASE_URL = process.env.DATABASE_URL!
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, { schema });

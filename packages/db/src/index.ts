import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as auth from "./schema/auth";
import * as quest from "./schema/quest";

export const schema = { ...auth, ...quest };

const DATABASE_URL = process.env.DATABASE_URL as string
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN

const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);

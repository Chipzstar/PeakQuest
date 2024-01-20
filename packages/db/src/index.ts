import { drizzle } from "drizzle-orm/libsql";
import { createClient } from '@libsql/client';

import * as auth from "./schema/auth";

export const schema = { ...auth };

export * from "drizzle-orm";

const DATABASE_URL = process.env.DATABASE_URL ?? "libsql://smooth-judomaster-chipzstar.turso.io";
const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN ?? "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDI0LTAxLTIwVDE3OjE0OjA5LjA2Nzk3MzU2MVoiLCJpZCI6IjIxNGQ3YTgwLWI3YjctMTFlZS1iMTg5LWE2MDMzNTNjNjBiMyJ9.swLbxQ_TFJcZcGJgB1KVf1I_tO9KjmpdLPLGVWnoykRH_TyDVU-01y-3JBzxQtTs3OwAH9Qw-8Vxoy3HaWwfDw";

const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

export const db = drizzle(client);

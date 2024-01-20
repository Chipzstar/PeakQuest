import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default {
  schema: "./src/schema",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL?? "libsql://smooth-judomaster-chipzstar.turso.io",
    authToken: process.env.DATABASE_AUTH_TOKEN?? "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDI0LTAxLTIwVDE3OjE0OjA5LjA2Nzk3MzU2MVoiLCJpZCI6IjIxNGQ3YTgwLWI3YjctMTFlZS1iMTg5LWE2MDMzNTNjNjBiMyJ9.swLbxQ_TFJcZcGJgB1KVf1I_tO9KjmpdLPLGVWnoykRH_TyDVU-01y-3JBzxQtTs3OwAH9Qw-8Vxoy3HaWwfDw"
  }
} satisfies Config;

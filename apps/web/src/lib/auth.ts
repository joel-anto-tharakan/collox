import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";

import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

const databasePath = resolve(process.cwd(), "data", "auth.sqlite");

mkdirSync(dirname(databasePath), { recursive: true });

export const auth = betterAuth({
  database: new DatabaseSync(databasePath),
  secret:
    process.env.BETTER_AUTH_SECRET ?? "collox-local-dev-secret-change-me-now",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  advanced: {
    cookiePrefix: "collox",
  },
  plugins: [nextCookies()],
});

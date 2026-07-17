import { createAuth } from "@anos/auth";
import { toNextJsHandler } from "better-auth/next-js";

const auth = createAuth({
  databaseUrl: process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/anos",
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET ?? "local-demo-secret-change-before-production",
});

export const { GET, POST } = toNextJsHandler(auth);

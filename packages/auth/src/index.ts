import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { Pool } from "pg";

export * from "./permissions";

export interface AuthConfig {
  databaseUrl: string;
  baseURL: string;
  secret: string;
}

export function createAuth(config: AuthConfig) {
  return betterAuth({
    baseURL: config.baseURL,
    database: new Pool({ connectionString: config.databaseUrl }),
    secret: config.secret,
    emailAndPassword: { enabled: true },
    plugins: [organization({ allowUserToCreateOrganization: true })],
  });
}

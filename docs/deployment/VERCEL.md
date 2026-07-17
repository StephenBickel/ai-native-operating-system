# Customer-owned Vercel deployment

1. Fork or import the repository into the customer's GitHub organization.
2. Create a Vercel project rooted at the repository; the included `vercel.json` builds `apps/web` through pnpm.
3. Provision customer-owned hosted PostgreSQL and apply `packages/db/migrations/0001_initial.sql` with an administrative migration identity.
4. Configure `DATABASE_URL`, `ENCRYPTION_KEY`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `MODEL_PROVIDER`, and the selected provider key as server environment variables.
5. Use managed Inngest or a separately hosted compatible coordinator for durable workflows.
6. Connect remote HTTP MCP or REST/OpenAPI endpoints. Vercel functions cannot run persistent local `stdio` connectors.
7. Set production auth origins, webhook signatures, connector allowlists, and audit retention before inviting users.

Keep long-running work in the durable workflow plane. A function may start or stream a run, but tool execution that must survive timeouts is checkpointed before the request returns.

For internal systems, pair Vercel with the private worker described in `PRIVATE.md`; the worker connects outbound and does not require an inbound hole into the customer network.

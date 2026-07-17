# Local evaluation

## Fast path

```bash
cp .env.example .env.local
pnpm install
docker compose up --build
```

Open `http://localhost:3000/workspace/meridian-demo`. The default `MODEL_PROVIDER=mock` and mock integration contracts require no external secrets.

The Compose profile starts PostgreSQL, the Next.js control plane, and the Inngest development coordinator. The server-side Inngest endpoint executes demo workflow steps; private deployments can move the same function contracts to an outbound worker. PostgreSQL data persists in a named volume; generated demo output stays ignored.

## Without Docker

Provide any PostgreSQL URL, run migrations from `packages/db/migrations`, then run `pnpm --filter @anos/web dev`. Use `bash scripts/run-demo.sh` to verify the deterministic content automation independently.

## Before live connections

Replace both auth secrets, generate a 32-byte encryption key, configure an approved model endpoint, review each operation allowlist, connect sandbox accounts, and run `make validate`. Never copy `.env.local`, tokens, or business records into Git.

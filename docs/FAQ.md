# Frequently asked questions

## Is this another chatbot?

No. Chat is the front door to shared tasks, approvals, workflows, connected tools, reviewed memory, and audit history. Long-running work continues without an open tab.

## Who owns the data and repository?

The deploying company does. The live database, Git repository, tool accounts, deployment, model keys, object storage, and connector credentials can all be customer-owned.

## Does company data train a public model?

That depends on the customer's chosen provider and contract. The system keeps provider choice replaceable and sends only the allowed context for the current task. Sensitive deployments may use approved enterprise endpoints or local models.

## How are secrets protected?

Secrets stay server-side, are encrypted at rest or referenced from deployment environment variables, and are never committed or included in model prompts and logs. Tool operations see credential references, not raw values.

## Can it work in a regulated industry?

Yes, when the full operating environment is designed for that industry's obligations. The law and healthcare packs demonstrate stricter autonomy, scoped retrieval, immutable audit, human gates, designated data systems, and prohibited operations. They are implementation patterns, not compliance certification.

## What if we stop working together?

The customer retains its repository, database, deployment, documented tool contracts, workflow definitions, memory exports, and Git history. The system uses ordinary TypeScript, PostgreSQL, Markdown, GitHub Actions, and documented interfaces.

## Are we locked into OpenAI, Vercel, or a database vendor?

No. OpenAI and Vercel are supported defaults, not architectural requirements. Provider interfaces support alternatives, deployment can be local or private, and PostgreSQL is portable across hosts.

## Can it connect to our internal database or custom tool?

Yes. Remote MCP, local `stdio` MCP, REST/OpenAPI, typed adapters, and restricted PostgreSQL connectors share the same permission contract. “Anything with an API” still means only explicitly approved operations are exposed.

## Will agents act without asking?

Only for operations assigned the `act` tier. Sensitive writes use `draft` and wait for a named human. Prohibited operations are `never`. A pack or company policy can tighten but cannot loosen those rules.

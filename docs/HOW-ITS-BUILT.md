# How it is built

## One operating model, two storage speeds

The running product uses customer-owned PostgreSQL for multi-user transactional state: identities, memberships, conversations, tasks, workflow versions, runs, approvals, connections, and current memory. Git stores the reviewed operating contract: core formats, pack policy, skills, integration recipes, exported memory, configuration, and history.

Markdown and Git are deliberate. Policies and procedures remain readable without a proprietary editor, diffs show what changed, reviews fit normal engineering workflows, and customers keep the system if a vendor relationship ends. Git is not misused as the live chat database.

## The core/pack boundary

`core/` contains only universal formats and rules. A pack can add terminology, stricter policy, skills, tool recipes, and seed-memory structure. Effective policy is resolved in this order:

```text
core → industry pack → company policy → task restriction
```

Every layer is additive and restrictive. The strictest autonomy tier (`act`, `draft`, `never`) wins. The repository contract test scans `core/` for known demo and regulated-industry terms to catch boundary leaks.

## What executes where

The Next.js control plane runs locally, on Vercel, or in a private container. Short interactive model responses may stream from a request, but durable automation is handed to the workflow engine. Hosted deployments use remote HTTP MCP or REST/OpenAPI tools. Local and private workers may also run `stdio` MCP servers or reach internal databases through explicit statement and schema allowlists.

Model calls use deployment-owned keys on the server. Mock mode is deterministic and secret-free. A provider interface keeps the company's operating model independent from OpenAI, Azure OpenAI, Anthropic, Google, OpenAI-compatible endpoints, Ollama, or vLLM.

## Agent execution

For each run the runtime assembles:

1. Core contract and active pack.
2. Company and task-specific restrictions.
3. Requester workspace, role, and tool permissions.
4. Relevant reviewed memories and current source records.
5. One matching skill.
6. The smallest allowed set of tool operations.

The model handles ambiguity such as classification, extraction, summarization, drafting, and selection among permitted branches. Deterministic code handles authorization, schedules, filters, state transitions, input schemas, API calls, retries, approvals, and audit events.

## Tool gateway

An operation declares effect (`read` or `write`), input schema, roles, data boundary, credential reference, autonomy, approval rule, timeout, idempotency, retry behavior, redaction, and allowed skills. The gateway enforces this declaration independently of model output. `draft` writes return an approval request rather than executing; `never` operations are rejected.

## Tenancy and secrets

Every collaborative table carries `workspaceId`; application authorization and PostgreSQL Row-Level Security enforce isolation. Better Auth supplies sessions, organizations, invitations, members, and roles. Connector credentials are encrypted by a deployment-level key or referenced entirely through server environment variables. Secrets, raw tokens, and protected records are never stored in Git or browser state.

## Durable workflows

Definitions are versioned and immutable after publication. Steps checkpoint output; retries do not repeat completed work. Events are deduplicated by workspace plus idempotency key. Human approval is a durable wait state, and changed content invalidates prior approval. Side effects reconcile provider IDs before retrying an ambiguous write.

## Evidence in this repository

- `packages/db`: portable PostgreSQL schema and isolation contracts
- `packages/auth`: role and permission policy
- `packages/operating-system`: pack loader and strictest-policy resolver
- `packages/tool-runtime`: validated, redacted, approval-aware operations
- `packages/workflow-runtime`: checkpointed local engine and Inngest adapter
- `packages/agent-runtime`: context composition and event stream
- `apps/web`: multi-user chat-first control plane
- `tests/contracts`: executable content and boundary rules

The public seed content is fictional. A client build begins with a tool and data-boundary audit before any live connector is enabled.

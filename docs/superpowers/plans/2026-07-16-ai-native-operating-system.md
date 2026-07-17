# AI Native Operating System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable, multi-user, chat-first business operating system with durable automations, customer-owned infrastructure, reusable core contracts, and three industry packs.

**Architecture:** A pnpm TypeScript monorepo hosts a Next.js control plane and focused packages for policy overlays, PostgreSQL persistence, authentication, models, tools, storage, and durable workflows. PostgreSQL stores collaborative runtime state, Git stores versioned operating contracts, Inngest coordinates durable work, and all external actions pass through operation-level governance.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, pnpm, PostgreSQL, Drizzle ORM, Better Auth, Vercel AI SDK, Inngest, Zod, Vitest, Playwright, Tailwind CSS, Docker Compose, GitHub Actions, Markdown, YAML, MCP.

## Global Constraints

- Nothing Meridian-specific or industry-specific may exist inside `core/`.
- Packs may tighten core governance but may never weaken it.
- Every authored directory contains a README defining its read/write contract.
- Production credentials remain server-side and are never committed or logged.
- The complete demo runs without third-party secrets through deterministic mock providers.
- Customers can supply their own PostgreSQL database, model key, tools, GitHub repository, Vercel account, or local infrastructure.
- Open-ended model reasoning is limited to ambiguous steps; state transitions, permissions, writes, retries, and scheduling remain deterministic.
- All new behavior follows red-green-refactor test-driven development.
- Each task ends in fresh verification and one logical commit.

---

### Task 1: Industry-neutral core and pack contracts

**Files:**
- Create: `core/README.md`, `core/AGENTS.template.md`, `core/SYSTEM.md`, `core/GOVERNANCE.md`
- Create: `core/memory/{README.md,FACT.template.md,MEMORY.template.md}`
- Create: `core/memory/logs/{README.md,LOG.template.md}`
- Create: `core/skills/{README.md,SKILL.template.md}`
- Create: `core/integrations/{README.md,TOOL.template.md,CATALOG.md}`
- Create: `core/automations/README.md`, `core/tasks/README.md`, `packs/README.md`
- Create: `scripts/{README.md,validate-content.sh}`
- Test: `tests/contracts/{README.md,core-boundary.test.sh,content-contracts.test.sh}`
- Create: `tests/README.md`

**Interfaces:**
- Consumes: The approved design specification.
- Produces: Stable Markdown/YAML contracts consumed by the runtime parser and every industry pack.

- [ ] **Step 1: Write failing boundary and content tests**

```bash
#!/usr/bin/env bash
set -euo pipefail
for required in core/README.md core/SYSTEM.md core/GOVERNANCE.md core/skills/SKILL.template.md core/memory/FACT.template.md; do
  test -f "$required" || { echo "missing $required"; exit 1; }
done
if rg -ni 'Meridian Creative|HIPAA|privilege|Clio|athenahealth' core; then
  echo 'industry-specific content found in core/'
  exit 1
fi
```

- [ ] **Step 2: Run tests and verify the missing-contract failure**

Run: `bash tests/contracts/core-boundary.test.sh`

Expected: exit 1 with `missing core/README.md`.

- [ ] **Step 3: Write the minimal contracts and validator**

Define autonomy tiers exactly as `act`, `draft`, and `never`. Define memory frontmatter keys exactly as `name`, `description`, and `type`, where type is one of `company`, `client`, `decision`, `lesson`, or `reference`. Define the skill headings `Trigger`, `Required autonomy`, `Inputs`, `Steps`, `Tools touched`, `Output format`, and `Quality bar`.

- [ ] **Step 4: Run contract tests**

Run: `bash tests/contracts/core-boundary.test.sh && bash tests/contracts/content-contracts.test.sh`

Expected: both scripts exit 0 and print their pass summaries.

- [ ] **Step 5: Commit**

```bash
git add core packs/README.md scripts tests
git commit -m "feat: define reusable operating system contracts"
```

### Task 2: Monorepo, database, authentication, and overlay engine

**Files:**
- Create: `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `.gitignore`, `.env.example`, `vitest.workspace.ts`
- Create: `packages/README.md`
- Create: `packages/db/{README.md,package.json}` and `packages/db/src/{schema.ts,client.ts,index.ts}`
- Create: `packages/db/migrations/0001_initial.sql`, `packages/db/test/schema.test.ts`
- Create: `packages/auth/{README.md,package.json}` and `packages/auth/src/{index.ts,permissions.ts}`
- Create: `packages/auth/test/permissions.test.ts`
- Create: `packages/operating-system/{README.md,package.json}`
- Create: `packages/operating-system/src/{types.ts,load.ts,governance.ts,index.ts}`
- Create: `packages/operating-system/test/{governance.test.ts,load.test.ts}`

**Interfaces:**
- Consumes: Core autonomy tier names and pack overlay rules from Task 1.
- Produces: `resolveAutonomy(layers): AutonomyTier`, `loadOperatingSystem(root, pack): Promise<OperatingSystem>`, database schema exports, and `can(role, action): boolean`.

- [ ] **Step 1: Add failing governance tests**

```ts
import { describe, expect, it } from "vitest";
import { resolveAutonomy } from "../src/governance";

describe("resolveAutonomy", () => {
  it("uses the strictest layer", () => {
    expect(resolveAutonomy(["act", "draft", "never"])).toBe("never");
  });
  it("does not allow a pack to loosen core", () => {
    expect(resolveAutonomy(["draft", "act"])).toBe("draft");
  });
});
```

- [ ] **Step 2: Install pinned dependencies and verify RED**

Run: `corepack enable && pnpm install && pnpm --filter @anos/operating-system test`

Expected: failure because `../src/governance` does not exist.

- [ ] **Step 3: Implement the minimum overlay engine**

```ts
export type AutonomyTier = "act" | "draft" | "never";
const weight: Record<AutonomyTier, number> = { act: 0, draft: 1, never: 2 };

export function resolveAutonomy(layers: AutonomyTier[]): AutonomyTier {
  return layers.reduce((strictest, layer) =>
    weight[layer] > weight[strictest] ? layer : strictest, "act");
}
```

- [ ] **Step 4: Add failing workspace-isolation and permission tests**

Assert every collaborative table includes `workspaceId`; viewers cannot approve or mutate; members can create tasks; admins and owners can manage connections; only owners can delete a workspace.

- [ ] **Step 5: Implement portable PostgreSQL schema and auth permissions**

Create tables for workspaces, memberships, conversations, messages, tasks, memories, workflow definitions, workflow versions, runs, run steps, approvals, connections, secrets, events, and audit records. Add workspace indexes, foreign keys, timestamps, and RLS-enabling SQL. Configure Better Auth with PostgreSQL and its organization plugin without embedding a vendor-specific database service.

- [ ] **Step 6: Verify packages**

Run: `pnpm --filter @anos/db test && pnpm --filter @anos/auth test && pnpm --filter @anos/operating-system test && pnpm typecheck`

Expected: all package tests pass and TypeScript exits 0.

- [ ] **Step 7: Commit**

```bash
git add package.json pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json vitest.workspace.ts .gitignore .env.example packages
git commit -m "feat: add portable workspace and policy foundation"
```

### Task 3: Model, tool, storage, and durable workflow runtimes

**Files:**
- Create: `packages/model-providers/` with README, package manifest, types, mock/OpenAI providers, index, and tests
- Create: `packages/tool-runtime/` with README, package manifest, registry, redaction, mock connectors, index, and tests
- Create: `packages/storage/` with README, package manifest, local adapter, types, index, and tests
- Create: `packages/workflow-runtime/` with README, package manifest, local engine, Inngest adapter, types, index, and tests
- Create: `packages/agent-runtime/` with README, package manifest, context builder, executor, index, and tests

**Interfaces:**
- Consumes: `OperatingSystem`, `AutonomyTier`, workspace identity, and database audit interfaces.
- Produces: provider-neutral streaming, permissioned tool execution, durable step execution, and `executeAgentRun(request): AsyncIterable<AgentEvent>`.

- [ ] **Step 1: Add failing tool-policy tests**

```ts
it("requests approval before a draft-tier write", async () => {
  const result = await registry.invoke("gmail.messages.send", input, context);
  expect(result).toEqual({ status: "approval_required", operation: "gmail.messages.send" });
});

it("denies a never-tier operation", async () => {
  await expect(registry.invoke("stripe.refunds.create", input, context))
    .rejects.toThrow("operation denied by governance");
});
```

- [ ] **Step 2: Verify RED**

Run: `pnpm --filter @anos/tool-runtime test`

Expected: failure because the registry implementation does not exist.

- [ ] **Step 3: Implement tool registry, redaction, and typed mocks**

The registry validates input with Zod, resolves the strictest autonomy tier, denies `never`, returns an approval request for `draft` writes, executes allowed operations, redacts configured fields, and emits audit events. Mock connectors use stable fixture IDs and deterministic timestamps supplied by the caller.

- [ ] **Step 4: Add failing workflow recovery and agent-event tests**

Test that completed steps are not repeated after retry, an approval pauses and resumes a run, duplicate event keys produce one run, and the agent event stream emits context, model, tool, approval, and completion events in order.

- [ ] **Step 5: Implement minimal runtimes**

Implement a local in-process workflow engine for tests and mock mode plus an Inngest adapter for deployment. Implement a deterministic model provider and an OpenAI provider using server-side configuration. Implement local storage with path traversal protection. Compose them in the agent runtime.

- [ ] **Step 6: Verify runtime packages**

Run: `pnpm --filter @anos/model-providers test && pnpm --filter @anos/tool-runtime test && pnpm --filter @anos/storage test && pnpm --filter @anos/workflow-runtime test && pnpm --filter @anos/agent-runtime test && pnpm typecheck`

Expected: all tests pass and TypeScript exits 0.

- [ ] **Step 7: Commit**

```bash
git add packages
git commit -m "feat: add governed agent and automation runtimes"
```

### Task 4: Chat-first multi-user web application

**Files:**
- Create: `apps/README.md`, `apps/web/README.md`, and web configuration files
- Create: public, sign-in, workspace, inbox, tasks, automations, knowledge, integrations, runs, and admin routes
- Create: chat, auth, approvals, and events API routes
- Create: app shell, conversation sidebar, chat workspace, message stream, prompt composer, tool card, approval card, context panel, and automation list components
- Create: `apps/web/lib/{README.md,demo-data.ts}` and `apps/web/public/README.md`
- Create: component and Playwright tests under `apps/web/tests/`

**Interfaces:**
- Consumes: Runtime packages from Tasks 2 and 3.
- Produces: Responsive team UI and authenticated API routes for chat, approvals, and events.

- [ ] **Step 1: Write failing component tests**

Test that the workspace renders conversation navigation, a central composer, live context, tool cards, and approval controls; approval buttons must expose accessible names and emit only one decision.

- [ ] **Step 2: Verify RED**

Run: `pnpm --filter @anos/web test`

Expected: failure because the components do not exist.

- [ ] **Step 3: Implement the visual system and shell**

Use warm off-white surfaces, near-black text, restrained indigo status accents, fine borders, compact typography, generous center-column whitespace, and clear focus states. Desktop uses three panels; tablet collapses context into a drawer; mobile uses a single conversation column with navigation sheets. Do not copy Codex names, logos, exact icons, or proprietary assets.

- [ ] **Step 4: Implement routes and server composition**

The public route sells the service. Workspace routes share a persistent shell. The chat route authenticates the member, verifies workspace access, streams agent events, and persists messages. Approval and event routes validate workspace, operation, event schema, and idempotency.

- [ ] **Step 5: Run unit and browser tests**

Run: `pnpm --filter @anos/web test && pnpm --filter @anos/web test:e2e && pnpm --filter @anos/web build`

Expected: component tests and the seeded demo journey pass; the production build exits 0.

- [ ] **Step 6: Commit**

```bash
git add apps packages/ui
git commit -m "feat: build chat-first team workspace"
```

### Task 5: Meridian pack, memories, integrations, and live mock automations

**Files:**
- Create: `packs/marketing-agency/` with company, governance, terminology, six skills, six integrations, MCP examples, fifteen memories, four logs, and deterministic fixtures
- Create: `AGENTS.md`, `MEMORY.md`, `TASKS.md`, `CHANGELOG.md`
- Create: `scripts/run-demo.sh`
- Test: `tests/contracts/marketing-pack.test.sh`
- Test: `packages/workflow-runtime/test/meridian-demo.test.ts`

**Interfaces:**
- Consumes: Core contracts, pack loader, mock tools, workflow engine, and web demo data.
- Produces: A complete fictional company instance and two deterministic end-to-end automations.

- [ ] **Step 1: Write failing pack and workflow tests**

Assert six valid skills, six integration contracts, fifteen valid facts, four logs, one explicit superseding pricing decision, and no Meridian content in core. The workflow test must pause at Gmail send approval, resume after approval, update the mock CRM, and create an audit event.

- [ ] **Step 2: Verify RED**

Run: `bash tests/contracts/marketing-pack.test.sh && pnpm --filter @anos/workflow-runtime test -- meridian-demo`

Expected: failure because the pack does not exist.

- [ ] **Step 3: Write the full Meridian pack and root instantiation**

Use realistic named staff, clients, dates, incomplete work, communication preferences, operational lessons, and a later decision that supersedes an earlier pricing floor. Every skill names its integrations, autonomy tier, inputs, ordered steps, output, and quality bar.

- [ ] **Step 4: Implement deterministic demo workflows**

Add the weekday stale-lead follow-up and daily agency digest using mock HubSpot, Gmail, Slack, Calendar, Notion, and Stripe operations. Generate stable Markdown output under `.demo-output/`, which remains ignored by Git.

- [ ] **Step 5: Verify demo**

Run: `bash tests/contracts/marketing-pack.test.sh && make demo && git diff --exit-code -- packs/marketing-agency/demo/expected`

Expected: contract test passes, both workflows complete with the documented approval simulation, and expected fixtures remain unchanged.

- [ ] **Step 6: Commit**

```bash
git add packs/marketing-agency AGENTS.md MEMORY.md TASKS.md CHANGELOG.md scripts tests packages/workflow-runtime/test
git commit -m "feat: bring Meridian Creative demo to life"
```

### Task 6: Regulated packs, client collateral, deployment, and repository automation

**Files:**
- Create: law-firm pack with README, governance, terminology, three skills, integration sketch, and three seed memories
- Create: healthcare-practice pack with README, governance, terminology, three skills, integration sketch, and three seed memories
- Create: `README.md`, `docs/HOW-ITS-BUILT.md`, `docs/ENGAGEMENT.md`, `docs/FAQ.md`
- Create: local, Vercel, and private deployment guides plus Docker and Vercel configuration
- Create: `.mcp.example.json`, `LICENSE`, `Makefile`
- Create: GitHub labels, issue forms, and four workflows
- Create: `scripts/validate-repo.sh`
- Test: `tests/contracts/regulated-packs.test.sh`, `tests/contracts/repository.test.sh`

**Interfaces:**
- Consumes: All prior product and content layers.
- Produces: Complete public showcase, two deployment paths, governance proof, and CI enforcement.

- [ ] **Step 1: Write failing regulated-pack and repository tests**

Assert law and healthcare overlays use stricter autonomy, require audit records, require humans to send external messages, name their specified tools, include three finished skills apiece, and contain no real regulated data. Assert every authored directory has a README, every workflow begins with a business-value comment, and the integration catalog lists at least 25 tools.

- [ ] **Step 2: Verify RED**

Run: `bash tests/contracts/regulated-packs.test.sh && bash tests/contracts/repository.test.sh`

Expected: failure because the packs and repository operations files do not yet exist.

- [ ] **Step 3: Build regulated packs and client collateral**

Make privilege, confidentiality, no-unsupervised-legal-advice, PHI boundaries, minimum-necessary access, human-send requirements, immutable audit records, and escalation gates operational rules. Write the root README for a business owner and keep technical detail in `docs/HOW-ITS-BUILT.md`.

- [ ] **Step 4: Add portable deployment and GitHub operations**

Local Docker starts web, PostgreSQL, Inngest, and a worker in deterministic demo mode. Vercel documentation uses customer-owned accounts and hosted PostgreSQL. Private deployment documents outbound-only workers for internal tools. Workflows validate content, create digest artifacts, consolidate memory candidates, and label new issues.

- [ ] **Step 5: Run the complete verification matrix**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build && make validate && make demo && git diff --check`

Expected: every command exits 0 with no failures or warnings that indicate broken behavior.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: complete deployable industry operating system"
```

### Task 7: Final audit and public-repository handoff

**Files:**
- Modify: `CHANGELOG.md`, `README.md`, and any file found defective by the audit

**Interfaces:**
- Consumes: The approved design, this implementation plan, and all repository contents.
- Produces: Verified eight-commit history and exact public push command.

- [ ] **Step 1: Audit every acceptance criterion**

Map each design acceptance criterion to a command, test, or exact file. Fix uncovered gaps through a failing regression test before implementation changes.

- [ ] **Step 2: Run fresh full verification**

Run: `pnpm lint && pnpm typecheck && pnpm test && pnpm test:e2e && pnpm build && make validate && make demo`

Expected: all commands exit 0.

- [ ] **Step 3: Verify repository history and cleanliness**

Run: `git log --oneline --reverse && git status --short && git diff --check`

Expected: eight logical commits, empty status, and no whitespace errors.

- [ ] **Step 4: Prepare handoff commands without pushing**

```bash
gh auth status
gh repo create stephenbickel/ai-native-operating-system --public --source=. --remote=origin --push
```

Do not run the creation command unless Stephen explicitly authorizes publishing after reviewing the finished repository.

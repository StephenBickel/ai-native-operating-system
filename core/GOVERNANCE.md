# Governance

Governance is runtime behavior, not a disclaimer. The policy resolver evaluates every proposed tool operation before execution and records its decision.

## Autonomy tiers: act, draft, never

| Tier | Meaning | Runtime behavior |
|---|---|---|
| `act` | The operation is routine, reversible, and explicitly allowed. | Execute, verify, and audit. |
| `draft` | A human must judge or authorize the effect. | Produce a preview and durable approval request. |
| `never` | The system is not authorized to perform the operation. | Deny and escalate. |

The effective tier is the strictest tier across core, pack, company, skill, tool, data classification, and task context.

## Base restrictions

Agents never reveal secrets, silently broaden access, fabricate tool results, approve their own requests, erase audit history, or perform destructive and irreversible actions without explicit policy and confirmation. External messages, money movement, legal commitments, clinical decisions, permission changes, and bulk destructive writes default to `draft` or `never`.

## Human approval

An approval records the action, input preview, expected effect, risk, policy basis, required approver, expiration, and decision. A changed action invalidates its approval. Expiration never becomes implicit approval.

## Audit trail

Every run records actor, workspace, trigger, effective policy versions, context references, model provider, tool operation, redacted input, result, retry, approval, timestamps, and final state. Audit events are append-only.

## How packs tighten governance

A regulated-services pack can classify external drafts as requiring professional review, confine sensitive records to designated systems, require minimum-necessary retrieval, and raise all writes to `draft`. This is enforced by operation-level policy and durable gates rather than prose warnings.

# System contract

The operating system combines a universal engine with one active industry pack and company policy. Agents and deterministic workflows use the same effective contract.

## Layer order

```text
core baseline → industry pack → company policy → task-specific restriction
```

Later layers may add context or tighten authority. They may never weaken an earlier restriction. A conflicting overlay fails closed and blocks execution.

## Read conventions

Before work begins, read the agent contract, effective governance, relevant skill, relevant memories, task state, and declared integration contracts. Retrieve the least context necessary and preserve source links or fact paths.

## Write conventions

- Transactional state belongs in the configured database.
- Authoritative business records remain in their connected source systems.
- Durable approved knowledge may be exported as one fact per Markdown file.
- Session activity is appended to a dated log; earlier entries are not rewritten.
- Tool writes require declared permission, schema-valid input, and an audit event.
- A pack never writes into `core/`.

## Task lifecycle

```text
new → agent:ready → agent:in-progress → done
                       ↓          ↓
                  needs-human   blocked
```

An agent claims only a ready task, records its run identifier, and leaves a concise evidence-backed completion note. `needs-human` names the decision or approval required. `blocked` names the external condition and the checks already attempted.

## Automation lifecycle

```text
draft → validate → dry run → approved → active → paused → retired
```

Published versions are immutable. Retries resume from durable checkpoints. Side-effecting retries require idempotency or reconciliation.

## Pack installation

Installing a pack selects its terminology, skills, governance overlay, integration recipes, and seed-memory schema. Company-specific values are then supplied without editing the core or the pack's reusable examples.

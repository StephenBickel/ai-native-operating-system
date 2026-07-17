# Core engine

`core/` is the reusable, industry-neutral operating contract. Agents read it before an installed pack. They do not write live company facts here; reusable format or governance improvements require human review.

The hard boundary is simple: **nothing company-specific or industry-specific belongs in core**. Company context, terminology, compliance rules, skills, seed memories, and tool choices belong in `packs/`.

| Area | Contract |
|---|---|
| `AGENTS.template.md` | Master behavior and escalation contract |
| `SYSTEM.md` | Layering, read/write rules, and task lifecycle |
| `GOVERNANCE.md` | Base autonomy and audit model |
| `memory/` | Durable fact and journal formats |
| `skills/` | Executable workflow format |
| `integrations/` | Tool connection and permission format |
| `automations/` | Durable trigger and execution conventions |
| `tasks/` | Shared human-and-agent work queue |

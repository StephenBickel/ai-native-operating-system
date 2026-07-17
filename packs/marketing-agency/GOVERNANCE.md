# Meridian governance overlay

This overlay may only tighten the core policy.

- CRM, calendar, project, billing-status, and approved-memory reads: `act`.
- Internal drafts, task creation, Notion updates, and internal Slack summaries: `act` when source links are attached.
- Any email, client-facing Slack message, invoice reminder, scope change, timeline promise, or published content: `draft` and requires the accountable human.
- Refunds, payment-method changes, contract acceptance, credential changes, destructive deletion, and autonomous ad-spend changes: `never`.
- Client data stays in Meridian-approved systems. Logs store record references and redacted metadata, not message bodies or secrets.
- A failed external write pauses the workflow, creates an inbox item, and records an audit event. The agent never silently retries a non-idempotent send.

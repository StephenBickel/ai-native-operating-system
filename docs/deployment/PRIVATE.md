# Private and hybrid deployment

Run the web application, PostgreSQL, workflow coordinator, object storage, and workers on customer-controlled container infrastructure. Terminate TLS at the customer's gateway, use the corporate identity boundary, and export audit events to the approved observability or security system.

In a hybrid profile, Vercel hosts the shared interface while a private worker maintains an outbound connection to the workflow coordinator. The worker may run local `stdio` MCP servers, restricted database operations, file-system adapters, or internal REST tools unavailable to hosted functions.

## Worker boundary

- Give each worker a workspace and environment identity.
- Allowlist connector, operation, schema, table, statement type, and egress destination.
- Keep credentials in the customer's secret manager and inject references at run time.
- Redact inputs and outputs before logs; preserve source record IDs and hashes for audit.
- Reconcile ambiguous writes and pause rather than blindly retrying.
- Disable a worker centrally by revoking its workflow credential and connection lease.

Regulated deployments additionally require the customer's privacy, security, legal, retention, and vendor reviews. A pack expresses product controls but does not replace organizational compliance work.

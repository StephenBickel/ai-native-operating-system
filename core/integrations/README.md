# Integration framework

An integration exposes narrowly scoped operations through MCP, REST/OpenAPI, PostgreSQL, or a typed built-in adapter. Agents never receive an unrestricted client. Each tool directory contains a README based on `TOOL.template.md` and declares reads, writes, callers, setup, permissions, mock behavior, failure policy, and audit redaction.

Cloud deployments use remote HTTP transports. Local or private workers may also use `stdio` MCP. Credentials come from deployment environment variables or an encrypted connection registry and never appear in prompts or logs.

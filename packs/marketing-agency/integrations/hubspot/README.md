# HubSpot

## Reads

- `hubspot.contacts.read`, `hubspot.companies.read`, `hubspot.engagements.read`: allowlisted sales and account fields.

## Writes

- `hubspot.contacts.update`, `hubspot.tasks.create`, `hubspot.notes.create`: patch allowlisted fields or append activity using object ID plus workflow run as the idempotency key; `act`.

## Used by skills

- `lead-intake`, `client-onboarding`, `weekly-status-report`, `invoice-chaser`

## Setup

Create a private app with CRM object scopes, set `HUBSPOT_ACCESS_TOKEN`, register required webhooks, and validate the portal ID and property allowlist.

## Permissions

Agents cannot delete, merge, export, or change lifecycle rules. Billing and sensitive notes are readable only by operations and account owners.

## Mock mode

Uses `demo/fixtures/hubspot.json`; updates stay in memory and return stable `mock_hs_*` IDs.

## Failure policy

Retry safe reads and 429 responses. Validate current object version before patching; conflicts create a human task and redacted audit event.

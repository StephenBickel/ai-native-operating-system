# Gmail

## Reads

- `gmail.threads.read`: allowlisted account threads referenced by CRM records or explicit user selection.

## Writes

- `gmail.drafts.create`: save a reviewable draft, `act`.
- `gmail.messages.send`: send the exact approved draft, always `draft` with a named approver and content hash.

## Used by skills

- `lead-intake`, `client-onboarding`, `weekly-status-report`, `invoice-chaser`, `meeting-debrief`

## Setup

Configure OAuth for the dedicated account, set redirect and encryption keys, request minimal Gmail scopes, and verify sender identity. Domain-wide delegation is not required.

## Permissions

No delete, forwarding-rule, mailbox-setting, bulk-send, or unrestricted search operations. Approval expires when recipients, subject, attachments, or body change.

## Mock mode

Drafts and sends return stable `mock_msg_*` IDs from fictional recipients and never contact SMTP or Google.

## Failure policy

Do not automatically retry an ambiguous send. Reconcile by RFC message ID; if outcome is unknown, pause for a human and preserve a redacted audit record.

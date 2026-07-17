---
name: lead-intake
description: Qualify, route, and acknowledge a new agency lead before it goes stale.
---

# Lead intake

## Trigger

A new HubSpot contact submits a qualified inquiry, or an operator asks to process an unassigned lead. Exclude spam, vendors, and existing clients.

## Required autonomy

`draft`

## Inputs

- HubSpot contact, company, source, consent, inquiry text, and owner state.
- Calendar availability and the current qualification rubric in Notion.

## Steps

1. Deduplicate by normalized email and company domain.
2. Score fit using budget, service, timing, and industry evidence; never invent missing fields.
3. Assign the account owner using territory and workload rules.
4. Create a concise CRM note and next-action task.
5. Draft a personal acknowledgement with two valid meeting windows.
6. Ask the owner to approve the Gmail send; then log message ID and timestamp in HubSpot.

## Tools touched

- `hubspot.contacts.read`, `hubspot.contacts.update`, `hubspot.tasks.create`
- `notion.pages.read`, `google-calendar.freebusy.read`, `gmail.drafts.create`, `gmail.messages.send`

## Output format

Return `Fit`, `Evidence`, `Owner`, `CRM changes`, `Draft reply`, `Approval`, and linked record IDs.

## Quality bar

No duplicate record, unsupported claim, unavailable time, or external send without named approval. The acknowledgement must reference the inquiry specifically.

---
name: prior-auth-tracker
description: Track prior-authorization evidence and deadlines without making clinical assertions.
---

# Prior authorization tracker

## Trigger

Authorized staff create a prior-authorization work item or an approved payer-status event changes.

## Required autonomy

`draft`

## Inputs

- Authorization token, requested service code, payer, submitted document references, status, due dates, and responsible clinician and staff.

## Steps

1. Verify role, purpose, and minimum-necessary fields.
2. Reconcile practice and payer status using transaction references.
3. List missing administrative artifacts; never author clinical justification or determine medical necessity.
4. Calculate administrative follow-up dates from approved payer rules and flag them for staff verification.
5. Draft a status request or staff task using minimum-necessary data.
6. A human verifies and sends any payer or patient communication and records the response.

## Tools touched

- `ehr.authorizations.read`, `payer.status.read`, `fax-bridge.drafts.create`, `ehr.tasks.create`

## Output format

Return `Recorded status`, `Transaction evidence`, `Missing artifacts`, `Dates—verify`, `Owner`, and `Draft status request`.

## Quality bar

No diagnosis narrative or medical-necessity claim is generated, all dates are source-linked, PHI remains designated, and every disclosure is audited.

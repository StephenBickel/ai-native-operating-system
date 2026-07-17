---
name: patient-intake-routing
description: Validate and route administrative intake without making a clinical decision.
---

# Patient intake routing

## Trigger

An authenticated patient submits an intake form through the designated portal, or authorized staff open a verified intake work item.

## Required autonomy

`draft`

## Inputs

- Verified identity token, requested service, scheduling constraints, consent state, referring source, and only the approved routing fields.

## Steps

1. Verify source, identity state, consent, purpose, and minimum-necessary field allowlist.
2. Detect incomplete administrative fields and emergency language.
3. Route emergency language to the human protocol immediately without clinical guidance.
4. Match non-emergency requests to the approved administrative queue; do not infer diagnosis or urgency.
5. Create a staff review task in the designated practice system.
6. Draft a portal acknowledgement; a human reviews and sends it.

## Tools touched

- `ehr.intake.read`, `ehr.tasks.create`, `zocdoc.appointments.read`, `patient-portal.drafts.create`

## Output format

Return `Verification`, `Minimum-necessary fields`, `Administrative route`, `Missing items`, `Human owner`, and `Draft status`.

## Quality bar

No PHI leaves designated systems, no clinical conclusion appears, emergency language is escalated immediately, and every access is audited.

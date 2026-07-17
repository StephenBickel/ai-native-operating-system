---
name: engagement-letter-draft
description: Assemble a lawyer-reviewable engagement letter from cleared intake and approved clauses.
---

# Engagement letter draft

## Trigger

A conflicts lawyer records clearance and the responsible lawyer authorizes drafting with a named approved template.

## Required autonomy

`draft`

## Inputs

- Cleared intake ID, client identity, scope, exclusions, responsible lawyer, fee structure, jurisdiction, and approved template version.

## Steps

1. Verify conflict clearance, authority, and template version.
2. Populate only approved variables and clause options.
3. Mark missing or conflicting business terms; do not invent them.
4. Compare the draft to the template and report every deviation.
5. Save the restricted draft to NetDocuments with source references.
6. Request responsible-lawyer approval; only a human may send or execute the letter.

## Tools touched

- `clio.intakes.read`, `netdocuments.templates.read`, `netdocuments.documents.create`, `outlook.drafts.create`

## Output format

Return `Clearance`, `Template`, `Populated terms`, `Missing decisions`, `Deviation report`, and the restricted draft link.

## Quality bar

Names, scope, fees, and jurisdiction are source-matched. No clause is invented, no signature is applied, and no external send occurs.

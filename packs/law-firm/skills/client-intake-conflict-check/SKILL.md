---
name: client-intake-conflict-check
description: Normalize confidential intake and surface conflict candidates for lawyer disposition.
---

# Client intake and conflict check

## Trigger

Authorized intake staff submit a complete prospective-client form. Do not run from an unverified email or against unrelated firm data.

## Required autonomy

`draft`

## Inputs

- Prospective client, related entities, adverse parties, principals, jurisdictions, matter description, and consent metadata.

## Steps

1. Validate the required fields and record confidential intake purpose.
2. Normalize names without discarding aliases, former names, or entity relationships.
3. Search Clio contacts and matters within the conflict-search service account's allowed scope.
4. Rank exact and fuzzy candidates with the matching evidence; make no clearance decision.
5. Create a restricted conflict report in NetDocuments.
6. Ask the conflicts lawyer to clear, decline, or request research before any matter or engagement draft is created.

## Tools touched

- `clio.contacts.search`, `clio.matters.search`, `netdocuments.documents.create`, `outlook.drafts.create`

## Output format

Return `Intake completeness`, `Entities searched`, `Candidates`, `Evidence`, `Unresolved`, and `Human disposition`.

## Quality bar

All names and relationships remain traceable to intake. No candidate is silently discarded; no matter is opened; every read and disposition is audited.

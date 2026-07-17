---
name: matter-status-digest
description: Prepare a permission-scoped matter digest for the responsible legal team.
---

# Matter status digest

## Trigger

The responsible lawyer requests a digest for a matter the requester may access, or an approved internal schedule runs for that team.

## Required autonomy

`draft`

## Inputs

- Matter ID, reporting window, audience, Clio activity, approved NetDocuments workspace, and relevant Outlook correspondence references.

## Steps

1. Verify matter membership, information barriers, and purpose.
2. Read docket, task, time, document, and correspondence metadata from allowlisted sources.
3. Separate recorded facts, unresolved issues, possible dates, and model inference.
4. Cite every status statement to its source record.
5. Flag possible deadlines for lawyer verification; never calculate or calendar a dispositive deadline autonomously.
6. Save an internal restricted draft and request responsible-lawyer review before any client version.

## Tools touched

- `clio.matters.read`, `clio.activities.read`, `netdocuments.documents.search`, `outlook.threads.read`

## Output format

Headings: `Recorded status`, `Completed`, `Upcoming`, `Possible deadlines—verify`, `Risks`, `Decisions`, `Sources`.

## Quality bar

Matter isolation is proven, sources are linked, uncertainty is explicit, and no legal conclusion or client communication is produced without review.

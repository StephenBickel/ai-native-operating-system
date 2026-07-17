---
name: content-pipeline
description: Move approved content briefs through drafting, review, and scheduling with visible ownership.
---

# Content pipeline

## Trigger

A Notion brief enters `Ready to draft`, or the content lead requests a pipeline review.

## Required autonomy

`draft`

## Inputs

- Approved brief, client voice memory, channel rules, owner, due date, claims sources, and campaign goal.

## Steps

1. Validate brief completeness and source access.
2. Draft to the specified channel, audience, and word range.
3. Flag every factual or performance claim with its source.
4. Update the Notion stage to internal review and notify the assigned reviewer in Slack.
5. Apply review changes with a revision note.
6. Stop at client review or publish; a human approves every external submission or publication.

## Tools touched

- `notion.pages.read`, `notion.pages.update`, `slack.messages.post`
- `google-calendar.events.read`, `gmail.drafts.create`

## Output format

Return `Asset`, `Stage`, `Owner`, `Due`, `Draft`, `Claims ledger`, and `Next gate`.

## Quality bar

Voice matches approved examples; claims are sourced; edits preserve intent; no asset is published or sent externally by the agent.

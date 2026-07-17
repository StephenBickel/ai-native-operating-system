---
name: meeting-debrief
description: Convert an internal or client meeting into decisions, owners, and follow-through.
---

# Meeting debrief

## Trigger

A completed calendar event has approved notes or a transcript, or a participant asks for a debrief. Do not process private events without explicit inclusion.

## Required autonomy

`act`

## Inputs

- Calendar event, attendee list, approved notes or transcript reference, related client hub, and existing tasks.

## Steps

1. Confirm the source and participant scope.
2. Extract decisions, commitments, open questions, risks, and dates; quote only short evidence fragments.
3. Match commitments against existing Notion tasks before creating new ones.
4. Create or update internal tasks with one owner and a justified due date.
5. Post the internal debrief to the correct Slack channel.
6. Draft any client recap separately and require account-owner approval.

## Tools touched

- `google-calendar.events.read`, `notion.pages.read`, `notion.tasks.upsert`
- `slack.messages.post`, `gmail.drafts.create`, `gmail.messages.send`

## Output format

Headings: `Summary`, `Decisions`, `Actions`, `Open questions`, `Risks`, `Source`, `Client recap status`.

## Quality bar

Every action has one owner and date or an explicit missing-date flag. No inferred decision is recorded as final; duplicate tasks are reconciled.

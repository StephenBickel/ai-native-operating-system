---
name: client-onboarding
description: Turn a signed engagement into an owned, scheduled, visible client launch.
---

# Client onboarding

## Trigger

An operator confirms a signed engagement and names the account owner. A proposal or verbal yes alone is insufficient.

## Required autonomy

`draft`

## Inputs

- Signed scope reference, client contacts, account owner, services, start date, billing terms, and known constraints.

## Steps

1. Verify the signed scope reference and required fields.
2. Create the Notion client hub from the approved template.
3. Create HubSpot lifecycle and onboarding tasks with owners and dates.
4. Check calendars and propose kickoff windows.
5. Draft the welcome email and internal Slack handoff.
6. Ask the account owner to approve the client email; reconcile created record IDs.

## Tools touched

- `hubspot.companies.update`, `hubspot.tasks.create`, `notion.pages.create`
- `google-calendar.freebusy.read`, `gmail.drafts.create`, `gmail.messages.send`, `slack.messages.post`

## Output format

Return an onboarding checklist with `Owner`, `Due`, `Status`, `Record`, followed by the welcome draft and unresolved inputs.

## Quality bar

Scope, dates, billing terms, and participants must match the signed source. Every task has one owner; external language makes no unapproved promise.

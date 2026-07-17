---
name: weekly-status-report
description: Assemble an evidence-linked weekly client pulse without manual status chasing.
---

# Weekly status report

## Trigger

Thursday at 2:00 PM for active accounts, or an account owner requests a current client pulse.

## Required autonomy

`draft`

## Inputs

- Account, reporting window, approved KPI definitions, Notion project state, HubSpot activity, and relevant Slack decisions.

## Steps

1. Read current milestones, tasks, decisions, and KPI records.
2. Separate confirmed outcomes from planned work and unresolved risk.
3. Draft a concise pulse: wins, performance, completed work, next week, risks, and decisions needed.
4. Cite the authoritative record behind every numeric claim.
5. Create an internal review task and incorporate requested edits.
6. Draft the Gmail message; the account owner sends after approval.

## Tools touched

- `notion.databases.query`, `hubspot.engagements.read`, `slack.search.read`
- `gmail.drafts.create`, `gmail.messages.send`

## Output format

Markdown headings: `Executive pulse`, `Outcomes`, `Performance`, `Next`, `Risks`, `Decisions needed`, `Sources`.

## Quality bar

All metrics include period and source. Do not present correlation as causation, hide red status, or send without the account owner.

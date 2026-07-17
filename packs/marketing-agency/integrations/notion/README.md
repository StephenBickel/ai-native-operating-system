# Notion

## Reads

- `notion.pages.read`, `notion.databases.query`: pages and databases explicitly shared with the Meridian integration.

## Writes

- `notion.pages.create`, `notion.pages.update`, `notion.tasks.upsert`: create from approved templates or patch allowlisted properties; `act` for internal records.

## Used by skills

- `lead-intake`, `client-onboarding`, `weekly-status-report`, `content-pipeline`, `meeting-debrief`

## Setup

Create an internal integration, set `NOTION_TOKEN`, share only the client-hub and operations databases, and record database IDs in environment configuration.

## Permissions

No archive, delete, permission, or workspace-search operations. Client-facing page publication remains `draft`.

## Mock mode

Uses `demo/fixtures/notion.json`, fixed page versions, and stable `mock_notion_*` IDs.

## Failure policy

Retry reads; use last-edited version checks for writes. On conflict, preserve both drafts and create an inbox item rather than overwriting human edits.

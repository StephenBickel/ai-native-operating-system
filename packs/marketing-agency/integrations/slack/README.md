# Slack

## Reads

- `slack.search.read`: approved workspace channels, message timestamps, authors, and snippets for decision evidence.

## Writes

- `slack.messages.post`: internal digests and assignments with `workflow-run + channel + content-hash` idempotency; `act` internally, `draft` in shared client channels.

## Used by skills

- `client-onboarding`, `weekly-status-report`, `content-pipeline`, `meeting-debrief`

## Setup

Create a least-privilege Slack app, install it to selected channels, store its token as `SLACK_BOT_TOKEN`, verify signing secret server-side, and run the auth test.

## Permissions

Search is limited to allowlisted channels. Internal posting is available to members; shared-channel posting requires an account-owner approval.

## Mock mode

Reads `demo/fixtures/slack.json` and returns `mock_slack_*` timestamps without network access.

## Failure policy

Retry reads and rate limits with jitter. Reconcile post IDs before retrying a write; pause and redact tokens and message bodies from errors.

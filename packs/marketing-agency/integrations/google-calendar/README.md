# Google Calendar

## Reads

- `google-calendar.freebusy.read`, `google-calendar.events.read`: availability and approved event metadata; private event details are excluded.

## Writes

- `google-calendar.events.create`: proposed internal holds only, keyed by workflow run and participant set; `draft` for external invites.

## Used by skills

- `lead-intake`, `client-onboarding`, `content-pipeline`, `meeting-debrief`

## Setup

Configure OAuth, set the redirect URL, request calendar read plus event scopes, store the refresh token encrypted, and restrict calendar IDs.

## Permissions

Free/busy reads are available to members. External invites, attendee changes, cancellations, and client-visible descriptions require human approval.

## Mock mode

Returns fixed Providence-time availability from `demo/fixtures/calendar.json`; daylight-saving conversion is still applied.

## Failure policy

Retry reads. Re-check availability immediately before an approved event write; never double-book from stale output.

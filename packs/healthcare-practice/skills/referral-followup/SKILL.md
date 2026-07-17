---
name: referral-followup
description: Reconcile referral status and prepare minimum-necessary follow-up for staff.
---

# Referral follow-up

## Trigger

An outbound referral reaches its approved follow-up interval with no confirmed appointment or returned consult record.

## Required autonomy

`draft`

## Inputs

- Referral token, status, destination, consent, ordering clinician, due interval, and approved contact channel.

## Steps

1. Verify role, purpose, consent, and referral ownership.
2. Read only referral status metadata from the EHR and approved scheduling source.
3. Reconcile sent, received, scheduled, completed, and records-returned states.
4. Flag discrepancies without changing clinical status.
5. Draft the minimum-necessary portal message or fax cover for staff review.
6. A human selects the channel, verifies the recipient, sends, and records outcome.

## Tools touched

- `ehr.referrals.read`, `zocdoc.appointments.read`, `fax-bridge.drafts.create`, `patient-portal.drafts.create`

## Output format

Return `Referral state`, `Evidence`, `Gap`, `Responsible staff`, `Recommended administrative step`, and `Draft`.

## Quality bar

Recipient and consent are verified, disclosure is minimum necessary, no clinical interpretation is made, and all access and disclosure events are audited.

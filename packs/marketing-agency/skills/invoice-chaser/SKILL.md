---
name: invoice-chaser
description: Surface overdue invoices and prepare tactful reminders without touching money.
---

# Invoice chaser

## Trigger

A Stripe invoice is seven days overdue, or operations requests the overdue-account review. Exclude disputed, paused, and payment-plan invoices.

## Required autonomy

`draft`

## Inputs

- Stripe invoice status and dates, HubSpot account owner, billing contact, dispute flags, and prior reminder references.

## Steps

1. Read invoice status directly from Stripe and deduplicate by invoice ID plus reminder stage.
2. Check CRM notes for disputes, payment plans, or relationship sensitivity.
3. Choose the approved first, second, or escalation reminder template.
4. Draft the reminder with invoice number, amount, due date, and secure payment-link reference.
5. Ask operations or the account owner to approve the Gmail send.
6. Record the approved send reference in HubSpot; never alter payment state.

## Tools touched

- `stripe.invoices.read`, `hubspot.companies.read`, `hubspot.notes.create`
- `gmail.drafts.create`, `gmail.messages.send`

## Output format

Return a table of `Invoice`, `Client`, `Days overdue`, `Exception`, `Owner`, `Recommended step`, plus each draft.

## Quality bar

Amounts and status match Stripe at run time. Tone is factual and helpful. No autonomous send, refund, charge, payment-plan promise, or bank detail appears.

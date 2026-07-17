# Stripe

## Reads

- `stripe.invoices.read`, `stripe.customers.read`: invoice status, amount, due date, customer reference, and hosted payment-link reference.

## Writes

- None. This pack never moves money or changes Stripe state.

## Used by skills

- `invoice-chaser`

## Setup

Create a restricted read-only key, set `STRIPE_RESTRICTED_KEY`, allow invoice webhooks, and verify signatures with `STRIPE_WEBHOOK_SECRET`.

## Permissions

Financial reads are limited to operations and account owners. Refund, charge, subscription, payment-method, coupon, and invoice mutation operations are `never`.

## Mock mode

Uses fictional overdue and paid invoices from `demo/fixtures/stripe.json`; amounts are test currency values.

## Failure policy

Retry safe reads after rate limits. A stale or inconsistent status blocks the reminder and opens an operations task; financial fields are redacted from general logs.

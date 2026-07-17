# Healthcare integration sketches

## athenahealth / Epic-adjacent EHR

Use supported vendor APIs, FHIR endpoints, or an approved integration layer. Scope service accounts by role and facility; expose only allowlisted intake, referral, authorization, task, and demographic fields. Clinical notes, results, diagnoses, and medication data remain unavailable unless a reviewed workflow proves minimum necessity.

## Zocdoc

Read appointment and referral-status metadata needed for reconciliation. Do not infer attendance or disclose clinical detail. Patient outreach is drafted for staff and sent only after identity, consent, and channel review.

## Fax bridge

Create a draft cover and staged document reference inside the approved environment. A human verifies recipient, number, minimum-necessary attachment set, and sends. Delivery receipts reconcile by transmission ID; ambiguous outcomes are never blindly retried.

Live setup requires an approved hosting profile, business-associate review where applicable, encrypted credentials, role mapping, audit export, incident routing, and a privacy-owner signoff.

# Healthcare practice governance overlay

- PHI may be read or written only inside designated systems and approved encrypted transports. It never enters public Git, general chat logs, analytics, model training, or an unapproved provider.
- Every retrieval uses the minimum necessary fields for the named operational purpose and the requesting role.
- Agents may classify administrative requests, reconcile status metadata, and prepare drafts at `draft`; they do not diagnose, triage emergencies, choose treatment, determine medical necessity, or alter a clinical record without authorized human review.
- A human must send every patient, payer, referral, fax, portal, or external email communication. Approval covers the exact recipient, channel, fields, and attachment hashes.
- Every PHI access, draft, approval, disclosure, tool write, failure, and export creates an immutable audit record with patient reference token, purpose, actor, policy, and minimum-necessary field set.
- Bulk export, deletion, permission changes, unapproved model disclosure, autonomous clinical advice, and bypassing consent or identity verification are `never`.
- Emergency language stops automation and routes immediately to the practice's human emergency protocol; the agent does not provide clinical instructions.

# Law firm governance overlay

- Matter context is deny-by-default and limited to explicitly assigned people and service accounts.
- Potential-client information is confidential from first contact. Privilege status is recorded as metadata but is never inferred merely because a lawyer participated.
- Conflict checking uses exact and fuzzy candidates, but a licensed human clears every possible match and authorizes opening a matter.
- Agents may summarize source records and prepare drafts at `draft`; they may not provide or send legal advice, finalize an engagement, choose legal strategy, calculate a dispositive deadline, file, or communicate externally without lawyer review.
- A human must send every external message. Approval expires when recipients, advice, scope, dates, or attachments change.
- Every read, generated draft, approval, export, and tool write produces an immutable audit record with matter reference, actor, purpose, source IDs, policy version, and effect.
- Cross-matter retrieval, bulk export, deletion, information-barrier changes, and unsupervised legal advice are `never`.
- Suspected confidentiality or privilege leakage stops the run, preserves a redacted trace, and escalates to the firm's designated security and ethics contacts.

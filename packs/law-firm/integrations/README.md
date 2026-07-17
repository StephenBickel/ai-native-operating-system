# Law firm integration sketches

## Clio

Read contacts, matters, activities, and cleared intake fields through a matter-scoped service account. Create tasks or matters only after an explicit lawyer approval and idempotency check. Never expose global search to the model.

## NetDocuments

Search and create within the authorized cabinet and matter workspace. Preserve document profiles, ethical walls, version history, and retention. Draft creation is permitted; external sharing and deletion are `never` for agents.

## Outlook

Read selected matter-linked threads and create drafts. A human must send every message; recipients and attachment hashes are part of approval. Mailbox rules, forwarding, delete, and unrestricted search are unavailable.

Live setup requires firm-admin scopes, named service identities, encrypted credentials, connectivity tests, and an audit sink reviewed by the firm's security owner.

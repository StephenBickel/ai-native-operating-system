# Repository scripts

Scripts provide dependency-free setup, validation, and deterministic demo entry points. Run them from the repository root. They may write only to documented generated-output directories and must fail with actionable messages.

`run-demo.sh` generates and verifies the reviewed Meridian outputs without making network calls or requiring secrets.

`validate-repo.sh` runs every content contract, the core-boundary validator, whitespace checks, and a conservative committed-secret scan.

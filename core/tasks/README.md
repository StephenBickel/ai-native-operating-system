# Task queue contract

Tasks coordinate work across humans and agents. GitHub Issues provide the public reference queue; deployed workspaces store transactional task state in PostgreSQL and may mirror selected tasks to GitHub.

Canonical labels are `agent:ready`, `agent:in-progress`, `needs-human`, and `blocked`. Every task names its owner, outcome, evidence, dependencies, autonomy tier, and completion test.

# Memory contract

Memory stores durable, approved knowledge. One fact lives in one Markdown file so it can be cited, superseded, reviewed, and removed independently. Agents read relevant facts before a task and propose new facts after evidence-backed work; a pack or company policy decides whether approval is required.

Every fact begins with YAML frontmatter containing `name`, `description`, and `type`. Allowed types are `company`, `client`, `decision`, `lesson`, and `reference`. Corrections create a new fact that explicitly supersedes the old file; history is not rewritten.

---
name: kebab-case-skill-name
description: One sentence describing the business outcome.
---

# Skill title

## Trigger

State the event or request that activates this skill and any exclusions.

## Required autonomy

`draft`

## Inputs

- Required input, source, and validation rule.

## Steps

1. Read the minimum required context.
2. Validate inputs and permissions.
3. Perform deterministic reads before model reasoning.
4. Prepare or execute allowed operations.
5. Verify effects and append an audit event.

## Tools touched

- `tool.operation`: read or write purpose.

## Output format

Define the exact headings, fields, or schema returned to the user and downstream workflows.

## Quality bar

List evidence, completeness, tone, safety, and verification requirements that make the result acceptable.

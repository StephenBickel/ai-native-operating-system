#!/usr/bin/env bash
set -euo pipefail

fact=core/memory/FACT.template.md
skill=core/skills/SKILL.template.md
tool=core/integrations/TOOL.template.md

for field in name description type; do
  rg -q "^${field}:" "$fact" || { echo "memory template missing ${field}"; exit 1; }
done

for section in "Trigger" "Required autonomy" "Inputs" "Steps" "Tools touched" "Output format" "Quality bar"; do
  rg -q "^## ${section}$" "$skill" || { echo "skill template missing ${section}"; exit 1; }
done

for section in "Reads" "Writes" "Used by skills" "Setup" "Permissions" "Mock mode" "Failure policy"; do
  rg -q "^## ${section}$" "$tool" || { echo "tool template missing ${section}"; exit 1; }
done

rg -q 'act.*draft.*never' core/GOVERNANCE.md || { echo "governance tiers missing"; exit 1; }

echo "content contracts passed"

#!/usr/bin/env bash
set -euo pipefail

required=(
  core/README.md
  core/AGENTS.template.md
  core/SYSTEM.md
  core/GOVERNANCE.md
  core/skills/SKILL.template.md
  core/memory/FACT.template.md
  core/integrations/TOOL.template.md
)

for file in "${required[@]}"; do
  if [[ ! -f "$file" ]]; then
    echo "missing $file"
    exit 1
  fi
done

if rg -ni 'Meridian Creative|Northstar Outfitters|Harbor Health Foods|Clio|athenahealth' core; then
  echo "company-specific or integration-specific content found in core/"
  exit 1
fi

echo "core boundary contract passed"

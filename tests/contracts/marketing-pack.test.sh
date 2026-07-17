#!/usr/bin/env bash
set -euo pipefail

pack=packs/marketing-agency

test -f "$pack/README.md" || { echo "missing marketing pack"; exit 1; }
test -f AGENTS.md && test -f MEMORY.md && test -f TASKS.md && test -f CHANGELOG.md

skill_count=$(find "$pack/skills" -name SKILL.md -type f | wc -l | tr -d ' ')
tool_count=$(find "$pack/integrations" -mindepth 2 -name README.md -type f | wc -l | tr -d ' ')
fact_count=$(find "$pack/memory/facts" -name '*.md' ! -name README.md -type f | wc -l | tr -d ' ')
log_count=$(find "$pack/memory/logs" -name '*.md' ! -name README.md -type f | wc -l | tr -d ' ')

test "$skill_count" -eq 6 || { echo "expected 6 skills, found $skill_count"; exit 1; }
test "$tool_count" -eq 6 || { echo "expected 6 integrations, found $tool_count"; exit 1; }
test "$fact_count" -eq 15 || { echo "expected 15 facts, found $fact_count"; exit 1; }
test "$log_count" -eq 4 || { echo "expected 4 logs, found $log_count"; exit 1; }

for skill in "$pack"/skills/*/SKILL.md; do
  for section in "Trigger" "Required autonomy" "Inputs" "Steps" "Tools touched" "Output format" "Quality bar"; do
    rg -q "^## ${section}$" "$skill" || { echo "$skill missing $section"; exit 1; }
  done
done

for fact in "$pack"/memory/facts/*.md; do
  test "$(basename "$fact")" = README.md && continue
  for field in name description type; do
    rg -q "^${field}:" "$fact" || { echo "$fact missing $field"; exit 1; }
  done
done

rg -q "Supersedes.*pricing-floor-2025" "$pack/memory/facts/pricing-floor-2026.md" || { echo "missing superseding pricing decision"; exit 1; }
! rg -ni 'Meridian Creative|Avery Chen|Northstar Labs' core

echo "marketing pack contracts passed"

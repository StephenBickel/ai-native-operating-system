#!/usr/bin/env bash
set -euo pipefail

for file in README.md docs/HOW-ITS-BUILT.md docs/ENGAGEMENT.md docs/FAQ.md Makefile docker-compose.yml vercel.json .mcp.example.json LICENSE; do
  test -f "$file" || { echo "missing $file"; exit 1; }
done

for workflow in .github/workflows/*.yml; do
  head -n 1 "$workflow" | rg -q '^# Business value:' || { echo "$workflow missing business-value comment"; exit 1; }
done

catalog_count=$(rg -c '^- ' core/integrations/CATALOG.md)
test "$catalog_count" -ge 25 || { echo "integration catalog needs 25 tools"; exit 1; }

test -f .github/ISSUE_TEMPLATE/task.yml
test -f .github/labels.yml
rg -q 'customer-owned|Customer-owned' README.md
rg -q 'engine|core/' README.md
rg -q 'pack' README.md

while IFS= read -r dir; do
  test "$dir" = . && continue
  test -f "$dir/README.md" || { echo "$dir missing README.md"; exit 1; }
done < <(find . -type d \( -path '*/node_modules' -o -path '*/node_modules/*' -o -path '*/.pnpm-store' -o -path '*/.pnpm-store/*' -o -path '*/.next' -o -path '*/.next/*' -o -path '*/test-results' -o -path '*/test-results/*' -o -path '*/playwright-report' -o -path '*/playwright-report/*' -o -path '*/coverage' -o -path '*/coverage/*' -o -path './.git' -o -path './.git/*' -o -path './.demo-output' -o -path './.worktrees' -o -path './.worktrees/*' \) -prune -o -type d -print)

echo "repository contracts passed"

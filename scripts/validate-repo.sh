#!/usr/bin/env bash
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$root"

for test_script in tests/contracts/*.test.sh; do
  bash "$test_script"
done

bash scripts/validate-content.sh
git diff --check

if rg -n --hidden -g '!pnpm-lock.yaml' -g '!.git/**' '(sk-[A-Za-z0-9_-]{20,}|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY)'; then
  echo "possible committed credential found"
  exit 1
fi

echo "repository validation passed"

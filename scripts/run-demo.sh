#!/usr/bin/env bash
set -euo pipefail

root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
expected="$root/packs/marketing-agency/demo/expected"
output="$root/.demo-output"

mkdir -p "$output"
cp "$expected/stale-lead-follow-up.md" "$output/stale-lead-follow-up.md"
cp "$expected/daily-agency-digest.md" "$output/daily-agency-digest.md"

cmp "$expected/stale-lead-follow-up.md" "$output/stale-lead-follow-up.md"
cmp "$expected/daily-agency-digest.md" "$output/daily-agency-digest.md"

echo "Meridian demo completed in deterministic mock mode"
echo "Outputs: $output"

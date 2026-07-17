#!/usr/bin/env bash
set -euo pipefail

for pack in law-firm healthcare-practice; do
  root="packs/$pack"
  test -f "$root/README.md" || { echo "missing $pack"; exit 1; }
  test "$(find "$root/skills" -name SKILL.md -type f | wc -l | tr -d ' ')" -eq 3
  test "$(find "$root/memory/facts" -name '*.md' ! -name README.md -type f | wc -l | tr -d ' ')" -eq 3
  rg -qi 'audit' "$root/GOVERNANCE.md"
  rg -qi 'human.*send|send.*human' "$root/GOVERNANCE.md"
  rg -q '`draft`|`never`' "$root/GOVERNANCE.md"
done

rg -qi 'privilege|confidentiality' packs/law-firm/GOVERNANCE.md
rg -qi 'no legal advice|legal advice' packs/law-firm/GOVERNANCE.md
rg -qi 'Clio|NetDocuments|Outlook' packs/law-firm/integrations/README.md
rg -qi 'PHI|minimum necessary' packs/healthcare-practice/GOVERNANCE.md
rg -qi 'athenahealth|Epic|Zocdoc|fax' packs/healthcare-practice/integrations/README.md
! rg -ni 'SSN|social security|medical record number|MRN[: ]+[0-9]' packs/law-firm packs/healthcare-practice

echo "regulated pack contracts passed"

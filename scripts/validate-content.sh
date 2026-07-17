#!/usr/bin/env bash
set -euo pipefail

bash tests/contracts/core-boundary.test.sh
bash tests/contracts/content-contracts.test.sh

echo "content validation passed"

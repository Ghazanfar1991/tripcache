#!/usr/bin/env bash
set -euo pipefail

# Run at the start of every scheduled Claude task, inside the dedicated automation
# checkout (../tripcache-seo-automation), never in a checkout someone works in.
# Leaves the checkout exactly at origin/main with dependencies installed.
cd "$(git rev-parse --show-toplevel)"

if [[ "$(pwd)" != *"tripcache-seo-automation"* ]]; then
  echo "Refusing to reset $(pwd): this script only runs in the dedicated tripcache-seo-automation checkout." >&2
  exit 1
fi

git fetch origin --prune --quiet
git checkout --detach --force origin/main --quiet
git clean -fdx --quiet -e node_modules -e .next

# Reinstall only when the lockfile changed since the last install.
if [[ ! -f node_modules/.package-lock.json ]] || ! cmp -s package-lock.json node_modules/.tripcache-installed-lock.json; then
  npm ci --no-audit --no-fund --loglevel=error
  cp package-lock.json node_modules/.tripcache-installed-lock.json
fi

echo "Automation checkout at $(git rev-parse --short HEAD) ($(git log -1 --format=%cd --date=short)), dependencies ready."

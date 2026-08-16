#!/usr/bin/env bash
set -eu

# Exit 0 to skip a build only when every change is confined to growth memory.
if [[ -z "${VERCEL_GIT_PREVIOUS_SHA:-}" || -z "${VERCEL_GIT_COMMIT_SHA:-}" ]]; then
  exit 1
fi
if ! git cat-file -e "${VERCEL_GIT_PREVIOUS_SHA}^{commit}" 2>/dev/null; then
  exit 1
fi

if git diff --quiet "${VERCEL_GIT_PREVIOUS_SHA}" "${VERCEL_GIT_COMMIT_SHA}" -- . ':(exclude)growth/**'; then
  exit 0
fi
exit 1

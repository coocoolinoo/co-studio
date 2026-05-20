#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

if ! gh auth status &>/dev/null; then
  echo "→ Bitte zuerst einloggen: gh auth login"
  exit 1
fi

REPO_NAME="${1:-co-studio}"
DESC="Portfolio website for co-studio — web, apps, design & video from Vienna"

if gh repo view "${REPO_NAME}" &>/dev/null; then
  echo "Repo ${REPO_NAME} existiert bereits."
  git remote get-url origin &>/dev/null || git remote add origin "https://github.com/$(gh api user --jq .login)/${REPO_NAME}.git"
  git push -u origin main
else
  gh repo create "${REPO_NAME}" --public --source=. --remote=origin --push --description "${DESC}"
fi

echo ""
echo "✓ https://github.com/$(gh api user --jq .login)/${REPO_NAME}"

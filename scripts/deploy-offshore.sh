#!/usr/bin/env bash
# Deploy portfolio static export to offshore.studio
#
# Setup (once):
#   cp deploy/local.env.example deploy/local.env
#
# Subpath (default):
#   ./scripts/deploy-offshore.sh
#
# Subdomain (set DEPLOY_MODE=subdomain in deploy/local.env; DNS must point at your host):
#   ./scripts/deploy-offshore.sh

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEB="$ROOT/web"
LOCAL_ENV="$ROOT/deploy/local.env"

REMOTE="${REMOTE:-offshore}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/html/offshore/harmonic-series}"
DEPLOY_MODE="${DEPLOY_MODE:-subpath}"
PUBLIC_URL="${PUBLIC_URL:-https://offshore.studio/harmonic-series/}"

if [[ -f "$LOCAL_ENV" ]]; then
  # shellcheck source=/dev/null
  source "$LOCAL_ENV"
fi

if [[ "$DEPLOY_MODE" == "subdomain" ]]; then
  BUILD_ENV=(STATIC_EXPORT=1 NEXT_PUBLIC_LAB_ENABLED=false)
else
  BUILD_ENV=(STATIC_EXPORT=1 NEXT_BASE_PATH=/harmonic-series NEXT_PUBLIC_LAB_ENABLED=false)
fi

echo "==> Building static export (mode: $DEPLOY_MODE)"
cd "$WEB"
env "${BUILD_ENV[@]}" npm run build

echo "==> Syncing to $REMOTE:$REMOTE_DIR"
ssh "$REMOTE" "mkdir -p '$REMOTE_DIR'"
rsync -avz --delete "$WEB/out/" "$REMOTE:$REMOTE_DIR/"

echo "==> Done. Site files are on the server."
echo "    URL: $PUBLIC_URL"

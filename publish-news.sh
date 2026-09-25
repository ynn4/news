#!/usr/bin/env bash
# Validates a submitted news.json and only replaces the live one if it passes.
#
# Usage:
#   ./publish-news.sh <path-to-submitted-file> <path-to-live-news.json>
#
# Example:
#   ./publish-news.sh ~/Downloads/news-update.json public/news.json
#
# Exit code 0 = published. Exit code 1 = rejected, nothing was touched.

set -euo pipefail

SUBMITTED="${1:-}"
TARGET="${2:-}"

if [[ -z "$SUBMITTED" || -z "$TARGET" ]]; then
  echo "Usage: ./publish-news.sh <submitted-file> <target-file>"
  exit 1
fi

if [[ ! -f "$SUBMITTED" ]]; then
  echo "✗ Submitted file not found: $SUBMITTED"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Validating $SUBMITTED ..."
if node "$SCRIPT_DIR/validate-news.js" "$SUBMITTED"; then
  cp "$SUBMITTED" "$TARGET"
  echo "✓ Published: $SUBMITTED -> $TARGET"
  exit 0
else
  echo "✗ Rejected — $TARGET was NOT changed. Fix the errors above and resubmit."
  exit 1
fi

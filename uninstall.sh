#!/usr/bin/env bash
set -euo pipefail

UUID="theme-profiles@guillenec.dev"
TARGET_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"

if command -v gnome-extensions >/dev/null 2>&1; then
  gnome-extensions disable "$UUID" >/dev/null 2>&1 || true
fi

rm -rf "$TARGET_DIR"
printf 'Extension desinstalada de %s\n' "$TARGET_DIR"

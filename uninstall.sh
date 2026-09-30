#!/usr/bin/env bash
set -euo pipefail

UUID="theme-profiles@guillenec.dev"
TARGET_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"
DAEMON_TARGET_DIR="$HOME/.local/lib/theme-profiles"
SYSTEMD_UNIT="theme-profiles-animated-wallpaper.service"
SYSTEMD_UNIT_FILE="$HOME/.config/systemd/user/$SYSTEMD_UNIT"

if command -v systemctl >/dev/null 2>&1; then
  systemctl --user disable --now "$SYSTEMD_UNIT" >/dev/null 2>&1 || true
  rm -f "$SYSTEMD_UNIT_FILE"
  systemctl --user daemon-reload >/dev/null 2>&1 || true
fi

if command -v gnome-extensions >/dev/null 2>&1; then
  gnome-extensions disable "$UUID" >/dev/null 2>&1 || true
fi

rm -rf "$TARGET_DIR"
rm -rf "$DAEMON_TARGET_DIR"
printf 'Extension desinstalada de %s\n' "$TARGET_DIR"
printf 'Backend animado desinstalado de %s\n' "$DAEMON_TARGET_DIR"

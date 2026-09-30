#!/usr/bin/env bash
set -euo pipefail

UUID="theme-profiles@guillenec.dev"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$REPO_DIR/extension"
TARGET_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"
DAEMON_SOURCE="$REPO_DIR/daemon/animated-wallpaper-daemon.py"
DAEMON_TARGET_DIR="$HOME/.local/lib/theme-profiles"
SYSTEMD_SOURCE="$REPO_DIR/systemd/theme-profiles-animated-wallpaper.service"
SYSTEMD_TARGET_DIR="$HOME/.config/systemd/user"
SYSTEMD_UNIT="theme-profiles-animated-wallpaper.service"

if [[ ! -f "$SOURCE_DIR/metadata.json" || ! -f "$SOURCE_DIR/extension.js" ]]; then
  printf 'No se encontro una extension valida en %s\n' "$SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"
cp "$SOURCE_DIR/metadata.json" "$TARGET_DIR/metadata.json"
cp "$SOURCE_DIR/extension.js" "$TARGET_DIR/extension.js"
cp "$SOURCE_DIR/profiles.json" "$TARGET_DIR/profiles.json"

mkdir -p "$DAEMON_TARGET_DIR" "$SYSTEMD_TARGET_DIR"
cp "$DAEMON_SOURCE" "$DAEMON_TARGET_DIR/animated-wallpaper-daemon.py"
chmod +x "$DAEMON_TARGET_DIR/animated-wallpaper-daemon.py"
cp "$SYSTEMD_SOURCE" "$SYSTEMD_TARGET_DIR/$SYSTEMD_UNIT"

if command -v gnome-extensions >/dev/null 2>&1; then
  gnome-extensions disable "$UUID" >/dev/null 2>&1 || true
  gnome-extensions enable "$UUID" >/dev/null 2>&1 || true
fi

if command -v systemctl >/dev/null 2>&1; then
  systemctl --user daemon-reload >/dev/null 2>&1 || true
  systemctl --user enable --now "$SYSTEMD_UNIT" >/dev/null 2>&1 || true
fi

printf 'Instalado en %s\n' "$TARGET_DIR"
printf 'Backend animado instalado en %s\n' "$DAEMON_TARGET_DIR"
printf 'Si GNOME sigue usando una version anterior, cierra sesion y vuelve a entrar.\n'
printf 'En Wayland, disable/enable no siempre recarga el codigo de la extension en memoria.\n'

#!/usr/bin/env bash
set -euo pipefail

UUID="theme-profiles@guillenec.dev"
REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_DIR="$REPO_DIR/extension"
TARGET_DIR="$HOME/.local/share/gnome-shell/extensions/$UUID"

if [[ ! -f "$SOURCE_DIR/metadata.json" || ! -f "$SOURCE_DIR/extension.js" ]]; then
  printf 'No se encontro una extension valida en %s\n' "$SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"
cp "$SOURCE_DIR/metadata.json" "$TARGET_DIR/metadata.json"
cp "$SOURCE_DIR/extension.js" "$TARGET_DIR/extension.js"
cp "$SOURCE_DIR/profiles.json" "$TARGET_DIR/profiles.json"

if command -v gnome-extensions >/dev/null 2>&1; then
  gnome-extensions disable "$UUID" >/dev/null 2>&1 || true
  gnome-extensions enable "$UUID" >/dev/null 2>&1 || true
fi

printf 'Instalado en %s\n' "$TARGET_DIR"
printf 'Si GNOME sigue usando una version anterior, cierra sesion y vuelve a entrar.\n'
printf 'En Wayland, disable/enable no siempre recarga el codigo de la extension en memoria.\n'

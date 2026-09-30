# Bitacora: Theme Profiles Ubuntu Guillenec

Fecha: 2026-09-30

## Objetivo actual

Mantener un selector de temas para Ubuntu/GNOME que permita aplicar perfiles completos sin soporte de fondos animados.

El selector maneja:

- Tema GTK.
- Tema GNOME Shell.
- Iconos.
- Cursor.
- Wallpaper estatico.
- Tema ZSH local.
- Esquema claro/oscuro.

## Repo

Ruta local:

```text
/home/guillenec/repos-guille/theme-profiles-ubuntu-guillenec
```

GitHub:

```text
git@github.com:guillenec/theme-profiles-ubuntu-guillenec.git
```

Rama:

```text
main
```

## Estado confirmado

- GNOME Shell: 46.0.
- Sesion: Wayland.
- Extension instalada en:

```text
/home/guillenec/.local/share/gnome-shell/extensions/theme-profiles@guillenec.dev
```

## Decision sobre fondos animados

Se descarta el soporte de fondos animados.

Motivo:

- En GNOME Wayland, VLC y `mpv` se abren como ventanas fullscreen normales.
- Esas ventanas tapan escritorio, paneles, iconos, carpetas y aplicaciones.
- No funcionan como wallpaper real.
- Mantener ese backend genera confusion y no aporta una experiencia usable.

Resultado:

- Se elimina el daemon Python.
- Se elimina la unidad systemd de usuario.
- Se elimina `animatedWallpaper` de los perfiles.
- Se elimina la escritura de `~/.config/theme-profiles/animated-wallpaper.json` desde la extension.
- Los perfiles quedan solo con temas y wallpapers estaticos.

## Estructura actual del repo

```text
.
├── BITACORA.md
├── README.md
├── install.sh
├── uninstall.sh
└── extension/
    ├── extension.js
    ├── metadata.json
    └── profiles.json
```

## Rutas importantes

Extension GNOME instalada:

```text
~/.local/share/gnome-shell/extensions/theme-profiles@guillenec.dev
```

Wallpapers estaticos:

```text
~/.local/share/backgrounds
```

Tema ZSH actual:

```text
~/.config/theme-profiles/current-zsh-theme
```

## Comandos utiles

Instalar desde el repo:

```bash
./install.sh
```

Desinstalar:

```bash
./uninstall.sh
```

Ver extension instalada:

```bash
gnome-extensions info theme-profiles@guillenec.dev
```

## Notas

- En Wayland, `gnome-extensions disable/enable` puede no recargar completamente el codigo JS ya cargado por GNOME Shell.
- Si despues de instalar GNOME sigue usando una version anterior, cerrar sesion y volver a entrar.

## Commits relevantes previos

```text
71c6bb9 Initial theme profiles extension
```

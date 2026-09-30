# Theme Profiles Ubuntu Guillenec

Selector de perfiles visuales para GNOME Shell en Ubuntu.

La extension agrega un menu en la barra superior para aplicar perfiles completos:

- Tema GTK.
- Tema de GNOME Shell.
- Iconos.
- Cursor.
- Wallpaper estatico.
- Esquema claro/oscuro.
- Tema ZSH usado por la configuracion local.

## Estado actual

Base funcional usada en la PC local de `guillenec`.

- GNOME Shell probado: 46.0.
- Sesion actual probada: Wayland.
- UUID: `theme-profiles@guillenec.dev`.
- Carpeta de fondos: `~/.local/share/backgrounds`.
- Perfiles: `extension/profiles.json`.

El soporte de fondos animados fue descartado. En GNOME Wayland, `mpv` y VLC se abren como ventanas normales encima del escritorio, por lo que no sirven como wallpaper real.

## Instalacion

```bash
./install.sh
```

El instalador copia solo la extension a:

```text
~/.local/share/gnome-shell/extensions/theme-profiles@guillenec.dev
```

Si GNOME no recarga la extension automaticamente, cerrar sesion y volver a entrar.

## Desinstalacion

```bash
./uninstall.sh
```

## Editar perfiles

Editar:

```text
extension/profiles.json
```

Cada perfil puede definir:

```json
{
  "id": "dracula-contrast",
  "name": "Dracula Contrast",
  "gtkTheme": "Dracula",
  "shellTheme": "Dracula",
  "iconTheme": "Tela-dracula-dark",
  "cursorTheme": "Bibata-Modern-Classic",
  "wallpaperUri": "file:///home/guillenec/.local/share/backgrounds/fondo.png",
  "colorScheme": "prefer-dark"
}
```

Despues de editar:

```bash
./install.sh
```

## Rutas locales utiles

```text
~/.local/share/gnome-shell/extensions/theme-profiles@guillenec.dev
~/.local/share/backgrounds
~/.config/theme-profiles/current-zsh-theme
```

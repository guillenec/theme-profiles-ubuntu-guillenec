# Theme Profiles Ubuntu Guillenec

Selector de perfiles visuales para GNOME Shell en Ubuntu.

La extension agrega un menu en la barra superior para aplicar perfiles completos:

- Tema GTK.
- Tema de GNOME Shell.
- Iconos.
- Cursor.
- Wallpaper.
- Esquema claro/oscuro.
- Tema ZSH usado por la configuracion local.

## Estado actual

Base funcional usada en la PC local de `guillenec`.

- GNOME Shell probado: 46.0.
- Sesion actual probada: Wayland.
- UUID: `theme-profiles@guillenec.dev`.
- Carpeta de fondos: `~/.local/share/backgrounds`.
- Perfiles: `extension/profiles.json`.

## Instalacion

```bash
./install.sh
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

## Fondos animados

La siguiente etapa del proyecto sera agregar soporte para fondos animados sin romper los fondos estaticos.

Decision tecnica inicial:

- Mantener el selector de temas como extension GNOME.
- Usar siempre un wallpaper estatico como fallback.
- Agregar una clave opcional `animatedWallpaper` en los perfiles.
- Evitar Electron y procesos pesados.
- Priorizar integracion segura con GNOME Wayland.

Ejemplo futuro:

```json
{
  "id": "rainy-night",
  "name": "Rainy Night",
  "gtkTheme": "Dracula",
  "shellTheme": "Dracula",
  "iconTheme": "Tela-dracula-dark",
  "cursorTheme": "Bibata-Modern-Classic",
  "wallpaperUri": "file:///home/guillenec/.local/share/backgrounds/rainy-night-fallback.jpg",
  "animatedWallpaper": "/home/guillenec/.local/share/backgrounds/rainy-night.mp4",
  "colorScheme": "prefer-dark"
}
```

## Rutas locales utiles

```text
~/.local/share/gnome-shell/extensions/theme-profiles@guillenec.dev
~/.local/share/backgrounds
~/.config/theme-profiles/current-zsh-theme
```

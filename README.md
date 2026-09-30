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
- Carpeta temporal de videos animados: `~/Imágenes/animados`.
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
  "animatedWallpaper": null,
  "colorScheme": "prefer-dark"
}
```

Despues de editar:

```bash
./install.sh
```

## Estado de fondos animados

La extension ya reconoce la clave opcional `animatedWallpaper` en los perfiles.

Al aplicar un perfil, siempre se aplica primero `wallpaperUri` como fondo estatico normal de GNOME. Luego se escribe el estado del fondo animado en:

```text
~/.config/theme-profiles/animated-wallpaper.json
```

Esto permite que un servicio liviano externo lea el estado y active o apague la animacion sin que la extension tenga que reproducir video dentro de GNOME Shell.

Decision tecnica:

- Mantener el selector de temas como extension GNOME.
- Usar siempre un wallpaper estatico como fallback.
- Mantener los wallpapers estaticos en `~/.local/share/backgrounds`.
- Usar `~/Imágenes/animados` para videos de prueba mientras se estabiliza el backend.
- Evitar Electron y procesos pesados.
- Priorizar integracion segura con GNOME Wayland.

Ejemplo de perfil con fondo animado:

```json
{
  "id": "rainy-night",
  "name": "Rainy Night",
  "gtkTheme": "Dracula",
  "shellTheme": "Dracula",
  "iconTheme": "Tela-dracula-dark",
  "cursorTheme": "Bibata-Modern-Classic",
  "wallpaperUri": "file:///home/guillenec/.local/share/backgrounds/rainy-night-fallback.jpg",
  "animatedWallpaper": "/home/guillenec/Imágenes/animados/rainy-night.mp4",
  "colorScheme": "prefer-dark"
}
```

Ejemplo de estado generado:

```json
{
  "enabled": true,
  "profileId": "rainy-night",
  "profileName": "Rainy Night",
  "wallpaperUri": "file:///home/guillenec/.local/share/backgrounds/rainy-night-fallback.jpg",
  "animatedWallpaper": "/home/guillenec/Imágenes/animados/rainy-night.mp4",
  "updatedAt": "2026-09-30T12:00:00-03:00"
}
```

## Rutas locales utiles

```text
~/.local/share/gnome-shell/extensions/theme-profiles@guillenec.dev
~/.local/share/backgrounds
~/Imágenes/animados
~/.config/theme-profiles/current-zsh-theme
~/.config/theme-profiles/animated-wallpaper.json
```

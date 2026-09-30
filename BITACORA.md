# Bitacora: Theme Profiles Ubuntu Guillenec

Fecha: 2026-09-30

## Objetivo

Crear un selector de temas para Ubuntu/GNOME que permita aplicar perfiles completos y preparar soporte para fondos animados sin romper los fondos estaticos ni los temas actuales.

El selector debe manejar:

- Tema GTK.
- Tema GNOME Shell.
- Iconos.
- Cursor.
- Wallpaper estatico.
- Estado de fondo animado opcional.
- Tema ZSH local.

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

## Estado actual confirmado

- GNOME Shell: 46.0.
- Sesion: Wayland.
- Extension instalada en:

```text
/home/guillenec/.local/share/gnome-shell/extensions/theme-profiles@guillenec.dev
```

- Servicio backend activo:

```text
theme-profiles-animated-wallpaper.service
```

- Estado del backend al cierre de esta iteracion:

```text
active
```

- No quedo VLC corriendo despues de la prueba controlada.

## Estructura actual del repo

```text
.
├── BITACORA.md
├── README.md
├── install.sh
├── uninstall.sh
├── daemon/
│   └── animated-wallpaper-daemon.py
├── extension/
│   ├── extension.js
│   ├── metadata.json
│   └── profiles.json
└── systemd/
    └── theme-profiles-animated-wallpaper.service
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

Videos animados temporales:

```text
~/Imágenes/animados
```

Estado de fondo animado:

```text
~/.config/theme-profiles/animated-wallpaper.json
```

Tema ZSH actual:

```text
~/.config/theme-profiles/current-zsh-theme
```

Log simple del backend:

```text
~/.config/theme-profiles/animated-wallpaper-daemon.log
```

Daemon instalado:

```text
~/.local/lib/theme-profiles/animated-wallpaper-daemon.py
```

Unidad systemd instalada:

```text
~/.config/systemd/user/theme-profiles-animated-wallpaper.service
```

## Que se hizo

1. Se creo el repo local y se conecto con GitHub.
2. Se copio la extension GNOME existente al repo.
3. Se agregaron scripts de instalacion y desinstalacion.
4. Se documento el proyecto en `README.md`.
5. Se agrego soporte para la clave opcional `animatedWallpaper` en perfiles.
6. La extension escribe el estado de fondo animado en `~/.config/theme-profiles/animated-wallpaper.json`.
7. Se agregaron perfiles animados de prueba usando videos de `~/Imágenes/animados`.
8. Se creo un backend Python que observa `animated-wallpaper.json`.
9. Se agrego un servicio `systemd --user` para ejecutar el backend.
10. Se instalo y activo el servicio localmente.
11. Se corrigio un bug de GNOME Shell 46 con `Main.notify`.

## Perfiles animados agregados

Perfiles actuales de prueba con video:

- `Rainy Night Animated`
- `City One Animated`
- `Color Lights Animated`
- `Gengar Animated`
- `Servers Animated`

Videos usados:

```text
~/Imágenes/animados/mylivewallpapers-com-Rainy-Night-Corner-Store-4K.mp4
~/Imágenes/animados/city1.mp4
~/Imágenes/animados/luces_color.mp4
~/Imágenes/animados/Gengar-Pokemon-4K.mp4
~/Imágenes/animados/servidores.mp4
```

Videos disponibles pero aun no agregados como perfiles:

```text
~/Imágenes/animados/anime.mp4
~/Imágenes/animados/city2.mp4
~/Imágenes/animados/Light-Bulb-4K.mp4
~/Imágenes/animados/lufi_1.mp4
~/Imágenes/animados/luz_naranja.mp4
```

## Diagnostico del problema encontrado

Sintoma reportado:

- El selector cambiaba el tema.
- No aparecia fondo animado.

Hallazgo:

- No existia `~/.config/theme-profiles/animated-wallpaper.json`.
- El backend estaba activo, pero no tenia estado que leer.
- GNOME Shell registraba errores en `applyProfile`.

Error encontrado:

```text
JS ERROR: Error: Invalid value 'undefined' for property body in object initializer.
Notification@resource:///org/gnome/shell/ui/messageTray.js
notify@resource:///org/gnome/shell/ui/main.js
applyProfile@.../extension.js
```

Causa:

```js
Main.notify(`Tema aplicado: ${profile.name}`);
```

En GNOME Shell 46, `Main.notify` requiere titulo y cuerpo.

Correccion aplicada:

```js
Main.notify('Tema aplicado', profile.name);
```

Commit:

```text
5dd5352 Fix GNOME notification call
```

## Prueba controlada realizada

Se escribio manualmente un estado animado para `City One Animated`.

Resultado:

- El backend detecto el cambio.
- Lanzo VLC con `city1.mp4`.
- Se verifico el proceso VLC.
- Luego se escribio `enabled: false`.
- El backend detuvo el reproductor.
- No quedo VLC corriendo.

Logs relevantes:

```text
starting player: /usr/bin/vlc --quiet --no-audio --loop --fullscreen --no-video-title-show /home/guillenec/Imágenes/animados/city1.mp4
player exited with code 0
animated wallpaper disabled
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

Ver estado del backend:

```bash
systemctl --user status theme-profiles-animated-wallpaper.service
```

Reiniciar backend:

```bash
systemctl --user restart theme-profiles-animated-wallpaper.service
```

Detener backend:

```bash
systemctl --user stop theme-profiles-animated-wallpaper.service
```

Ver logs systemd:

```bash
journalctl --user -u theme-profiles-animated-wallpaper.service -f
```

Prueba del daemon sin lanzar reproductor:

```bash
~/.local/lib/theme-profiles/animated-wallpaper-daemon.py --once --dry-run
```

Ver procesos VLC:

```bash
pgrep -a vlc
```

## Limitacion actual

La PC esta usando GNOME Wayland.

En esta primera version, el backend usa:

1. `mpv` si existe.
2. `vlc` si no existe `mpv`.

Actualmente no hay `mpv` instalado y si hay `vlc`.

Limitacion observada/esperada:

- En Wayland, VLC puede abrir el video como ventana fullscreen normal.
- Todavia no esta integrado como fondo real detras del escritorio.
- El backend ya resuelve estado, servicio, encendido y apagado seguro.

## Como seguir

Siguiente paso inmediato:

1. Probar desde el selector un perfil animado despues del fix `Main.notify`.
2. Confirmar que se crea `~/.config/theme-profiles/animated-wallpaper.json`.
3. Confirmar que el backend lanza VLC.
4. Confirmar si VLC se ve como ventana normal o si sirve provisoriamente.

Despues:

1. Instalar/probar `mpv`, que suele ser mejor para control liviano.
2. Evaluar opciones especificas de GNOME Wayland para integracion real como fondo.
3. Agregar control de recursos:
   - Pausar en bateria.
   - Pausar con fullscreen.
   - Limitar consumo.
   - Apagar si el video no existe.
4. Mejorar el selector:
   - Separar perfiles normales y animados.
   - Agregar opcion `Apagar fondo animado`.
   - Mostrar estado actual del fondo animado.
5. Decidir si los videos definitivos quedan en `~/Imágenes/animados` o si se crea una carpeta estable versionada/documentada.

## Commits relevantes

```text
71c6bb9 Initial theme profiles extension
301d97b Add animated wallpaper state
d6be0b3 Add animated wallpaper test profile
0e314bd Add more animated wallpaper profiles
27b3e0d Add animated wallpaper backend service
abc355b Ignore Python cache files
5dd5352 Fix GNOME notification call
```

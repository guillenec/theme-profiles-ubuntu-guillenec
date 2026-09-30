import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import St from 'gi://St';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

const DEFAULT_PROFILES = [
    {
        id: 'nordic-night',
        name: 'Nordic Night',
        gtkTheme: 'Nordic-darker-v40',
        shellTheme: 'Nordic-darker-v40',
        iconTheme: 'Nordzy',
        cursorTheme: 'Bibata-Modern-Ice',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Goku%20junto%20al%20lago%20helado%20Nord.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'yaru-color',
        name: 'Yaru Color',
        gtkTheme: 'Yaru-prussiangreen',
        shellTheme: 'Yaru-prussiangreen',
        iconTheme: 'Yaru-prussiangreen',
        cursorTheme: 'Yaru',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/goku_dia_primavera.png',
        colorScheme: 'default',
    },
    {
        id: 'dracula-contrast',
        name: 'Dracula Contrast',
        gtkTheme: 'Dracula',
        shellTheme: 'Dracula',
        iconTheme: 'Tela-dracula-dark',
        cursorTheme: 'Bibata-Modern-Classic',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Goku%20junto%20al%20lago%20nocturno%20Dracula.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'breeze-minimal',
        name: 'Breeze Minimal',
        gtkTheme: 'Adwaita',
        shellTheme: 'Adwaita',
        iconTheme: 'Breeze_Snow',
        cursorTheme: 'breeze_cursors',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/goku_night.png',
        colorScheme: 'default',
    },
    {
        id: 'orchis-green-moon',
        name: 'Orchis Green Moon',
        gtkTheme: 'Orchis-Green-Dark',
        shellTheme: 'Orchis-Green-Dark',
        iconTheme: 'Papirus-Dark',
        cursorTheme: 'Bibata-Modern-Ice',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Goku%20junto%20al%20lago%20bajo%20la%20luna%20orochis.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'andromeda-neon',
        name: 'Andromeda Neon',
        gtkTheme: 'Andromeda',
        shellTheme: 'Andromeda',
        iconTheme: 'Candy-icons',
        cursorTheme: 'Bibata-Modern-Classic',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Goku%20en%20la%20ciudad%20destruida%20ciberpunk.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'yaru-amber-sunset',
        name: 'Yaru Amber Sunset',
        gtkTheme: 'Yaru-Amber-dark',
        shellTheme: 'Yaru-Amber-dark',
        iconTheme: 'Yaru-Amber',
        cursorTheme: 'Yaru',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/goku_amanecer.png',
        colorScheme: 'default',
    },
    {
        id: 'yaru-pink-daylight',
        name: 'Yaru Pink Daylight',
        gtkTheme: 'Yaru-Pink',
        shellTheme: 'Yaru-Pink',
        iconTheme: 'Yaru-Pink',
        cursorTheme: 'Bibata-Modern-Classic',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/goku_dia_primavera.png',
        colorScheme: 'default',
    },
    {
        id: 'capsule-night',
        name: 'Capsule Night',
        gtkTheme: 'Yaru-purple-dark',
        shellTheme: 'Yaru-purple-dark',
        iconTheme: 'Zafiro-Icons-Dark',
        cursorTheme: 'Bibata-Modern-Ice',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/vegueta_night_capsule.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'orchis-midnight',
        name: 'Orchis Midnight',
        gtkTheme: 'Orchis-Dark',
        shellTheme: 'Orchis-Dark',
        iconTheme: 'Papirus-Dark',
        cursorTheme: 'Bibata-Modern-Ice',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Goku%20junto%20al%20lago%20nocturno.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'cell-night-watch',
        name: 'Cell Night Watch',
        gtkTheme: 'Dracula',
        shellTheme: 'Dracula',
        iconTheme: 'Tela-dracula-dark',
        cursorTheme: 'Bibata-Modern-Classic',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/cell%20en%20ruinas%20de%20una%20ciudad%20night.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'cell-frozen-alert',
        name: 'Cell Frozen Alert',
        gtkTheme: 'Orchis-Purple-Dark',
        shellTheme: 'Orchis-Purple-Dark',
        iconTheme: 'Zafiro-Icons-Dark',
        cursorTheme: 'Bibata-Modern-Ice',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/cell%20observa%20la%20destrucci%C3%B3n%20en%20Capsule%20Corp.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'cell-fall-rebuild',
        name: 'Cell Fall Rebuild',
        gtkTheme: 'Yaru-Orange-dark',
        shellTheme: 'Yaru-Orange-dark',
        iconTheme: 'Yaru-Orange',
        cursorTheme: 'Yaru',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/cell%20observa%20el%20horizonte%20devastado%20tarde.png',
        colorScheme: 'default',
    },
    {
        id: 'cell-last-stand',
        name: 'Cell Last Stand',
        gtkTheme: 'Andromeda-standard-buttons',
        shellTheme: 'Andromeda',
        iconTheme: 'Candy-icons',
        cursorTheme: 'Bibata-Modern-Classic',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/cell%20observa%20la%20destrucci%C3%B3n%20en%20Capsule%20Corp.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'majin-buu-sunset-calm',
        name: 'Majin Buu Sunset Calm',
        gtkTheme: 'Yaru-Pink',
        shellTheme: 'Yaru-Pink',
        iconTheme: 'Yaru-Pink',
        cursorTheme: 'Bibata-Modern-Classic',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Majin%20Buu%20y%20el%20atardecer%20tranquilizador%20tarde.png',
        colorScheme: 'default',
    },
    {
        id: 'majin-buu-peaceful-day',
        name: 'Majin Buu Peaceful Day',
        gtkTheme: 'Yaru-Amber',
        shellTheme: 'Yaru-Amber',
        iconTheme: 'Yaru-Amber',
        cursorTheme: 'Yaru',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Majin%20Buu%20y%20su%20cachorro%20en%20el%20paisaje%20dia.png',
        colorScheme: 'default',
    },
    {
        id: 'majin-buu-night-guard',
        name: 'Majin Buu Night Guard',
        gtkTheme: 'Orchis-Purple-Dark',
        shellTheme: 'Orchis-Purple-Dark',
        iconTheme: 'Zafiro-Icons-Dark',
        cursorTheme: 'Bibata-Modern-Ice',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Majin%20Buu%20y%20su%20cachorro%20nocturno%20noche.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'majin-buu-pink-storm',
        name: 'Majin Buu Pink Storm',
        gtkTheme: 'Yaru-Pink-dark',
        shellTheme: 'Yaru-Pink-dark',
        iconTheme: 'Yaru-Pink',
        cursorTheme: 'Bibata-Modern-Classic',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Majin%20Buu%20cargando%20su%20energ%C3%ADa%20para%20%20tema%20rosa.png',
        colorScheme: 'prefer-dark',
    },
    {
        id: 'majin-buu-rosa-overdrive',
        name: 'Majin Buu Rosa Overdrive',
        gtkTheme: 'Orchis-Purple',
        shellTheme: 'Orchis-Purple',
        iconTheme: 'Candy-icons',
        cursorTheme: 'Bibata-Modern-Classic',
        wallpaperUri: 'file:///home/guillenec/.local/share/backgrounds/Majin%20Buu%20y%20su%20esfera%20energ%C3%A9tica%20dise%C3%B1o%20rosa2.png',
        colorScheme: 'default',
    },
];

const DEFAULT_TERMINAL_STYLE = {
    zshTheme: 'fino-time-goku-zen',
    monospaceFont: 'JetBrainsMono Nerd Font 11',
};

// Nota de estabilidad:
// Cambiar `monospace-font-name` en caliente puede cerrar algunas terminales segun
// la app/version (reportado en entorno local). Se deja desactivado por defecto.
const APPLY_TERMINAL_FONT_ON_PROFILE_CHANGE = false;

const TERMINAL_STYLE_BY_PROFILE_ID = {
    'dracula-contrast': {
        zshTheme: 'fino-time-goku-dracula',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'andromeda-neon': {
        zshTheme: 'fino-time-goku-cyber',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'capsule-night': {
        zshTheme: 'fino-time-goku-capsule',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'dracula-neon-pulse': {
        zshTheme: 'fino-time-goku-dracula',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'tokyo-storm-city': {
        zshTheme: 'fino-time-goku-cyber',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'capsule-rain-neon': {
        zshTheme: 'fino-time-goku-capsule',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'namek-emerald': {
        zshTheme: 'fino-time-goku-namek',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'nordic-moon': {
        zshTheme: 'fino-time-goku-nord',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'sweet-underground': {
        zshTheme: 'fino-time-goku-rose',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'cyber-alley-violet': {
        zshTheme: 'fino-time-goku-cyber',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'goku-city-peace': {
        zshTheme: 'fino-time-goku-solar',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'cell-capsule-siege': {
        zshTheme: 'fino-time-goku-dracula',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'crepusculo-carmesi-neon': {
        zshTheme: 'fino-time-goku-rose',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'crimson-bokeh-night': {
        zshTheme: 'fino-time-goku-rose',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'alpine-reflection': {
        zshTheme: 'fino-time-goku-nord',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'hedgehog-soft-day': {
        zshTheme: 'fino-time-goku-zen',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'kanagawa-sunset-wave': {
        zshTheme: 'fino-time-goku-solar',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'goku-dragon-orb': {
        zshTheme: 'fino-time-goku-solar',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'autumn-poly-dog': {
        zshTheme: 'fino-time-goku-solar',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
    'golden-cloud-horizon': {
        zshTheme: 'fino-time-goku-nord',
        monospaceFont: 'JetBrainsMono Nerd Font 11',
    },
};

const ThemeProfilesIndicator = GObject.registerClass(
class ThemeProfilesIndicator extends PanelMenu.Button {
    _init(extension) {
        super._init(0.0, 'Theme Profiles');
        this._extension = extension;
        this._profileItems = new Map();

        const icon = new St.Icon({
            icon_name: 'preferences-desktop-theme-symbolic',
            style_class: 'system-status-icon',
        });
        this.add_child(icon);

        this._currentItem = new PopupMenu.PopupMenuItem('Tema actual: -', {
            reactive: false,
            can_focus: false,
        });
        this.menu.addMenuItem(this._currentItem);
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        for (const profile of this._extension.getProfiles()) {
            const item = new PopupMenu.PopupMenuItem(profile.name);
            item.connect('activate', () => this._extension.applyProfile(profile.id));
            this.menu.addMenuItem(item);
            this._profileItems.set(profile.id, item);
        }
    }

    refresh() {
        const currentId = this._extension.getCurrentProfileId();

        for (const [id, item] of this._profileItems.entries()) {
            item.setOrnament(id === currentId
                ? PopupMenu.Ornament.CHECK
                : PopupMenu.Ornament.NONE);
        }

        const currentName = this._extension.getProfileName(currentId) || 'Personalizado';
        this._currentItem.label.text = `Tema actual: ${currentName}`;
    }
});

export default class ThemeProfilesExtension extends Extension {
    enable() {
        this._profiles = this._loadProfiles();
        this._interfaceSettings = this._getSettings('org.gnome.desktop.interface');
        this._backgroundSettings = this._getSettings('org.gnome.desktop.background');
        this._userThemeSettings = this._getSettings('org.gnome.shell.extensions.user-theme');

        this._indicator = new ThemeProfilesIndicator(this);
        Main.panel.addToStatusArea(this.uuid, this._indicator, 1, 'right');
        this._indicator.refresh();
    }

    disable() {
        this._indicator?.destroy();
        this._indicator = null;

        this._profiles = null;
        this._interfaceSettings = null;
        this._backgroundSettings = null;
        this._userThemeSettings = null;
    }

    getProfiles() {
        return this._profiles || [];
    }

    getProfileName(id) {
        return this._profiles?.find(profile => profile.id === id)?.name || null;
    }

    getCurrentProfileId() {
        if (!this._profiles)
            return null;

        const current = {
            gtkTheme: this._safeGetString(this._interfaceSettings, 'gtk-theme'),
            iconTheme: this._safeGetString(this._interfaceSettings, 'icon-theme'),
            cursorTheme: this._safeGetString(this._interfaceSettings, 'cursor-theme'),
            shellTheme: this._safeGetString(this._userThemeSettings, 'name'),
            wallpaperUri: this._safeGetString(this._backgroundSettings, 'picture-uri'),
            colorScheme: this._safeGetString(this._interfaceSettings, 'color-scheme'),
        };

        for (const profile of this._profiles) {
            if (profile.gtkTheme && current.gtkTheme !== profile.gtkTheme)
                continue;
            if (profile.iconTheme && current.iconTheme !== profile.iconTheme)
                continue;
            if (profile.cursorTheme && current.cursorTheme !== profile.cursorTheme)
                continue;
            if (profile.shellTheme && current.shellTheme !== profile.shellTheme)
                continue;
            if (profile.wallpaperUri && current.wallpaperUri !== profile.wallpaperUri)
                continue;
            if (profile.colorScheme && current.colorScheme !== profile.colorScheme)
                continue;

            return profile.id;
        }

        return null;
    }

    applyProfile(id) {
        const profile = this._profiles?.find(entry => entry.id === id);
        if (!profile)
            return;

        const terminalStyle = this._getTerminalStyle(profile.id);

        this._safeSetString(this._interfaceSettings, 'gtk-theme', profile.gtkTheme);
        this._safeSetString(this._interfaceSettings, 'icon-theme', profile.iconTheme);
        this._safeSetString(this._interfaceSettings, 'cursor-theme', profile.cursorTheme);
        this._safeSetString(this._interfaceSettings, 'color-scheme', profile.colorScheme);
        if (APPLY_TERMINAL_FONT_ON_PROFILE_CHANGE)
            this._safeSetString(this._interfaceSettings, 'monospace-font-name', terminalStyle.monospaceFont);

        this._safeSetString(this._backgroundSettings, 'picture-uri', profile.wallpaperUri);
        this._safeSetString(this._backgroundSettings, 'picture-uri-dark', profile.wallpaperUri);
        this._safeSetString(this._userThemeSettings, 'name', profile.shellTheme);
        this._writeCurrentZshTheme(terminalStyle.zshTheme);
        this._writeAnimatedWallpaperState(profile);

        this._indicator?.refresh();
        Main.notify(`Tema aplicado: ${profile.name}`);
    }

    _getTerminalStyle(profileId) {
        return TERMINAL_STYLE_BY_PROFILE_ID[profileId] || DEFAULT_TERMINAL_STYLE;
    }

    _writeCurrentZshTheme(zshTheme) {
        if (!zshTheme)
            return;

        try {
            const themeDir = GLib.build_filenamev([GLib.get_home_dir(), '.config', 'theme-profiles']);
            GLib.mkdir_with_parents(themeDir, 0o755);

            const themeFile = GLib.build_filenamev([themeDir, 'current-zsh-theme']);
            GLib.file_set_contents(themeFile, `${zshTheme}\n`);
        } catch (error) {
            console.error(`[${this.uuid}] No se pudo guardar zshTheme actual: ${error}`);
        }
    }

    _writeAnimatedWallpaperState(profile) {
        try {
            const configDir = GLib.build_filenamev([GLib.get_home_dir(), '.config', 'theme-profiles']);
            GLib.mkdir_with_parents(configDir, 0o755);

            const stateFile = GLib.build_filenamev([configDir, 'animated-wallpaper.json']);
            const state = {
                enabled: Boolean(profile.animatedWallpaper),
                profileId: profile.id,
                profileName: profile.name,
                wallpaperUri: profile.wallpaperUri || null,
                animatedWallpaper: profile.animatedWallpaper || null,
                updatedAt: GLib.DateTime.new_now_local().format_iso8601(),
            };

            GLib.file_set_contents(stateFile, `${JSON.stringify(state, null, 2)}\n`);
        } catch (error) {
            console.error(`[${this.uuid}] No se pudo guardar el estado de fondo animado: ${error}`);
        }
    }

    _loadProfiles() {
        const path = GLib.build_filenamev([this.path, 'profiles.json']);

        try {
            const [ok, bytes] = GLib.file_get_contents(path);
            if (!ok)
                return DEFAULT_PROFILES;

            const parsed = JSON.parse(new TextDecoder().decode(bytes));
            if (!Array.isArray(parsed) || parsed.length === 0)
                return DEFAULT_PROFILES;

            return parsed;
        } catch (error) {
            console.error(`[${this.uuid}] No se pudo leer profiles.json: ${error}`);
            return DEFAULT_PROFILES;
        }
    }

    _getSettings(schema) {
        try {
            return new Gio.Settings({schema_id: schema});
        } catch (error) {
            console.error(`[${this.uuid}] Esquema no disponible: ${schema}`);
            return null;
        }
    }

    _safeGetString(settings, key) {
        if (!settings)
            return null;

        try {
            return settings.get_string(key);
        } catch (error) {
            return null;
        }
    }

    _safeSetString(settings, key, value) {
        if (!settings || !value)
            return;

        try {
            settings.set_string(key, value);
        } catch (error) {
            console.error(`[${this.uuid}] No se pudo aplicar ${key}: ${error}`);
        }
    }
}

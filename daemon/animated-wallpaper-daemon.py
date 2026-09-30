#!/usr/bin/env python3
import argparse
import json
import os
import shutil
import signal
import subprocess
import sys
import time
from pathlib import Path


CONFIG_DIR = Path.home() / '.config' / 'theme-profiles'
STATE_FILE = CONFIG_DIR / 'animated-wallpaper.json'
LOG_FILE = CONFIG_DIR / 'animated-wallpaper-daemon.log'
POLL_SECONDS = 1.5


class AnimatedWallpaperDaemon:
    def __init__(self, dry_run=False):
        self.dry_run = dry_run
        self.current_key = None
        self.player = None

    def run(self):
        self._log('daemon started')
        last_mtime = None

        while True:
            try:
                mtime = STATE_FILE.stat().st_mtime if STATE_FILE.exists() else None
                if mtime != last_mtime:
                    last_mtime = mtime
                    self.apply_state()
                self._reap_player_if_needed()
                time.sleep(POLL_SECONDS)
            except KeyboardInterrupt:
                break
            except Exception as error:
                self._log(f'error: {error}')
                time.sleep(POLL_SECONDS)

        self.stop_player()
        self._log('daemon stopped')

    def apply_state(self):
        state = self._read_state()
        if not state or not state.get('enabled'):
            self._log('animated wallpaper disabled')
            self.current_key = None
            self.stop_player()
            return

        video = state.get('animatedWallpaper')
        if not video:
            self._log('enabled state has no animatedWallpaper')
            self.current_key = None
            self.stop_player()
            return

        video_path = Path(video).expanduser()
        if not video_path.is_file():
            self._log(f'video not found: {video_path}')
            self.current_key = None
            self.stop_player()
            return

        key = f'{state.get("profileId", "unknown")}:{video_path}'
        if key == self.current_key and self.player and self.player.poll() is None:
            return

        self.stop_player()
        self.current_key = key
        self.start_player(video_path)

    def start_player(self, video_path):
        command = self._build_player_command(video_path)
        if not command:
            self._log('no supported player found; install mpv or use VLC')
            return

        self._log(f'starting player: {" ".join(command)}')
        if self.dry_run:
            return

        self.player = subprocess.Popen(
            command,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            start_new_session=True,
        )

    def stop_player(self):
        if not self.player:
            return

        if self.player.poll() is not None:
            self.player = None
            return

        self._log('stopping player')
        try:
            os.killpg(self.player.pid, signal.SIGTERM)
            self.player.wait(timeout=3)
        except Exception:
            try:
                os.killpg(self.player.pid, signal.SIGKILL)
            except Exception:
                pass
        self.player = None

    def _build_player_command(self, video_path):
        mpv = shutil.which('mpv')
        if mpv:
            return [
                mpv,
                '--no-audio',
                '--loop-file=inf',
                '--hwdec=auto-safe',
                '--really-quiet',
                '--no-border',
                '--fullscreen',
                '--ontop=no',
                str(video_path),
            ]

        vlc = shutil.which('vlc')
        if vlc:
            return [
                vlc,
                '--quiet',
                '--no-audio',
                '--loop',
                '--fullscreen',
                '--no-video-title-show',
                str(video_path),
            ]

        return None

    def _read_state(self):
        if not STATE_FILE.exists():
            self._log(f'state file not found: {STATE_FILE}')
            return None

        try:
            return json.loads(STATE_FILE.read_text(encoding='utf-8'))
        except Exception as error:
            self._log(f'could not read state file: {error}')
            return None

    def _reap_player_if_needed(self):
        if self.player and self.player.poll() is not None:
            self._log(f'player exited with code {self.player.returncode}')
            self.player = None

    def _log(self, message):
        CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        line = f'{time.strftime("%Y-%m-%d %H:%M:%S")} {message}'
        LOG_FILE.open('a', encoding='utf-8').write(f'{line}\n')
        print(line, flush=True)


def main():
    parser = argparse.ArgumentParser(description='Theme Profiles animated wallpaper backend')
    parser.add_argument('--once', action='store_true', help='read and apply current state once')
    parser.add_argument('--dry-run', action='store_true', help='log actions without launching a player')
    args = parser.parse_args()

    daemon = AnimatedWallpaperDaemon(dry_run=args.dry_run)
    if args.once:
        daemon.apply_state()
        return 0

    daemon.run()
    return 0


if __name__ == '__main__':
    sys.exit(main())

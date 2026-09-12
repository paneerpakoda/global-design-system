#!/usr/bin/env python3
"""Copy/check the canonical Flutter package in an app's packages/global_ds.

Run from any directory: python3 tool/sync_consumer.py /path/to/app [--check]
Only known package files are written. Existing unrelated files are preserved.
"""
from pathlib import Path
import argparse
import hashlib
import json
import shutil

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('app', type=Path)
parser.add_argument('--check', action='store_true')
args = parser.parse_args()
source = Path(__file__).resolve().parents[1]
app = args.app.resolve()
if not (app / 'pubspec.yaml').is_file():
    parser.error('app must contain pubspec.yaml')
target = app / 'packages/global_ds'
if target.resolve() == source:
    parser.error('source and target must differ')
ignored = {'.dart_tool', 'build', '.idea', '.git', '__pycache__'}
files = [source / name for name in ['pubspec.yaml', 'README.md']]
for directory in ['lib', 'assets', 'test', 'docs', 'example', 'tool']:
    files += [p for p in (source / directory).rglob('*') if p.is_file()
              and not any(part in ignored for part in p.relative_to(source).parts)
              and p.name not in {'pubspec.lock', '.metadata', '.DS_Store'}
              and p.suffix != '.iml']
digest = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
manifest = {str(p.relative_to(source)): digest(p) for p in sorted(files)}
changed = [name for name, sha in manifest.items()
           if not (target / name).is_file() or digest(target / name) != sha]
manifest_path = target / 'SOURCE_MANIFEST.json'
previous = json.loads(manifest_path.read_text()).get('files', {}) if manifest_path.exists() else {}
stale = [name for name in previous if name not in manifest and (target / name).exists()]
if stale:
    raise SystemExit('Previously synced files no longer in source; review them before removal: ' + ', '.join(stale))
if args.check:
    if changed or previous != manifest:
        raise SystemExit('GlobalDS snapshot differs: ' + ', '.join(changed or ['SOURCE_MANIFEST.json']))
    print(f'GlobalDS snapshot matches all {len(manifest)} canonical files.')
else:
    for name in changed:
        destination = target / name
        destination.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source / name, destination)
    manifest_path.write_text(json.dumps({'source': 'GlobalDS/flutter', 'files': manifest}, indent=2) + '\n')
    print(f'Synced {len(changed)} files; manifest covers {len(manifest)} files.')

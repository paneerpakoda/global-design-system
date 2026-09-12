#!/usr/bin/env python3
"""Verify packaged icons against the repository's audited GlobalDS sources."""
from pathlib import Path
import hashlib
import json

root = Path(__file__).resolve().parents[2]
manifest = json.loads((root / 'flutter/docs/icon-provenance.json').read_text())
for name, entry in manifest.items():
    for key in ['source', 'packaged']:
        path = root / entry[key]
        assert hashlib.sha256(path.read_bytes()).hexdigest() == entry['sha256'], (name, path)
print(f"All {len(manifest)} Flutter icons match their original GlobalDS assets.")

#!/usr/bin/env python3
import pathlib
import subprocess
import sys

tracked = subprocess.check_output(["git", "ls-files"], text=True).splitlines()
bad = []
for f in tracked:
    p = pathlib.Path(f)
    if not p.exists() or not p.is_file():
        continue
    data = p.read_bytes()[:8192]
    if b"\x00" in data:
        bad.append(f)

if bad:
    print("Binary-tracked files found:")
    for f in bad:
        print(f" - {f}")
    sys.exit(1)

print("OK: no binary-tracked files detected")

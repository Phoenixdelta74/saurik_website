#!/usr/bin/env python3
"""Print deterministic, non-mutating project/tooling discovery for release tests."""
import json
import shutil
from pathlib import Path


def read_json(path):
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return {}


root = Path.cwd()
package = read_json(root / "package.json")
scripts = package.get("scripts", {}) if isinstance(package, dict) else {}
dependencies = {}
dependencies.update(package.get("dependencies", {}))
dependencies.update(package.get("devDependencies", {}))
files = ("package.json", "pnpm-lock.yaml", "yarn.lock", "package-lock.json", "bun.lockb", "vite.config.js", "vite.config.ts", "next.config.js", "next.config.mjs", "playwright.config.ts", "playwright.config.js", "cypress.config.ts", "cypress.config.js", "tsconfig.json")
print(json.dumps({
    "root": str(root),
    "presentFiles": [name for name in files if (root / name).exists()],
    "frameworkHints": [name for name in ("vite", "next", "react", "vue", "@angular/core", "svelte") if name in dependencies],
    "scripts": scripts,
    "commands": {name: bool(shutil.which(name)) for name in ("node", "npm", "npm.cmd", "pnpm", "yarn", "bun", "npx", "npx.cmd", "python", "python3")},
}, indent=2, sort_keys=True))

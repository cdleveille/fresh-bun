import { chmod, exists, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

if (!(await exists(".git"))) {
  console.warn("lefthook could not find .git folder, skipping hook setup ⚠️");
  process.exit(0);
}

const HOOKS_DIR = ".git/hooks";

await mkdir(HOOKS_DIR, { recursive: true });

const preCommit = `#!/bin/sh
export PATH="$PWD/node_modules/.bin:$PATH"
lefthook run pre-commit --no-auto-install`;

await writeFile(join(HOOKS_DIR, "pre-commit"), preCommit);

await chmod(join(HOOKS_DIR, "pre-commit"), 0o755);

console.log("lefthook: pre-commit git hook synced ✅");

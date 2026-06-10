import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

const sourceRoot = path.resolve(import.meta.dirname, "../..");

function run(cwd, command, args, options = {}) {
  const result = spawnSync(command, args, { cwd, encoding: "utf8" });
  if (options.ok !== false && result.status !== 0) {
    assert.fail(`${command} ${args.join(" ")} failed:\n${result.stdout}\n${result.stderr}`);
  }
  return result;
}

function write(root, relativePath, content) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function metadata(version) {
  return {
    "package.json": JSON.stringify({
      name: "release-test",
      version,
      private: true,
      scripts: {
        lint: "node -e \"\"",
        build: "node -e \"\"",
        "check:release-drift": "node scripts/check-release-drift.mjs",
      },
    }, null, 2) + "\n",
    "package-lock.json": JSON.stringify({
      name: "release-test",
      version,
      lockfileVersion: 3,
      requires: true,
      packages: { "": { name: "release-test", version } },
    }, null, 2) + "\n",
    "CHANGELOG.md": `# Changelog\n\n## [Unreleased]\n\n## [${version}] - 2026-06-11\n`,
    "ROADMAP.md": `Current version baseline: \`${version}\`\n`,
    "src/lib/adventureLog.ts": `export const ADVENTURE_LOG = [{ version: "${version}" }];\n`,
  };
}

function createRepo() {
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), "learn-malay-release-"));
  const remote = path.join(parent, "origin.git");
  const root = path.join(parent, "repo");
  fs.mkdirSync(root);
  run(parent, "git", ["init", "--bare", remote]);
  run(root, "git", ["init", "-b", "main"]);
  run(root, "git", ["config", "user.name", "Release Test"]);
  run(root, "git", ["config", "user.email", "release@example.com"]);
  run(root, "git", ["remote", "add", "origin", remote]);
  write(root, "scripts/release.mjs", fs.readFileSync(path.join(sourceRoot, "scripts/release.mjs")));
  write(root, "scripts/check-release-drift.mjs", fs.readFileSync(path.join(sourceRoot, "scripts/check-release-drift.mjs")));
  for (const [file, content] of Object.entries(metadata("1.0.0"))) write(root, file, content);
  run(root, "git", ["add", "."]);
  run(root, "git", ["commit", "-m", "chore(release): bump version to v1.0.0"]);
  run(root, "git", ["tag", "-a", "v1.0.0", "-m", "Release v1.0.0"]);
  run(root, "git", ["push", "-u", "origin", "main", "refs/tags/v1.0.0"]);
  return { parent, remote, root };
}

function stageRelease(root, version = "1.0.1") {
  for (const [file, content] of Object.entries(metadata(version))) write(root, file, content);
  run(root, "git", ["add", ...Object.keys(metadata(version))]);
}

function release(root, args, ok = true) {
  return run(root, "node", ["scripts/release.mjs", ...args], { ok });
}

test("plan is read-only", () => {
  const { root } = createRepo();
  const beforeHead = run(root, "git", ["rev-parse", "HEAD"]).stdout;
  const beforeStatus = run(root, "git", ["status", "--porcelain"]).stdout;
  const result = release(root, ["plan"]);
  assert.match(result.stdout, /Current version: 1\.0\.0/);
  assert.equal(run(root, "git", ["rev-parse", "HEAD"]).stdout, beforeHead);
  assert.equal(run(root, "git", ["status", "--porcelain"]).stdout, beforeStatus);
});

test("metadata-only drift skips tags but default drift requires them", () => {
  const { root } = createRepo();
  stageRelease(root);
  assert.equal(run(root, "node", ["scripts/check-release-drift.mjs", "--metadata-only"]).status, 0);
  const result = run(root, "node", ["scripts/check-release-drift.mjs"], { ok: false });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Missing release tags: v1\.0\.1/);
});

test("publish rejects invalid versions and wrong branches", () => {
  const { root } = createRepo();
  stageRelease(root);
  assert.match(release(root, ["publish", "--version", "next"], false).stderr, /strict SemVer/);
  run(root, "git", ["switch", "-c", "feature"]);
  assert.match(release(root, ["publish", "--version", "1.0.1"], false).stderr, /must run on `main`/);
});

test("publish rejects dirty, incomplete, drifted, and existing-tag states", () => {
  {
    const { root } = createRepo();
    write(root, "dirty.txt", "dirty\n");
    assert.match(release(root, ["publish", "--version", "1.0.1"], false).stderr, /unstaged or untracked/);
  }
  {
    const { root } = createRepo();
    stageRelease(root);
    write(root, "dirty.txt", "dirty\n");
    assert.match(release(root, ["publish", "--version", "1.0.1"], false).stderr, /unstaged or untracked/);
  }
  {
    const { root } = createRepo();
    stageRelease(root);
    run(root, "git", ["restore", "--staged", "--worktree", "ROADMAP.md"]);
    assert.match(release(root, ["publish", "--version", "1.0.1"], false).stderr, /not staged: ROADMAP\.md/);
  }
  {
    const { root } = createRepo();
    stageRelease(root);
    write(root, "ROADMAP.md", "Current version baseline: `9.9.9`\n");
    run(root, "git", ["add", "ROADMAP.md"]);
    assert.match(release(root, ["publish", "--version", "1.0.1"], false).stderr, /metadata is not synchronized/);
  }
  {
    const { root } = createRepo();
    stageRelease(root);
    run(root, "git", ["tag", "-a", "v1.0.1", "-m", "existing"]);
    assert.match(release(root, ["publish", "--version", "1.0.1"], false).stderr, /already exists/);
  }
  {
    const { root } = createRepo();
    stageRelease(root);
    run(root, "git", ["tag", "-a", "v1.0.1", "HEAD", "-m", "existing"]);
    run(root, "git", ["push", "origin", "refs/tags/v1.0.1"]);
    run(root, "git", ["tag", "-d", "v1.0.1"]);
    assert.match(release(root, ["publish", "--version", "1.0.1"], false).stderr, /remote tag v1\.0\.1 already exists/);
  }
});

test("publish creates an annotated tag and atomically updates origin", () => {
  const { remote, root } = createRepo();
  stageRelease(root);
  const result = release(root, ["publish", "--version", "1.0.1"]);
  assert.match(result.stdout, /Published v1\.0\.1/);
  const head = run(root, "git", ["rev-parse", "HEAD"]).stdout.trim();
  assert.equal(run(root, "git", ["cat-file", "-t", "refs/tags/v1.0.1"]).stdout.trim(), "tag");
  assert.equal(run(root, "git", ["rev-list", "-n", "1", "v1.0.1"]).stdout.trim(), head);
  assert.equal(run(remote, "git", ["rev-parse", "refs/heads/main"]).stdout.trim(), head);
  assert.equal(run(remote, "git", ["rev-list", "-n", "1", "refs/tags/v1.0.1"]).stdout.trim(), head);
});

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const requiredReleaseFiles = [
  "package.json",
  "package-lock.json",
  "CHANGELOG.md",
  "src/lib/adventureLog.ts",
  "ROADMAP.md",
];
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

function fail(message) {
  console.error(`Release blocked: ${message}`);
  process.exit(1);
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: options.capture ? "pipe" : "inherit",
  });

  if (result.status !== 0 && !options.allowFailure) {
    fail(options.failureMessage ?? `\`${command} ${args.join(" ")}\` failed.`);
  }

  return result;
}

function output(command, args, options = {}) {
  return run(command, args, { ...options, capture: true }).stdout.trimEnd();
}

function parseVersion(value) {
  const match = semverPattern.exec(value ?? "");
  if (!match) fail("provide a strict SemVer with `--version X.Y.Z`.");
  return match.slice(1).map(Number);
}

function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

function bumpCandidates(version) {
  const [major, minor, patch] = parseVersion(version);
  return {
    PATCH: `${major}.${minor}.${patch + 1}`,
    MINOR: `${major}.${minor + 1}.0`,
    MAJOR: `${major + 1}.0.0`,
  };
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

function splitLines(value) {
  return value ? value.split("\n").filter(Boolean) : [];
}

function changedFiles() {
  const working = splitLines(output("git", ["status", "--short"])).map((line) =>
    line.slice(3),
  );
  const latestTag = output("git", ["describe", "--tags", "--abbrev=0"], {
    allowFailure: true,
  });
  const committed = latestTag
    ? splitLines(output("git", ["diff", "--name-only", `${latestTag}..HEAD`]))
    : [];
  return { latestTag, files: [...new Set([...committed, ...working])].sort() };
}

function printPlan() {
  const packageVersion = readJson("package.json").version;
  const lockVersion = readJson("package-lock.json").version;
  const { latestTag, files } = changedFiles();
  const chapterFiles = files.filter((file) =>
    /^src\/lib\/chapters\/chapter-\d+\.ts$/.test(file),
  );
  const candidates = bumpCandidates(packageVersion);
  const expectedTag = `v${packageVersion}`;
  const tagType = output("git", ["cat-file", "-t", `refs/tags/${expectedTag}`], {
    allowFailure: true,
  });
  const blockers = [];

  console.log(`Current version: ${packageVersion}`);
  console.log(`package-lock.json version: ${lockVersion}`);
  console.log(`Latest reachable tag: ${latestTag || "none"}`);
  console.log(`Current version tag: ${tagType || "missing"}`);
  console.log(`Changed files: ${files.length ? files.join(", ") : "none"}`);
  console.log(
    `Changed chapter files: ${chapterFiles.length ? chapterFiles.join(", ") : "none"}`,
  );
  console.log(
    `Candidate versions: PATCH ${candidates.PATCH}, MINOR ${candidates.MINOR}, MAJOR ${candidates.MAJOR}`,
  );

  if (packageVersion !== lockVersion) {
    blockers.push("package.json and package-lock.json versions differ.");
  }
  if (tagType !== "tag") {
    blockers.push(`${expectedTag} is missing or is not annotated.`);
  }

  console.log("\nRunning safe validation...");
  const validations = [
    ["npm run lint", ["run", "lint"]],
    ["npm run build", ["run", "build"]],
    ["npm run check:release-drift", ["run", "check:release-drift"]],
  ];
  for (const [label, args] of validations) {
    const result = run("npm", args, { allowFailure: true });
    if (result.status !== 0) blockers.push(`${label} failed.`);
  }

  if (blockers.length > 0) {
    console.log("\nPreflight blocked:");
    for (const blocker of blockers) console.log(`- ${blocker}`);
    process.exitCode = 1;
    return;
  }

  console.log("\nPreflight ready. Next execution phrase: `close update`.");
}

function requirePublishState(version) {
  const branch = output("git", ["branch", "--show-current"]);
  if (branch !== "main") fail(`publish must run on \`main\`, not \`${branch || "detached HEAD"}\`.`);

  const status = output("git", ["status", "--porcelain"]);
  const statusLines = splitLines(status);
  if (statusLines.length === 0) fail("no staged release changes were found.");

  const unstagedOrUntracked = statusLines.filter(
    (line) => line.startsWith("??") || line[1] !== " ",
  );
  if (unstagedOrUntracked.length > 0) {
    fail(`unstaged or untracked changes remain:\n${unstagedOrUntracked.join("\n")}`);
  }

  const stagedFiles = splitLines(output("git", ["diff", "--cached", "--name-only"]));
  const missingFiles = requiredReleaseFiles.filter((file) => !stagedFiles.includes(file));
  if (missingFiles.length > 0) {
    fail(`required release files are not staged: ${missingFiles.join(", ")}.`);
  }

  const packageVersion = readJson("package.json").version;
  const lockVersion = readJson("package-lock.json").version;
  if (packageVersion !== version || lockVersion !== version) {
    fail(
      `package.json and package-lock.json must both be synchronized at ${version}.`,
    );
  }

  const previousVersion = JSON.parse(
    output("git", ["show", "HEAD:package.json"]),
  ).version;
  if (compareVersions(parseVersion(version), parseVersion(previousVersion)) <= 0) {
    fail(`target ${version} must be greater than current released version ${previousVersion}.`);
  }

  const tag = `v${version}`;
  if (output("git", ["tag", "--list", tag])) fail(`local tag ${tag} already exists.`);

  const remote = output("git", ["remote", "get-url", "origin"], { allowFailure: true });
  if (!remote) fail("the `origin` remote is required.");
  if (output("git", ["ls-remote", "--tags", "origin", `refs/tags/${tag}`])) {
    fail(`remote tag ${tag} already exists.`);
  }

  run("git", ["fetch", "--quiet", "origin", "main"], {
    failureMessage: "could not fetch `origin/main`.",
  });
  const head = output("git", ["rev-parse", "HEAD"]);
  const remoteMain = output("git", ["rev-parse", "refs/remotes/origin/main"], {
    allowFailure: true,
  });
  if (!remoteMain || head !== remoteMain) {
    fail("local `main` must exactly match `origin/main` before the release commit.");
  }

  run("node", ["scripts/check-release-drift.mjs", "--metadata-only"], {
    failureMessage: "release metadata is not synchronized.",
  });
}

function publish(version) {
  parseVersion(version);
  requirePublishState(version);
  const expectedStatus = output("git", ["status", "--porcelain"]);

  run("npm", ["run", "lint"]);
  run("npm", ["run", "build"]);
  const validatedStatus = output("git", ["status", "--porcelain"]);
  if (validatedStatus !== expectedStatus) {
    fail("lint or build changed the staged release state; review and restage before publishing.");
  }

  const tag = `v${version}`;
  run("git", ["commit", "-m", `chore(release): bump version to ${tag}`]);
  const releaseCommit = output("git", ["rev-parse", "HEAD"]);
  run("git", ["tag", "-a", tag, releaseCommit, "-m", `Release ${tag}`]);
  run("npm", ["run", "check:release-drift"]);

  const tagType = output("git", ["cat-file", "-t", `refs/tags/${tag}`]);
  const taggedCommit = output("git", ["rev-list", "-n", "1", tag]);
  if (tagType !== "tag" || taggedCommit !== releaseCommit) {
    fail(`${tag} does not resolve to the intended annotated release commit.`);
  }

  run("git", ["push", "--atomic", "origin", "main", `refs/tags/${tag}`], {
    failureMessage: "atomic push of `main` and the release tag failed.",
  });

  console.log(`Published ${tag} from ${releaseCommit}.`);
  run("git", ["status", "--short", "--branch"]);
}

const [command, ...args] = process.argv.slice(2);

if (command === "plan") {
  printPlan();
} else if (command === "publish") {
  const versionIndex = args.indexOf("--version");
  publish(versionIndex >= 0 ? args[versionIndex + 1] : undefined);
} else {
  fail("use `plan` or `publish --version X.Y.Z`.");
}

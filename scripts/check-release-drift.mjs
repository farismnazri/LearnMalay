import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = path.resolve(import.meta.dirname, "..");
const metadataOnly = process.argv.includes("--metadata-only");

const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

const packageJson = JSON.parse(read("package.json"));
const packageVersion = packageJson.version;

const roadmap = read("ROADMAP.md");
const changelog = read("CHANGELOG.md");
const adventureLog = read("src/lib/adventureLog.ts");

const roadmapMatch = roadmap.match(/Current version baseline:\s*`([^`]+)`/);
const releasedVersions = [
  ...changelog.matchAll(/^## \[(\d+\.\d+\.\d+)\](?:\s+-.*)?$/gm),
].map((match) => match[1]);
const adventureLogMatch = adventureLog.match(/version:\s*"([^"]+)"/);

const failures = [];

if (!roadmapMatch) {
  failures.push("ROADMAP.md is missing `Current version baseline: `...");
} else if (roadmapMatch[1] !== packageVersion) {
  failures.push(
    `ROADMAP.md baseline is ${roadmapMatch[1]}, but package.json is ${packageVersion}.`,
  );
}

if (releasedVersions.length === 0) {
  failures.push("CHANGELOG.md is missing a latest released version header.");
} else if (releasedVersions[0] !== packageVersion) {
  failures.push(
    `CHANGELOG.md latest release is ${releasedVersions[0]}, but package.json is ${packageVersion}.`,
  );
}

if (!adventureLogMatch) {
  failures.push("src/lib/adventureLog.ts is missing a top release entry.");
} else if (adventureLogMatch[1] !== packageVersion) {
  failures.push(
    `src/lib/adventureLog.ts latest entry is ${adventureLogMatch[1]}, but package.json is ${packageVersion}.`,
  );
}

const missingTags = [];
const nonAnnotatedTags = [];

if (!metadataOnly) {
  for (const version of releasedVersions) {
    const tag = `v${version}`;
    const result = spawnSync("git", ["cat-file", "-t", `refs/tags/${tag}`], {
      cwd: repoRoot,
      encoding: "utf8",
    });

    if (result.status !== 0) {
      missingTags.push(tag);
    } else if (result.stdout.trim() !== "tag") {
      nonAnnotatedTags.push(tag);
    }
  }
}

if (missingTags.length > 0) {
  failures.push(`Missing release tags: ${missingTags.join(", ")}.`);
}

if (nonAnnotatedTags.length > 0) {
  failures.push(
    `Release tags must be annotated, but these are lightweight: ${nonAnnotatedTags.join(", ")}.`,
  );
}

if (failures.length > 0) {
  console.error("Release drift detected:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  metadataOnly
    ? `Release metadata aligned at v${packageVersion}; tag checks skipped.`
    : `Release metadata aligned at v${packageVersion}.`,
);

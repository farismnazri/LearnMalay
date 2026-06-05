import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(import.meta.dirname, "..");

const read = (relativePath) =>
  fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

const packageJson = JSON.parse(read("package.json"));
const packageVersion = packageJson.version;

const roadmap = read("ROADMAP.md");
const changelog = read("CHANGELOG.md");
const adventureLog = read("src/lib/adventureLog.ts");

const roadmapMatch = roadmap.match(/Current version baseline:\s*`([^`]+)`/);
const changelogMatch = changelog.match(/^## \[(?!Unreleased\])([^\]]+)\]/m);
const adventureLogMatch = adventureLog.match(/version:\s*"([^"]+)"/);

const failures = [];

if (!roadmapMatch) {
  failures.push("ROADMAP.md is missing `Current version baseline: `...");
} else if (roadmapMatch[1] !== packageVersion) {
  failures.push(
    `ROADMAP.md baseline is ${roadmapMatch[1]}, but package.json is ${packageVersion}.`,
  );
}

if (!changelogMatch) {
  failures.push("CHANGELOG.md is missing a latest released version header.");
} else if (changelogMatch[1] !== packageVersion) {
  failures.push(
    `CHANGELOG.md latest release is ${changelogMatch[1]}, but package.json is ${packageVersion}.`,
  );
}

if (!adventureLogMatch) {
  failures.push("src/lib/adventureLog.ts is missing a top release entry.");
} else if (adventureLogMatch[1] !== packageVersion) {
  failures.push(
    `src/lib/adventureLog.ts latest entry is ${adventureLogMatch[1]}, but package.json is ${packageVersion}.`,
  );
}

if (failures.length > 0) {
  console.error("Release drift detected:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Release metadata aligned at v${packageVersion}.`);

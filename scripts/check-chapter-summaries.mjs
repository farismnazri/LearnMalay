import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const chaptersRoot = path.join(projectRoot, "src/lib/chapters");
const chapterIndexPath = path.join(chaptersRoot, "index.ts");
const summariesPath = path.join(chaptersRoot, "summaries.ts");

function readProjectFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function parseStringLiteral(raw) {
  return JSON.parse(`"${raw}"`);
}

function parseSummaryRows() {
  const source = readProjectFile(summariesPath);
  const rows = [];
  const rowPattern = /\{\s*id:\s*(\d+),\s*revision:\s*(\d+),\s*title:\s*\{\s*ms:\s*"((?:\\.|[^"\\])*)"\s*\}\s*\}/g;

  for (const match of source.matchAll(rowPattern)) {
    rows.push({
      id: Number(match[1]),
      revision: Number(match[2]),
      title: { ms: parseStringLiteral(match[3]) },
    });
  }

  return rows;
}

function parseCanonicalChapterOrder() {
  const source = readProjectFile(chapterIndexPath);
  const imports = new Map();
  const importPattern = /import\s+\{\s*(chapter\d+)\s*\}\s+from\s+"(\.\/chapter-\d+)";/g;

  for (const match of source.matchAll(importPattern)) {
    imports.set(match[1], `${match[2]}.ts`);
  }

  const arrayMatch = source.match(/export const CHAPTERS = \[([\s\S]*?)\] as const;/);
  if (!arrayMatch) {
    throw new Error("Could not find CHAPTERS export in src/lib/chapters/index.ts.");
  }

  return [...arrayMatch[1].matchAll(/\b(chapter\d+)\b/g)].map((match) => {
    const importPath = imports.get(match[1]);
    if (!importPath) {
      throw new Error(`Could not resolve import path for ${match[1]}.`);
    }
    return { symbol: match[1], filePath: path.join(chaptersRoot, importPath) };
  });
}

function parseCanonicalChapter({ symbol, filePath }) {
  const source = readProjectFile(filePath);
  const objectStart = source.match(new RegExp(`export\\s+const\\s+${symbol}\\s*:[^{=]+?=\\s*\\{`));
  if (!objectStart) {
    throw new Error(`Could not find exported chapter object for ${symbol}.`);
  }

  const header = source.slice(objectStart.index, source.indexOf("pages:", objectStart.index));
  if (!header) {
    throw new Error(`Could not find chapter metadata header for ${symbol}.`);
  }

  const id = Number(header.match(/\bid:\s*(\d+)/)?.[1]);
  const revision = Number(header.match(/\brevision:\s*(\d+)/)?.[1]);
  const titleMsRaw = header.match(/\btitle:\s*\{[\s\S]*?\bms:\s*"((?:\\.|[^"\\])*)"/)?.[1];

  if (!Number.isInteger(id) || !Number.isInteger(revision) || titleMsRaw === undefined) {
    throw new Error(`Could not parse id, revision, and Malay title for ${symbol}.`);
  }

  return {
    id,
    revision,
    title: { ms: parseStringLiteral(titleMsRaw) },
  };
}

function formatChapter(chapter) {
  return `id=${chapter.id}, revision=${chapter.revision}, title.ms=${JSON.stringify(chapter.title.ms)}`;
}

const canonical = parseCanonicalChapterOrder().map(parseCanonicalChapter);
const summaries = parseSummaryRows();
const failures = [];

if (summaries.length !== canonical.length) {
  failures.push(`Summary count ${summaries.length} does not match canonical chapter count ${canonical.length}.`);
}

const summaryIds = new Set();
for (const summary of summaries) {
  if (summaryIds.has(summary.id)) {
    failures.push(`Duplicate summary id ${summary.id}.`);
  }
  summaryIds.add(summary.id);
}

for (let index = 0; index < canonical.length; index++) {
  const expected = canonical[index];
  const actual = summaries[index];

  if (!actual) {
    failures.push(`Missing summary row for canonical chapter ${formatChapter(expected)}.`);
    continue;
  }

  if (
    actual.id !== expected.id ||
    actual.revision !== expected.revision ||
    actual.title.ms !== expected.title.ms
  ) {
    failures.push(
      [
        `Summary drift at CHAPTER_SUMMARIES[${index}].`,
        `  expected: ${formatChapter(expected)}`,
        `  actual:   ${formatChapter(actual)}`,
      ].join("\n"),
    );
  }
}

if (failures.length > 0) {
  console.error("Chapter summary drift detected:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Chapter summaries match ${canonical.length} canonical chapters.`);

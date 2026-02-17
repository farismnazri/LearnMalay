import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const sourceIconPath = path.join(
  projectRoot,
  "public/assets/titles/LearnMalayIcon.png",
);

const iconOutputs = [
  { outputPath: path.join(projectRoot, "public/icon-192x192.png"), size: 192 },
  { outputPath: path.join(projectRoot, "public/icon-512x512.png"), size: 512 },
  { outputPath: path.join(projectRoot, "app/icon.png"), size: 512 },
  { outputPath: path.join(projectRoot, "app/apple-icon.png"), size: 180 },
];

async function ensureSourceIconExists() {
  try {
    await fs.access(sourceIconPath);
  } catch {
    throw new Error(`Missing source icon: ${sourceIconPath}`);
  }
}

async function generateIcons() {
  await ensureSourceIconExists();

  for (const { outputPath, size } of iconOutputs) {
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await sharp(sourceIconPath).resize(size, size, { fit: "cover" }).png().toFile(outputPath);
    console.log(`Generated ${path.relative(projectRoot, outputPath)} (${size}x${size})`);
  }
}

generateIcons().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

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

const faviconOutputPath = path.join(projectRoot, "app/favicon.ico");
const faviconSizes = [16, 32, 48];

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
    await sharp(sourceIconPath)
      .resize(size, size, { fit: "cover" })
      .png({ palette: true, quality: 90, effort: 10 })
      .toFile(outputPath);
    console.log(`Generated ${path.relative(projectRoot, outputPath)} (${size}x${size})`);
  }

  await fs.mkdir(path.dirname(faviconOutputPath), { recursive: true });
  await fs.writeFile(faviconOutputPath, await createIcoFile(faviconSizes));
  console.log(
    `Generated ${path.relative(projectRoot, faviconOutputPath)} (${faviconSizes.join("/")})`,
  );
}

function createIcoDirectoryEntry({ size, offset, length }) {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size >= 256 ? 0 : size, 0);
  entry.writeUInt8(size >= 256 ? 0 : size, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(length, 8);
  entry.writeUInt32LE(offset, 12);
  return entry;
}

async function createBitmapIcon(size) {
  const rgba = await sharp(sourceIconPath)
    .resize(size, size, { fit: "cover" })
    .ensureAlpha()
    .raw()
    .toBuffer();
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);
  header.writeInt32LE(size, 4);
  header.writeInt32LE(size * 2, 8);
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  header.writeUInt32LE(0, 16);
  header.writeUInt32LE(size * size * 4, 20);
  header.writeInt32LE(0, 24);
  header.writeInt32LE(0, 28);
  header.writeUInt32LE(0, 32);
  header.writeUInt32LE(0, 36);

  const pixels = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 4;
      const dst = ((size - 1 - y) * size + x) * 4;
      pixels[dst] = rgba[src + 2];
      pixels[dst + 1] = rgba[src + 1];
      pixels[dst + 2] = rgba[src];
      pixels[dst + 3] = rgba[src + 3];
    }
  }

  const maskStride = Math.ceil(size / 32) * 4;
  return Buffer.concat([header, pixels, Buffer.alloc(maskStride * size)]);
}

async function createIcoFile(sizes) {
  const images = await Promise.all(
    sizes.map(async (size) => ({ size, data: await createBitmapIcon(size) })),
  );
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  let offset = header.length + images.length * 16;
  const entries = [];
  for (const image of images) {
    entries.push(createIcoDirectoryEntry({
      size: image.size,
      offset,
      length: image.data.length,
    }));
    offset += image.data.length;
  }

  return Buffer.concat([header, ...entries, ...images.map((image) => image.data)]);
}

generateIcons().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});

# Asset Guidance

This file supplements the repository-root `AGENTS.md` for files under `public/assets/`.

- Use the `assets` project for bounded asset work. Use the `learn-malay` project when references outside `public/assets/`, Git, release, or repo-wide workflows must change.
- Serve app assets through `/assets/...` paths and preserve case-sensitive path accuracy.
- Prefer optimized WebP for newly converted online raster assets. Do not create new AVIF outputs; preserve an existing AVIF only when its current reference or compatibility contract requires it. Keep PNG or SVG only when transparency, icon fidelity, source editing, or compatibility requires it.
- Preserve an existing filename only for a direct replacement. Use descriptive filenames for new assets or changed formats.
- Keep assets original or safely inspired; do not add direct copyrighted/franchise-copy artwork.
- Do not change app logic unless an asset reference must be updated.
- Confirm replaced and newly referenced paths exist. Run `npm run lint` if code references change, and `npm run build` if import or routing behavior changes.

## Raster Optimization Rules

- For large raster assets used online, prefer optimized WebP over PNG/JPG.
- When replacing a large PNG or JPG source asset, convert the final app-facing asset to optimized WebP unless there is a clear reason not to.
- Keep PNG only when transparency, pixel-perfect compatibility, source editing, or an existing direct replacement contract requires it.
- Keep SVG for simple icons, vector UI, and assets that benefit from resolution independence.
- If an existing app reference must remain unchanged, preserve the referenced filename for direct replacement.
- If changing file format or filename, update all app references and confirm they still use `/assets/...` public paths.
- Do not leave large unused PNG/JPG duplicates unless they are intentionally retained as source files and clearly named or located as source/reference material.

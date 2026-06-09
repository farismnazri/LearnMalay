---
name: asset-replacement-skill
description: Add, replace, optimize, or audit Learn Malay assets under public/assets, including backgrounds, borders, chapter artwork, minigame images, audio, WebP/AVIF conversion, and /assets reference updates. Use for direct asset replacements, new asset integration, raster optimization, or broken asset-path checks.
---

# Asset Replacement

Follow the root `AGENTS.md` and `public/assets/AGENTS.md`. Use the `learn-malay` project when references outside `public/assets/` must change.

## Inspect

1. Identify whether the task is a direct replacement, a new asset, or a format change.
2. Find every current reference with `rg` before renaming, removing, or changing an extension.
3. Inspect source and output dimensions, file size, transparency, animation, and visual quality.
4. Preserve unrelated source assets and app logic.

## Optimize

- Prefer WebP or AVIF for online loading where appropriate.
- Convert PNG/JPG source assets to optimized WebP or AVIF when replacing large raster assets.
- Use AVIF when its smaller output and target-browser support suit photographic or background artwork; use WebP for broad compatibility and transparency-friendly raster delivery.
- Keep PNG or SVG only when transparency, icon fidelity, source editing, or compatibility requires it.
- Preserve useful dimensions and avoid upscaling unless the task explicitly requires it.
- Compare output quality and byte size; do not accept an optimized format that is visibly degraded or larger without a clear reason.
- Use existing repository tooling or available image tools; do not add a dependency solely for a routine conversion.

## Integrate

- Preserve an existing referenced filename only for a direct replacement.
- Use descriptive filenames for new assets. When a format or filename changes, update every reference deliberately.
- Confirm app references still use public paths beginning with `/assets/...`; do not use filesystem paths or `public/assets/...` URLs in app code.
- Keep case-sensitive filenames and references aligned.
- Avoid changing app logic unless asset references must be updated.
- Keep artwork original or safely inspired; do not add direct copyrighted/franchise-copy assets.

## Validate

1. Confirm every changed `/assets/...` reference resolves to an existing file.
2. Check the final asset format, dimensions, file size, transparency, and visual quality.
3. Search for stale references to removed filenames or extensions.
4. Run `npm run lint` if code references changed.
5. Run `npm run build` if import, routing, or rendering behavior changed.

## Report

List assets added, replaced, converted, or removed; before/after formats and sizes for optimized raster assets; code references changed; and validation results.

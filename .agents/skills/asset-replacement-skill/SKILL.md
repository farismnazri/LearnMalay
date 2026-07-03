---
name: asset-replacement-skill
description: Add, replace, optimize, or audit Learn Malay assets under public/assets, including backgrounds, borders, chapter artwork, minigame images, audio, WebP conversion, archive mirroring, and /assets reference updates. Use for direct asset replacements, new asset integration, raster optimization, or broken asset-path checks.
---

# Asset Replacement

Follow the root `AGENTS.md` and `public/assets/AGENTS.md`. Use the `learn-malay` project when references outside `public/assets/` must change.

Canonical roots:

- App root: `/Users/FarisNazri/Documents/LearnMalay/learn-malay`
- Runtime asset root: `/Users/FarisNazri/Documents/LearnMalay/learn-malay/public/assets`
- Source archive root: `/Users/FarisNazri/Documents/LearnMalay/unused-png-archive/learn-malay`

Canonical conventions:

- Chapter folders stay as `ch1`, `ch2`, ..., `ch11`.
- Use lowercase kebab-case for new runtime asset folders and new app-facing filenames.
- Keep app references as `/assets/...` for files under `public/assets`.
- Runtime assets normally live under `public/assets`.
- Framework-required files may stay in their intentional locations, such as app icons, favicons, manifest icons, fonts, or audio/font files that are already deliberately outside `public/assets`.
- Use WebP only for converted online raster runtime assets. Do not create new AVIF outputs.
- Keep SVG, PNG, ICO, audio, font, or other non-WebP formats only when they are intentionally required.

Current cleaned examples:

- `public/assets/minigames/misi-membeli`
- `public/assets/minigames/misi-membeli/icons/barangan-kering`
- `public/assets/minigames/misi-membeli/icons/buah-sayur`
- `public/assets/minigames/misi-membeli/icons/daging-laut`
- `public/assets/minigames/misi-membeli/icons/peti-sejuk`
- `public/assets/chapters/ch7/ayam`
- `public/assets/chapters/ch7/ikan`
- `public/assets/chapters/ch7/kuih-muih`
- `public/assets/chapters/ch7/nasi`
- `public/assets/chapters/ch7/sotong`
- `public/assets/characters/profiles`

## Inspect

1. Treat pasted user paths as source inputs. They may come from `Downloads`, `Desktop`, `Documents`, or another temporary folder.
2. Determine the correct final runtime destination under the app root before moving, renaming, or converting anything.
3. Identify whether the task is a direct replacement, a new asset, a path cleanup, or a format change.
4. Find every current reference with `rg` before renaming, moving, deleting, or changing an extension.
5. Inspect source and output dimensions, file size, transparency, animation, and visual quality.
6. Preserve unrelated source assets, app logic, learner content, release metadata, package files, generated files, and prompt-context files.

## Optimize

- Convert PNG, JPG, and JPEG raster source assets to optimized WebP for runtime use unless the original format is intentionally required.
- Do not create new AVIF outputs or parallel WebP/AVIF duplicates.
- Keep PNG, SVG, ICO, audio, or font formats only when transparency, icon fidelity, source editing, framework requirements, or compatibility intentionally require them.
- Preserve useful dimensions and avoid upscaling unless the task explicitly requires it.
- Compare output quality and byte size; do not accept a converted asset that is visibly degraded or larger without a clear reason.
- Use existing repository tooling or available image tools; do not add a dependency solely for a routine conversion.

## Integrate

* Preserve an existing referenced filename only for a direct replacement.
* Use descriptive app-facing filenames for new assets. New runtime filenames and folders should follow lowercase kebab-case unless an existing canonical pattern already governs that area.
* Confirm app references still use public paths beginning with `/assets/...`; do not use filesystem paths or `public/assets/...` URLs in app code.
* Keep case-sensitive filenames and references aligned.
* Do not leave editable or source-only files such as `.ai`, `.psd`, `.xcf`, `.fig`, `.sketch`, or large source PNG/JPG files inside `public/assets` unless explicitly required.
* Avoid changing app logic unless asset references must be updated.
* Keep artwork original or safely inspired; do not add direct copyrighted/franchise-copy assets.
* For a visual refresh of an existing asset, preserve the existing app-facing runtime filename and replace the file in place after conversion. Do not create `_v2`, `V2`, `current`, or version-suffixed runtime filenames unless both old and new assets must remain referenced by app content at the same time.
* Before changing any filename, search current references with `rg` and prefer keeping existing referenced filenames to avoid unnecessary code churn.
* Treat source filenames as hints, not final app-facing names. Correct obvious typo, case, or camelCase mismatches only after comparing against existing runtime filenames and references.

## Archive Mirror

1. After conversion or placement, move the original source file into the external source archive.
2. The archive path must mirror the final app-root destination path exactly, relative to `/Users/FarisNazri/Documents/LearnMalay/learn-malay`.
3. Only the root prefix and file extension or source format may differ between the runtime output and the archived source.
4. Create missing archive folders when needed.
5. Do not include `.DS_Store` files in runtime assets or archive mirror rules.
6. Do not update unrelated archive branches during a targeted asset task.
7. If the archive mirror destination already exists, do not overwrite it silently. Move the existing archived source into a sibling `_history/` folder with a clear suffix such as `.v1` or a timestamp, then place the new source at the canonical mirrored path.
8. Keep the latest source file at the exact mirror path. Keep older sources only under `_history/`.


Mirror example:

- Runtime output: `/Users/FarisNazri/Documents/LearnMalay/learn-malay/public/assets/chapters/ch1/ch1-awak.webp`
- Archived source: `/Users/FarisNazri/Documents/LearnMalay/unused-png-archive/learn-malay/public/assets/chapters/ch1/ch1-awak.png`
- Incorrect archive path: `/Users/FarisNazri/Documents/LearnMalay/unused-png-archive/learn-malay/public/assets/chapters/chapter1/ch1-awak.png`

## Validate

1. Confirm every changed `/assets/...` reference resolves to an existing file.
2. Check the final asset format, dimensions, file size, transparency, and visual quality.
3. Search for stale references to removed filenames, folders, or extensions.
4. Confirm the archive mirror path exists and matches the runtime destination structure.
5. Run `npm run lint` if code references changed.
6. Run `npm run build` if import, routing, or rendering behavior changed.

## Report

List assets added, replaced, converted, moved, archived, or removed; before/after formats and sizes for optimized raster assets; runtime destinations; archive mirror destinations; code references changed; and validation results. State clearly whether no commit or push was performed.

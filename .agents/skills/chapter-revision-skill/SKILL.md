---
name: chapter-revision-skill
description: Revise Learn Malay chapter lessons, multilingual chapter copy, page structure, chapter images, Aku-Aku helper text, or learner-visible chapter revision numbers. Use for bounded chapter-content work and for auditing whether shipped chapter edits require a revision bump.
---

# Chapter Revision

Follow the root `AGENTS.md` and `src/lib/chapters/AGENTS.md`. Use the `learn-malay` project when the task crosses the chapter-content scope.

## Inspect

1. Identify the chapter, requested learner outcome, and allowed scope.
2. Read the chapter module and the relevant shared contracts:
   - `src/lib/chapters/chapter-XX.ts`
   - `src/lib/chapters/types.ts`
   - `src/lib/chapters/index.ts`
3. Read `src/lib/akuAku/chapter-XX.ts` only when helper dialog copy is involved.
4. Inspect `app/chapter/[id]/page.tsx` only when existing types cannot express the requested behavior.
5. Record the current `revision`, stable IDs, page order, and asset references before editing.

## Edit

- Preserve the typed `ChapterContent` structure and stable IDs unless a structural change requires new IDs.
- Keep required `{ ms, en, es }` translations present, non-empty, concise, and equivalent in meaning.
- Write natural spoken Malaysian Malay; avoid awkward literal translations.
- Keep examples learner-friendly and internally consistent with answer options, hints, and feedback.
- When adding, removing, or reordering pages, verify navigation, completion, and final-chapter behavior remain coherent.
- Keep asset references as `/assets/...` paths and confirm the files exist.
- Increment the chapter `revision` only for shipped learner-visible changes that returning users should be invited to review. Do not bump it for formatting, comments, or internal refactors.
- Do not change unlock/progress behavior or app release metadata unless explicitly requested.

## Validate

1. Review the diff for missing translations, stale IDs, incorrect page order, and broken asset paths.
2. Run `npm run lint`.
3. Run `npm run build` when shared types, page structure, renderer behavior, or routing changed.

## Report

List changed files, chapter and learner-facing outcome, whether the content revision changed and why, structural or asset-reference changes, and validation results.

---
name: learn-malay-release-skill
description: Close or publish a Learn Malay release by selecting the SemVer bump, synchronizing package/changelog/Adventure Log/roadmap metadata, validating release drift, creating the release commit and annotated tag, and pushing only when requested. Use for version bumps, release drift repairs, release tagging, or release publication; do not use for ordinary implementation commits.
---

# Learn Malay Release

Work from the true repository root and follow the root `AGENTS.md`.

## Inspect

1. Run `git status --short` and identify unrelated changes that must remain untouched.
2. Read the current version and release state from:
   - `package.json` and `package-lock.json`
   - `CHANGELOG.md`
   - `src/lib/adventureLog.ts`
   - `ROADMAP.md`
   - `src/lib/appVersion.ts`
   - `scripts/check-release-drift.mjs`
3. Inspect the changes being released and existing tags before selecting a bump.
4. When the release includes chapter content changes, inspect chapter revision control before selecting the release:
   - Read `src/lib/chapterUpdates.ts` to confirm how the app compares completed and current chapter revisions.
   - Inspect every changed `src/lib/chapters/chapter-XX.ts` file and its `revision` field.
   - Inspect relevant chapter revision/version contracts, including `src/lib/chapters/types.ts` and any changed completed-revision tracking fields used by the app.
   - Confirm each meaningfully changed learner-facing chapter increments `revision` exactly once from its last released value; formatting-only or internal renderer changes do not require a chapter revision bump.

## Decide

- Read the current version; never guess it.
- Recommend `MAJOR`, `MINOR`, or `PATCH`, the exact next version, a release commit subject, a short changelog note, and matching multilingual Adventure Log text.
- When chapter content changed, include the chapter revision increment and learner update-notice context in the release notes.
- Do not change release metadata until the user has asked to close, bump, or publish a release.
- Do not invent historical release commits or replace existing release tags.

## Synchronize

1. Update `package.json` and `package-lock.json` to the same next version.
2. Move the shipped items into a dated `CHANGELOG.md` release entry while preserving unrelated `Unreleased` work.
3. Add the matching top entry in `src/lib/adventureLog.ts`.
   - Keep `added`, `changed`, and `fixed` arrays present.
   - Give every written item non-empty `ms`, `en`, and `es` text.
   - Leave a category empty instead of fabricating a release item.
4. Update the `ROADMAP.md` current version baseline.
5. Confirm `src/lib/appVersion.ts` still derives the visible version correctly; do not hardcode a duplicate version.
6. For chapter releases, re-check the changed chapter revision fields against the last released version and confirm `src/lib/chapterUpdates.ts` still recognizes the new revision.

## Validate And Publish

1. Before the release commit, run:
   - `npm run lint`
   - `npm run build`
2. Commit only the intended release artifacts with:
   `chore(release): bump version to vX.Y.Z`
3. Create the annotated tag on that release commit:
   `git tag -a vX.Y.Z <release-commit-sha> -m "Release vX.Y.Z"`
4. Run `npm run check:release-drift` after the annotated tag exists.
5. Verify the tag points to the intended release commit.
6. Push the branch and annotated tag only when the user explicitly requested publication.

## Report

Include the bump type and final version, changed release artifacts, release commit hash, annotated tag, validation results, push results if applicable, and final `git status --short`.

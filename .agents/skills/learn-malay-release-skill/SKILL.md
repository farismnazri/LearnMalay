---
name: learn-malay-release-skill
description: Close or publish a Learn Malay release by selecting the SemVer bump, synchronizing package/changelog/Adventure Log/roadmap metadata, validating release drift, creating the release commit and annotated tag, and pushing only when requested. Use for version bumps, release drift repairs, release tagging, or release publication; do not use for ordinary implementation commits.
---

# Learn Malay Release

Work from the true repository root and follow the root `AGENTS.md`.

## Phrase Aliases

- `plan close update` and `plan close` mean plan-only preflight. Inspect first, recommend the SemVer bump, run safe validation when appropriate, and report readiness, blockers, and the exact execution phrase to use next. Never stage, commit, tag, or push.
- `close update`, `close this update`, and an explicit request to close or publish mean execution mode. Synchronize and review the release first, stage only the intended release set, then run `npm run release:publish -- --version X.Y.Z`.
- Ambiguous requests never imply permission to publish or push.
- Use `npm run release:plan` as the repeatable read-only preflight command.

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

1. Review the synchronized release and stage only the intended release files. The publisher never stages files automatically.
2. Run `npm run release:publish -- --version X.Y.Z` only for an execution phrase or explicit publish request.
3. The staged-only publisher requires a clean `main` aligned with `origin/main`, synchronized metadata, all five required release metadata files staged, and an unused local and remote tag.
4. The publisher runs lint and build, creates `chore(release): bump version to vX.Y.Z`, creates the annotated tag, runs the normal release-drift check, verifies the tag, and atomically pushes `main` and the tag.
5. Never run the publisher for a plan-only or ambiguous request.

## Report

- For plan-only preflight, report what is hot/ready, what would be released, the recommended bump and exact next version, blockers, validation results, and the exact close/update execution phrase to use next.
- For execution mode, include the bump type and final version, changed release artifacts, release commit hash, annotated tag, validation results, push results, and final `git status --short`.

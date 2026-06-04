# AGENTS.md

## Commit Discipline
- Use Conventional Commits for normal work: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
- Prefer scoped subjects when useful (example: `feat(minigames): add ...`).
- Keep commit intent aligned with SemVer impact.

## Meaningful Change Scope
Treat all of the following as meaningful committed updates that must follow the release-note workflow:
- Feature additions.
- Bug fixes.
- UI fixes.
- Content/copy fixes.
- Multilingual text fixes.
- Refactors that meaningfully affect app behavior or maintenance.
- Release metadata fixes.

## SemVer Rules
- `MAJOR`: breaking behavior or contract changes.
- `MINOR`: backward-compatible feature/content additions.
- `PATCH`: backward-compatible fixes/polish/docs/content corrections tied to shipped behavior (including small `+0.0.1` updates).

## Codex Required Recommendation (Every Meaningful Commit)
Before finalizing a meaningful committed change, Codex must recommend all of the following:
- Bump type: `MAJOR`, `MINOR`, or `PATCH`.
- Exact next version computed from current `package.json`.
- Commit subject (Conventional Commit style).
- Short release-note message for `CHANGELOG.md`.
- Matching Adventure Log entry text for `src/lib/adventureLog.ts` (`added`, `changed`, `fixed`; `ms`/`en`/`es` non-empty).

## Release Discipline
- Do not bump version on every commit; use a dedicated release commit when publishing:
  - `chore(release): bump version to vX.Y.Z`
- No visible app version may exist without a corresponding release message.
- If `package.json` version changes, the same release cycle must include matching entries in both:
  - `CHANGELOG.md`
  - `src/lib/adventureLog.ts`
- A release is complete only when all release artifacts are synchronized.

## Required Release Artifacts
For every release bump, update all of the following to the same version/date:
- `package.json` (canonical version)
- `CHANGELOG.md` (release notes)
- `src/lib/adventureLog.ts` (in-app release notes with `added`, `changed`, `fixed`)

## Tag Policy
- Create an annotated Git tag for every release commit:
  - `git tag -a vX.Y.Z <release-commit-sha> -m "Release vX.Y.Z"`
- Push the tag with the release branch.

## Drift Guardrail
- If `package.json`, `CHANGELOG.md`, and `src/lib/adventureLog.ts` disagree on latest version, fix drift before treating the release as done.
- If app UI displays `vX.Y.Z`, `CHANGELOG.md` and `src/lib/adventureLog.ts` must both contain `X.Y.Z`.

## Release Checklist
1. Update `package.json` version.
2. Add/update release entry in `CHANGELOG.md`.
3. Add/update release entry in `src/lib/adventureLog.ts`.
4. Commit using `chore(release): bump version to vX.Y.Z`.
5. Create annotated tag `vX.Y.Z` on the release commit.
6. Verify:
   - `package.json` version == latest changelog version
   - `package.json` version == latest adventure log version
   - release tag points to the intended release commit

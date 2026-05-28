# AGENTS.md

## Commit Discipline
- Use Conventional Commits for normal work: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
- Prefer scoped subjects when useful (example: `feat(minigames): add ...`).
- Keep commit intent aligned with SemVer impact.

## Release Discipline
- Do not bump version on every commit.
- Use a dedicated release commit when publishing:
  - `chore(release): bump version to vX.Y.Z`
- A release is complete only when all release artifacts are synchronized.

## SemVer Rules
- `MAJOR`: breaking behavior or contract changes.
- `MINOR`: backward-compatible feature/content additions.
- `PATCH`: backward-compatible fixes/polish/docs corrections tied to shipped behavior.

## Required Release Artifacts
For every release bump, update all of the following to the same version/date:
- `package.json` (canonical version)
- `CHANGELOG.md` (release notes)
- `src/lib/adventureLog.ts` (in-app release notes with `added`, `changed`, `fixed`)

## Release Message Policy
- Keep release notes in both `CHANGELOG.md` and `src/lib/adventureLog.ts`.
- For each Adventure Log entry, `ms`, `en`, and `es` text fields are required and non-empty.

## Tag Policy
- Create an annotated Git tag for every release commit:
  - `git tag -a vX.Y.Z <release-commit-sha> -m "Release vX.Y.Z"`
- Push the tag with the release branch.

## Drift Guardrail
- If `package.json`, `CHANGELOG.md`, and `src/lib/adventureLog.ts` disagree on latest version, fix drift before treating the release as done.

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

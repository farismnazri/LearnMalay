# Learn Malay Repository Guidance

## Guidance Scope
- This directory is the true repository and app root. Every Codex prompt must use `learn-malay project` as its first line and operate from this directory.
- Run all commands from this directory, including bounded chapter, minigame, and asset work.
- A nested `AGENTS.md` supplements this file for its subtree. Follow the closest applicable guidance when it is more specific; repository-wide safety and release rules still apply.
- Use exact file paths and bounded scopes to focus work. Nested `AGENTS.md` files and repo-local skills provide local rules; they are not separate projects.

## Working Rules
- Inspect `git status --short` before editing and preserve unrelated user changes.
- Keep edits limited to the requested behavior or workflow.
- Do not change app runtime behavior, UI, content, assets, dependencies, or release metadata unless the task requires it.
- Do not commit, tag, or push unless the user asks.

## Commit Discipline
- Use Conventional Commits for normal work: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`.
- Prefer a useful scope, for example `feat(minigames): add ...`.
- Keep commit intent aligned with SemVer impact.
- Internal planning, Codex guidance, and local prompt-context changes do not require an app version bump unless the user asks to publish a release.

## Meaningful Committed Changes
Before finalizing a meaningful committed app change, recommend:
- Bump type: `MAJOR`, `MINOR`, or `PATCH`.
- Exact next version computed from the current `package.json`.
- Conventional Commit subject.
- Short `CHANGELOG.md` release-note message.
- Matching `src/lib/adventureLog.ts` entry text under `added`, `changed`, and `fixed` as relevant, with non-empty `ms`, `en`, and `es` translations.

Meaningful app changes include features, bug/UI/content/copy/multilingual fixes, behaviorally significant refactors, and release metadata fixes.

## SemVer
- `MAJOR`: breaking behavior or contract changes.
- `MINOR`: backward-compatible feature or content additions.
- `PATCH`: backward-compatible fixes, polish, or corrections tied to shipped behavior.

## Release Discipline
- Do not bump the version on every commit. Publish with a dedicated release commit:
  `chore(release): bump version to vX.Y.Z`
- For a release, synchronize:
  - `package.json` and `package-lock.json`
  - `CHANGELOG.md`
  - `src/lib/adventureLog.ts`
  - `ROADMAP.md` current version baseline
- No visible app version may exist without matching changelog and Adventure Log entries.
- Run `npm run lint`, `npm run build`, and `npm run check:release-drift` before treating a release as complete.
- Create an annotated tag on the release commit:
  `git tag -a vX.Y.Z <release-commit-sha> -m "Release vX.Y.Z"`
- Push the release branch and tag only when publishing was explicitly requested.

# Learn Malay Repo Context for ChatGPT

Last updated: 2026-06-11

Actual app root:
`/Users/FarisNazri/Documents/LearnMalay/learn-malay`

## Codex project targets
Every generated Codex prompt starts with a project-target line, followed by the model/reasoning line.

- `learn-malay project`: true repo/app root and safest default for Git, releases, builds, workflow/configuration, cross-area work, and unclear tasks.
- `chapters project`: bounded chapter-content work.
- `minigames project`: bounded minigame work.
- `assets project`: bounded asset addition, replacement, optimization, and reference checks.

Switch back to `learn-malay project` when focused work crosses scopes or needs repo-root operations. Root `AGENTS.md` applies repository-wide; nested `AGENTS.md` files add more specific guidance for their subtrees.

## Snapshot
This is a Next.js 16 App Router + React 19 + TypeScript learning game for spoken Malaysian Malay.

Current implemented scope includes:
- Crash/PS1-inspired UI with local font/assets
- title -> user -> map -> chapter progression flow
- 11 TypeScript-backed lesson chapters
- Aku-Aku helper dialogs with `{ ms, en, es }` text
- 7 unlockable minigames (numbers, word-match, wordsearch, currency, makan-apa, misi-membeli, arah-jalan)
- users, sessions, progress, and highscores
- public Adventure Log page at `/updates` with visible app version label

## Main folders (current)
- `app/`: Next.js routes/pages, API routes, layout, manifest, global CSS
- `app/chapter/[id]/`: main chapter renderer
- `app/minigames/`: minigame hub, intro pages, play pages, highscores
- `app/updates/`: public release/adventure log page
- `app/api/`: users, login/current session, progress, admin verify/rotate password, highscores
- `src/components/`: shared game UI/navigation components
- `src/lib/`: chapters, Aku-Aku content, minigame data, client helpers, shared types, version/release metadata
- `src/server/`: MongoDB/in-memory data layer, repos, auth/session helpers
- `public/assets/`: backgrounds, characters, borders, chapter assets, minigame assets, audio
- `scripts/`: `release.mjs`, `check-release-drift.mjs`, `generate-project-map.mjs`, `generate-pwa-icons.mjs`, `phase6-mobile-qa.mjs`

Note:
- App Router is under root `app/`.
- `src/app/` exists as empty legacy folders and is not the active route tree.

## Tech stack
- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS v4
- SWR
- MongoDB when `MONGODB_URI` is set
- in-memory fallback when `MONGODB_URI` is missing
- HTTP-only cookie sessions via API routes

## Versioning and release context (important)
Learn Malay now uses Semantic Versioning (`MAJOR.MINOR.PATCH`).
Current canonical version: `0.10.0` (read from `package.json`).
Current `v0.10.0` release commit: `d63ef2d14c4f92b0596972ad555d0b92b2ac9ae3`.

Source-of-truth files:
- `package.json` -> canonical app version field
- `src/lib/appVersion.ts` -> derives `APP_VERSION`/`APP_VERSION_LABEL` from `package.json`
- `CHANGELOG.md` -> human release log
- `src/lib/adventureLog.ts` -> in-app release data shown on `/updates`
- `ROADMAP.md` -> maintainer roadmap with current version baseline
- `scripts/check-release-drift.mjs` -> release metadata and annotated tag guard
- `scripts/release.mjs` -> staged-only release preflight and publisher

Hard guardrail:
- No visible app version may exist without a corresponding release message in both `CHANGELOG.md` and `src/lib/adventureLog.ts`.
- `npm run check:release-drift` must pass before a release is treated as complete.
- The drift check derives released versions from `CHANGELOG.md` headers and requires matching annotated `vX.Y.Z` Git tags.
- The drift check fails if `package.json`, `CHANGELOG.md`, `src/lib/adventureLog.ts`, `ROADMAP.md`, or required annotated release tags drift.
- The drift check must not create or push tags automatically.
- Historical release tags should only be created when the release commit is unambiguous; do not invent historical commit guesses.

For version/release tasks, ChatGPT should tell Codex to inspect and sync those files together.
Use file-inspection language like "read current version from package.json first".
Future release prompts should explicitly require creating an annotated tag for the release commit and pushing that tag after validation.

Release phrase aliases and commands:
- `plan close` and `plan close update` mean read-only release preflight. Use the release skill and `npm run release:plan`; never stage, commit, tag, or push.
- `close update` and `close this update` mean the full staged-only release publish flow. Synchronize and review metadata, stage only intended files, then run `npm run release:publish -- --version X.Y.Z`.
- `npm run check:release-metadata` validates synchronized release metadata before the new tag exists.
- `npm run test:release` validates the release helper using temporary repositories and remotes.
- Internal workflow automation and local prompt-context changes do not require an app version bump unless a release is explicitly requested.
- Never run the release publisher for an ordinary internal workflow commit.

## SemVer intent for prompting
- MAJOR: breaking behavior/API/data-contract changes
- MINOR: backward-compatible feature additions (`+0.1.0`)
- PATCH: backward-compatible bug fixes, UI fixes, copy fixes, multilingual text fixes, release metadata fixes, and meaningful maintenance refactors without behavior break (`+0.0.1`)

## Required recommendation format for meaningful committed updates
When prompting Codex for meaningful committed changes, require it to propose:
- bump type: `MAJOR`, `MINOR`, or `PATCH`
- exact next version based on current `package.json`
- commit subject
- short release-note message for `CHANGELOG.md`
- matching Adventure Log entry for `src/lib/adventureLog.ts`

## Important conventions
- Translation shape is typically `{ ms, en, es }`.
- UI language type is `UiLang = "ms" | "en" | "es"`.
- UI language key: `learnMalay.uiLang.v1` (localStorage).
- Imports use alias `@/*` -> `src/*`.
- Assets are referenced via public paths (`/assets/...`).
- Runtime-sensitive API routes use `export const runtime = "nodejs"`.

## Common files to inspect before edits
- `package.json`
- `app/layout.tsx`
- `app/page.tsx`
- `app/user/page.tsx`
- `app/map/page.tsx`
- `app/chapter/[id]/page.tsx`
- `app/minigames/...`
- `app/updates/page.tsx`
- `src/lib/chapters/types.ts`
- `src/lib/chapters/index.ts`
- `src/lib/chapters/chapter-XX.ts`
- `src/lib/akuAku/...`
- `src/lib/minigameUnlocks.ts`
- `src/lib/appVersion.ts`
- `src/lib/adventureLog.ts`
- `src/server/db.ts`
- `app/globals.css`

## Validation commands
Run from `/Users/FarisNazri/Documents/LearnMalay/learn-malay`:

`npm run lint`
`npm run test:release`
`npm run release:plan`
`npm run check:release-metadata`
`npm run check:release-drift`
`npm run build`
`npm run dev`
`npm run generate:pwa-icons`

## Avoid editing/deep inspection unless required
- `node_modules/`
- `.next/`
- `out/`
- `build/`
- `coverage/`
- `.git/`
- `.env*`
- `.vercel/`
- `next-env.d.ts`
- `*.tsbuildinfo`
- `.DS_Store`
- `output/`
- `tmp/`
- `reports/`

## Practical risks to remember
- Repo root confusion: project is nested in `learn-malay` and commands must run there.
- Core render files are large (`app/chapter/[id]/page.tsx`, minigame play pages), so narrow scope carefully.
- Without `MONGODB_URI`, users/progress/highscores reset on server restart.
- `LEARN_MALAY_ADMIN_PASSWORD` is required outside development.
- Version metadata can drift if only one file is updated; release tasks must cross-check `package.json`, `CHANGELOG.md`, `src/lib/adventureLog.ts`, `ROADMAP.md`, and `npm run check:release-drift`.
- A common failure mode is bumping `package.json` alone; this must be treated as incomplete until both release-note sources, the roadmap baseline, and annotated release-tag coverage are updated.
- Current release tags from `v0.7.0`, `v0.7.2` through `v0.7.7`, `v0.8.0` through `v0.8.2`, and `v0.9.0` through `v0.9.3` are present locally and remotely as annotated tags; existing annotated tags were not overwritten.

# Learn Malay App - Master Design + Implementation Context

Last updated: 2026-06-11

## 1. Product Vision
Learn Malay is a Crash/PS1-inspired web game that teaches spoken Malaysian Malay through short chapter lessons and minigames.

Core product intent:
- game-first feel
- short, approachable lessons
- encouraging tone
- clear progression and unlocks

## 2. Current Scope (Implemented)
- Title screen at `/`
- User/login page at `/user`
- World map at `/map`
- Chapter pages at `/chapter/[id]` for chapters 1-11
- Minigame hub at `/minigames`
- Minigame highscores at `/minigames/highscores`
- Public Adventure Log page at `/updates`

Current minigame set:
- numbers
- word-match
- wordsearch
- currency
- makan-apa
- misi-membeli
- arah-jalan

## 3. Visual Direction (Crash/PS1)
The app should feel like a playful PS1 game, not a modern SaaS UI.

Style rules:
- chunky controls and rounded panels
- strong contrast and readable title treatment
- large tap targets and mobile-friendly spacing
- nostalgic textures/gradients are acceptable
- avoid glassmorphism and sterile minimalist styling

Typography rules:
- use local Crash-like display font (`public/fonts/crash-a-like.ttf`) for major title moments
- keep body text highly readable on busy backgrounds

Motion rules:
- gentle bounce/wobble/hover transitions
- no harsh or abrupt motion
- feedback should be playful, not punishing

## 4. UX Flow Rules
Expected flow:
`/` -> `/user` (if needed) -> `/map` -> `/chapter/[id]` -> minigames unlock with progress.

Current title-screen behavior:
- `START` is available and routes user forward:
  - active user exists -> `/map`
  - no active user -> `/user`
- `SELECT USER` always routes to `/user`
- version chip links to `/updates`

Map rules:
- chapters unlock by progress
- admin/demo roles can unlock everything

## 5. Learning + Content Model
Language/content principles:
- spoken Malaysian Malay focus
- short examples and practical phrases
- low jargon

Translation shape:
- multilingual text usually uses `{ ms, en, es }`
- UI language key in localStorage: `learnMalay.uiLang.v1`

Content implementation reality:
- chapter content is TypeScript modules in `src/lib/chapters/`
- helper dialog content is in `src/lib/akuAku/`
- content is not Markdown-driven in the current app

## 6. Architecture Reality
Stack:
- Next.js 16 App Router + React 19 + TypeScript
- Tailwind v4
- SWR for client fetching

Key folders:
- `app/` route tree and API routes
- `src/components/` reusable UI
- `src/lib/` content/types/client helpers/version metadata
- `src/server/` storage/auth/session internals
- `public/assets/` game visuals/audio

API surface (high level):
- `/api/users`
- `/api/users/login`
- `/api/users/current`
- `/api/users/progress`
- `/api/users/verify-admin`
- `/api/users/admin/rotate-password`
- `/api/highscores`

## 7. Data, Session, and Roles
Storage behavior:
- MongoDB is used when `MONGODB_URI` is present
- otherwise app falls back to in-memory server storage

Operational caveat:
- in-memory mode resets users/progress/highscores on server restart

Roles:
- `admin`, `demo`, `user`
- admin can manage users and reset highscores
- demo/admin can unlock all chapters/minigames

Security/env:
- `LEARN_MALAY_ADMIN_PASSWORD` required outside development
- admin password rotation uses `/api/users/admin/rotate-password`

## 8. Versioning Policy (SemVer)
Learn Malay now follows Semantic Versioning:
`MAJOR.MINOR.PATCH`
Current canonical version is `0.10.0` in `package.json`.
Current `v0.10.0` release commit is `d63ef2d14c4f92b0596972ad555d0b92b2ac9ae3`.

Meaning:
- MAJOR: breaking changes (API/data-contract/behavior break)
- MINOR: backward-compatible feature additions (`+0.1.0`)
- PATCH: backward-compatible bug fixes, regressions, UI/content/copy fixes, multilingual text fixes, and release metadata fixes (`+0.0.1`)

Primary version sources:
- `package.json` (canonical version)
- `src/lib/appVersion.ts` (UI label source)
- `CHANGELOG.md` (release notes)
- `src/lib/adventureLog.ts` (in-app release entries shown on `/updates`)
- `ROADMAP.md` (current roadmap baseline)
- `scripts/check-release-drift.mjs` (release metadata and annotated tag validation)
- `scripts/release.mjs` (staged-only release preflight and publisher)

Release rule:
- no visible app version should exist without a matching release message in both `CHANGELOG.md` and `src/lib/adventureLog.ts`
- release-oriented changes should keep those files consistent
- do not hardcode or guess version numbers; read current files first
- `npm run check:release-drift` is required for release/version tasks
- release tags must be annotated `vX.Y.Z` tags that match released versions derived from `CHANGELOG.md`
- the drift check must not create or push tags automatically
- historical tags should only be added when the release commit is unambiguous

Release workflow aliases:
- `plan close` and `plan close update` are read-only preflight requests. Run `npm run release:plan`; do not stage, commit, tag, or push.
- `close update` and `close this update` authorize the full staged-only publish flow after release metadata is synchronized and reviewed.
- The publish command is `npm run release:publish -- --version X.Y.Z`.
- `npm run check:release-metadata` validates pre-tag metadata; `npm run test:release` validates the helper.
- Internal workflow automation does not itself require an app version bump or release tag.

## 9. Commit Message + Release Note Guidance
When ChatGPT writes Codex prompts for commit/release work, ask for:
- SemVer bump type recommendation (`MAJOR`/`MINOR`/`PATCH`) with short rationale
- exact next version derived from current `package.json`
- commit subject that matches bump intent
- short `CHANGELOG.md` release-note message
- matching `src/lib/adventureLog.ts` release entry (`ms`/`en`/`es`, grouped by Added/Changed/Fixed when relevant)
- release validation status including `npm run check:release-drift`
- annotated tag creation for the release commit and confirmation that the tag was pushed after validation

Practical commit style:
- feature work -> `feat(...)`
- bug fix -> `fix(...)`
- documentation/process -> `docs(...)`
- maintenance/refactor -> `chore(...)` or `refactor(...)`

Good release-note tone:
- user-facing outcome first
- technical details second
- short, concrete, and verifiable

## 10. Out of Scope (Still Generally True)
Not core today unless explicitly requested:
- multiplayer
- live online social features
- voice pronunciation engine
- broad gamification systems (streak economy, battle modes)

## 11. Prompting Guardrails for Design Tasks
When requesting design/UI changes via Codex:
- keep Crash/PS1 vibe intact
- keep mobile layout working
- avoid broad visual rewrites unless explicitly requested
- specify exact pages/components/files and validation commands

## 12. Status
This document is a living context file for ChatGPT prompt planning.
Treat it as operationally current and update when architecture or release workflow changes.

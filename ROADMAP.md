# Learn Malay Product Roadmap

Updated: 2026-08-16
Current version baseline: `0.18.0`

## Purpose
`ROADMAP.md` is the maintainer-facing planning and execution doc.

It tracks:
- current product state,
- outcome-level progress backfill,
- upcoming priorities and done-criteria.

It does **not** replace release notes.

## Doc Split (No Redundancy)
- Adventure Log + Changelog:
  - user-facing release details and version-by-version notes.
- Roadmap (this file):
  - internal status, priorities, blockers/risks, and what to do next.

## Current Snapshot
- Product:
  - 11 chapter learning flow across 3 worlds.
  - 7 minigames live: numbers, word-match, wordsearch, currency, makan-apa, misi-membeli, arah-jalan.
  - Public updates page (`/updates`) with release history shown in-app.
- Platform:
  - Next.js 16 + React 19 + TypeScript + Tailwind v4.
  - MongoDB-backed storage when configured, with in-memory fallback in dev.
  - Roles and controls: `user`, `demo`, `admin`; admin security hardening in place.
- Current priorities:
  - `Now`: close the remaining content quality gaps (especially Ch10 placeholder assets/content polish).
  - `Next`: add repeatable release and QA automation.
  - `Later`: expand gameplay/features after quality + process baseline.

## Backfill Since 2026-02-20

### 1) Content And Gameplay Expansion
- Expanded chapter coverage and lesson content through the current 11-chapter structure.
- Added and integrated minigame set progression, including Misi Membeli and Arah Jalan MVP.
- Improved chapter activity implementations and type-driven chapter card rendering stability.
- Refined chapter-specific flows (including Chapter 8 single-page flow and Chapter 2 family-tree refinements).
- Continued dialogue/content rewrites for originality and quality normalization.

### 2) Platform, Storage, And Security Hardening
- Migrated core user/highscore persistence from SQLite-era approach to MongoDB-backed server storage.
- Added stronger session/auth safeguards and locked sensitive admin-facing flows.
- Added admin password rotation endpoint and related auth hardening (including throttling/audit-oriented controls).
- Introduced gated demo mode with restricted persistence behavior.
- Standardized user/account handling for admin management and progress integrity.

### 3) Mobile, Responsive, And Visual Stabilization
- Completed mobile roadmap execution (responsive/touch hardening across major routes and minigames).
- Shipped the `0.13.0` mobile adaptation release for iPhone portrait usability across landing, user, map, chapter, PWA, and Aku-Aku surfaces.
- Ran and stored Phase 6 mobile QA report coverage for core user flow and minigame checks.
- Refined iPad Safari/title/chapter layouts and minigame readability on constrained viewports.
- Unified app-wide page background behavior to chapter-style scenic layer treatment.
- Improved map/minigame/header visual consistency and global interaction polish.

### 4) Release Process And Product Operations
- Introduced SemVer release model and in-app public update surface (`/updates` + visible version label).
- Established release metadata chain across version, changelog, and adventure log records.
- Backfilled and synced `0.6.0` metadata to remove release drift.
- Synced `0.7.0` multilingual copy release metadata so the visible app version matched public release records.
- Shipped `0.7.1` as a patch release for the Arah Jalan minigame hub visual update.
- Added `AGENTS.md` release discipline to standardize commit/release/tag behavior.
- Ignored local planning context folders to reduce accidental noise in release commits.
- Shipped `0.13.1` as a patch release for page-load transfer-size optimization, reproducible chapter-summary/PWA icon checks, and runtime asset path hygiene.
- Shipped `0.13.3` as a patch release for refreshed Chapter 4, 5, 6, 8, and 9 artwork, cleaned chapter runtime paths, and placeholder retirement in the affected chapter asset sets.
- Shipped `0.14.0` as a minor release for the Arah Jalan dynamic runtime map, dedicated minigame WebP assets, and readability-focused play UI polish.
- Shipped `0.15.0` as a minor release for streak-based Arah Jalan highscores, game-specific ranking support, and the admin-login regression fix plus coverage for the shared auth flow.
- Shipped `0.15.1` as a patch release for clearer Chapter 1 plural pronoun-card examples, explanations, and returning-learner update notice coverage.
- Shipped `0.16.0` as a minor release for immutable v2 highscore runs across every minigame, retryable score submission, fairness-aware rankings, retained legacy/noncompetitive history, and corrected Makan Apa and Wordsearch score registration.
- Shipped `0.17.0` as a minor release for improved Chapter 5 money and address learning, Chapter 9 occupations learning, and the canonical highscore leaderboard correction.
- Shipped `0.18.0` as a minor release for original Learn Malay profile and helper artwork, backward-compatible avatar replacement, self-service profile icon changes, and route-aware Learn Malay OST playback.

## Future Lanes

### Now
1. Goal: Close learner-facing content quality gaps (focus: Ch10 placeholders and related polish).
   - Why: Remaining placeholder assets still reduce trust and perceived completeness in core learning paths.
   - Done when:
     - Chapter 10 placeholder visuals are replaced with final assets.
     - A quick chapter content QA pass confirms no obvious placeholder copy/media remains in published chapter flow.
     - Visual/copy updates are reflected in the next release notes without version-drift.

### Next
1. Goal: Add repeatable release and QA automation.
   - Why: Current checks are partly manual; release consistency can regress without guardrails.
   - Done when:
     - A documented pre-release checklist runs lint/build + core smoke checks reliably.
     - Release consistency check verifies latest `package.json`, `CHANGELOG.md`, and `src/lib/adventureLog.ts` versions match.
     - Tag validation step is part of the standard release flow (annotated `vX.Y.Z` tag on release commit).

2. Goal: Add a lightweight CI or scripted verification path for critical app flows.
   - Why: Protect progression, auth, and minigame availability from accidental breakage.
   - Done when:
     - Core route/access smoke coverage is runnable with one command in local and CI-friendly environments.
     - Failures clearly point to route/feature area (auth/progress/minigame/release metadata).

### Later
1. Goal: Expand gameplay/features after quality and process baseline is stable.
   - Why: New feature velocity is safer after content debt and release discipline are stabilized.
   - Done when:
     - At least one net-new gameplay/content expansion milestone ships without regressing release QA baseline.
     - Roadmap lane priority can move from stabilization to growth for two consecutive releases.

2. Goal: Evolve progression and retention systems once core loop is mature.
   - Why: Advanced systems (events/challenges/retention mechanics) have higher maintenance cost.
   - Done when:
     - A concrete design brief exists with success metrics and implementation boundaries.
     - Backward compatibility with current user progress model is documented before build starts.

## Backfill Evidence Sources
- Git history from `2026-02-20` onward (`git log --oneline --date=short`).
- Release records in `CHANGELOG.md`.
- In-app release history data in `src/lib/adventureLog.ts`.
- Current product baseline summary in `master.md` and `README.md`.

## Maintenance Rule
- Update this roadmap on every release version bump.
- Keep changes outcome-level (not commit-by-commit dumps).
- If roadmap and implementation differ, implementation is source of truth; roadmap must be corrected in the same release cycle.

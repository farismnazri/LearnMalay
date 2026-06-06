# Changelog

## [Unreleased]

### Security
- Completed Phase 2A auth/rate-limit/CSRF hardening coverage for session-affecting mutations and abuse-prone score/progress routes.

### QA
- Verified `POST /api/highscores` limiter (`40/min`): `1-40 => 200`, `41+ => 429`, `Retry-After: 60`.
- Verified `POST /api/users/progress` limiter (`30/min`): `1-30 => 200`, `31+ => 429`, `Retry-After: 60`.
- Verified `DELETE /api/highscores` limiter (`10/min`): `1-10 => 200`, `11+ => 429`, `Retry-After: 60`.
- Verified same-origin mutation defense: fake cross-origin `Origin` on `POST /api/highscores` returns `403 Forbidden`.

## [0.9.0] - 2026-06-06

### Added
- Added optional map badges that highlight updated content in chapters a user has already completed.
- Added per-chapter content revisions and per-user completed revision tracking.

### Changed
- Chapter completion now records the reviewed content revision without resetting progress, scores, completion, or unlock state.
- Added an explicit completion/review action for the final chapter.

### Fixed
- Update badges clear only after the updated chapter is explicitly completed again, never from opening, hovering, tapping, or partially replaying it.

## [0.8.2] - 2026-06-06

### Changed
- Reworked the Chapter 2 core-family lesson with optimized family artwork, multilingual person labels, and a focused four-row vocabulary-card layout.
- Streamlined Chapter 2 to one Aku-Aku intro and seven lesson pages by removing redundant opening and extended-family content.

### Fixed
- Kept Chapter 2 page numbering, navigation, progress, and chapter completion aligned with the shorter lesson flow.

## [0.8.1] - 2026-06-06

### Changed
- Repaired the roadmap's stale current-version baseline so it matches the canonical `package.json` release version.

### Added
- Added a lightweight `check:release-drift` script that prevents stale roadmap version baselines and mismatched release metadata from shipping silently.

## [0.8.0] - 2026-06-05

### Added
- Added child-safe username moderation for new accounts with shared client/server validation and multilingual friendly feedback.
- Strengthened Malay profanity and insult coverage while keeping narrow false-positive exceptions for child-friendly phrases.

## [0.7.7] - 2026-06-05

### Changed
- Replaced and optimized the shared world background assets for faster modern-browser loading.
- Updated the landing, user, and Adventure Log backgrounds with a calmer jungle-framed scene for better readability.

## [0.7.6] - 2026-06-05

### Fixed
- Removed the redundant Chapter 1 `Semakan sebutan` review page so the chapter now flows across 6 pages with cleaner progression and navigation.

## [0.7.5] - 2026-06-05

### Fixed
- Redesigned and localized Chapter 1 page 2 as comic-style pronoun cards with new WebP artwork, active profile avatar support, and full BM/EN/ES text switching.

## [0.7.4] - 2026-06-05

### Changed
- Chapter 1 now uses final comic-style artwork for greetings, goodbye phrases, and thank-you exchanges.

### Notes
- Replaced placeholder panels/icons with optimized WebP chapter assets and refined comic layout sizing.

## [0.7.3] - 2026-06-04

### Fixed
- Added the Chapter 9 cook artwork and connected it to the occupation table, completing the six essential job images.

## [0.7.2] - 2026-06-04

### Changed
- Updated Chapter 9 occupations to focus page 1 on six essential jobs: teacher, doctor, cook, farmer, police officer, and firefighter.
- Refreshed the visible occupation examples so Malay, English, and Spanish copy uses consistent first-person phrasing.
- Added WebP artwork for the available Chapter 9 occupation assets.

### Fixed
- Hid unfinished leftover occupation rows from the Chapter 9 occupation table.
- Improved Chapter 9 occupation table body alignment so text sits visually centered with the images.

## [0.7.1] - 2026-05-30

### Fixed
- Replaced Arah Jalan minigame hub background with new dedicated WebP asset.

### Notes
- No gameplay/progression behavior changes in this release.

## [0.7.0] - 2026-05-29

### Changed
- Improved multilingual chapter copy across Malay, English, and Spanish.
- Improved naturalness and consistency in chapter dialogues and AkuAku helper text.

### Fixed
- Corrected Spanish accents, punctuation, and false accent drift in chapter content.
- Aligned release metadata so the visible app version has a matching public release message.

### Notes
- No gameplay/progression behavior changes in this release.
- Release commits in this cycle:
  - `7d3da69` - `fix: polish multilingual chapter content`
  - `a619238` - `chore: bump version to 0.7.0`

## [0.6.0] - 2026-05-26

### Added
- Added Arah Jalan directions minigame MVP and integrated it into chapter-based unlock flow.

### Changed
- Bumped app version to `0.6.0`.
- Synced release workflow metadata to keep version, changelog, and release history aligned.

### Notes
- Release commits in this cycle:
  - `03766f0` - `feat: add Arah Jalan directions minigame MVP`
  - `8db975e` - `chore(release): bump version to v0.6.0`

## [0.5.0] - 2026-05-21

### Added
- Introduced Semantic Versioning for Learn Malay (`MAJOR.MINOR.PATCH`).
- Added public Adventure Log page at `/updates`.
- Added visible in-app version label linked to Adventure Log.
- Added structured release-note data model with multilingual-ready text fields (`ms`, `en`, `es`).

### Changed
- Established release workflow tying app version, changelog, and Git tags.

### Notes
- Baseline public release includes Chapter 1-11 progression and the current minigame set.

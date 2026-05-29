# Changelog

## [Unreleased]

### Security
- Completed Phase 2A auth/rate-limit/CSRF hardening coverage for session-affecting mutations and abuse-prone score/progress routes.

### QA
- Verified `POST /api/highscores` limiter (`40/min`): `1-40 => 200`, `41+ => 429`, `Retry-After: 60`.
- Verified `POST /api/users/progress` limiter (`30/min`): `1-30 => 200`, `31+ => 429`, `Retry-After: 60`.
- Verified `DELETE /api/highscores` limiter (`10/min`): `1-10 => 200`, `11+ => 429`, `Retry-After: 60`.
- Verified same-origin mutation defense: fake cross-origin `Origin` on `POST /api/highscores` returns `403 Forbidden`.

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

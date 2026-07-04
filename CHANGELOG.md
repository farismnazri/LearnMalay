# Changelog

## [Unreleased]

## [0.14.0] - 2026-07-05

### Added
- Added a dynamic runtime map for Arah Jalan with Easy and Hard boards, randomized location placement, and dedicated WebP artwork for each location.

### Changed
- Arah Jalan now renders its play map with a React/CSS grid, clearer readable location overlays, and cleaner BM/EN/ES command controls.

### Fixed
- Removed the dependency on a fixed stitched-style map image and improved Arah Jalan map readability with better-balanced markers, connector lines, and location artwork sizing.

## [0.13.3] - 2026-07-05

### Changed
- Refreshed and optimized the learner-facing runtime artwork for Chapters 4, 5, 6, 8, and 9, added the Chapter 4 `terus` route image, and normalized the affected runtime chapter asset paths to the current WebP set.

### Fixed
- Removed obsolete Chapter 5 and Chapter 6 runtime PNGs and the unused Chapter 7, 8, and 9 placeholder assets after confirming the active chapter references no longer depend on them.
- Incremented the Chapter 4, 5, 6, 8, and 9 content revisions so returning learners can see the optional chapter update notices for the refreshed artwork.

## [0.13.2] - 2026-07-03

### Changed
- Refreshed and optimized Chapter 1, 2, and 4 runtime artwork, normalized Chapter 1 kita/kami asset paths, and removed superseded runtime variants.

## [0.13.1] - 2026-06-27

### Added
- Added repeatable checks that keep map chapter summaries aligned with canonical chapter metadata and make optimized PWA icon generation reproducible.

### Changed
- Reduced initial page transfer size by tightening landing-title image sizing and optimizing app/PWA icon assets.
- Standardized runtime asset paths for Chapter 7 food artwork, profile avatars, and Misi Membeli assets.

### Internal
- Added repo-local GPT context guidance and updated the asset replacement workflow notes for maintainers.

## [0.13.0] - 2026-06-20

### Added
- Added iPhone add-to-home-screen guidance so mobile learners can install the app from Safari more easily.

### Changed
- Adapted the landing page, user auth panels, map screen, and chapter screens for better iPhone portrait readability and touch spacing.
- Tightened chapter mobile navigation into a one-line control bar with sound/map controls, clearer Replay Intro and page-progress placement, aligned language switching, and persistent bottom Prev/Next controls.
- Optimized the Aku-Aku popup and chapter/map plaque layouts so important actions stay visible on smaller mobile screens.

### Fixed
- Reduced cramped spacing on landing and user panels, mobile map navigation, and chapter lesson surfaces so phone layouts feel steadier and easier to scan.

### Internal
- Stopped tracking local ChatGPT context files as repository content.

## [0.12.0] - 2026-06-17

### Changed
- Reworked Chapter 5 into a clearer mission-style flow for money, prices, shopping, and addresses, with updated currency practice and larger address-builder visuals.

### Fixed
- Incremented the Chapter 5 content revision from `2` to `3` so returning learners can see the optional chapter update notice for the reworked lesson flow.

## [0.11.5] - 2026-06-17

### Changed
- Refined Chapter 1 page 2 so `Kita` and `Kami` use separate pronoun cards with clearer beginner explanations and updated WEBP artwork.

### Fixed
- Incremented the Chapter 1 content revision from `5` to `6` so returning learners can see the optional chapter update notice for the refined pronoun lesson.

## [0.11.4] - 2026-06-16

### Changed
- Refined the landing-page footer so the two-line Adventure Log chip sits beside the acknowledgment bar without overlap on tablet, mobile, or desktop widths.

## [0.11.3] - 2026-06-16

### Changed
- Reworked Chapter 3 around seven counter names with a clearer Page 1 card layout, one-to-one `Saya mahu...` action cards, and three short chats aligned to the important counters.
- Expanded Chapter 3 practice so `Latihan 1` now uses seven noun-only scrambles and `Latihan 2` now includes all seven counter names in the wordsearch.

### Fixed
- Incremented the Chapter 3 content revision from `4` to `5` so returning learners can see the optional chapter update notice for the new lesson flow and practice set.

## [0.11.2] - 2026-06-16

### Security
- Completed Phase 2A auth/rate-limit/CSRF hardening coverage for session-affecting mutations and abuse-prone score/progress routes.

### Changed
- Restored Chapter 1 page 2 as a short pronoun lesson that separates `Seorang` and `Ramai`, including combined `Kita / Kami` guidance and group pronoun cards.
- Simplified Chapter 3 around three essential counter types with compact image-list lesson cards, focused counter phrases, and refreshed library/pharmacy practice situations.
- Tightened Chapter 4's World 1 finale around simple meeting-time and route commands, with updated Aku-Aku outcomes and route vocabulary.

### Fixed
- Incremented Chapter 1, Chapter 3, and Chapter 4 content revisions so returning learners can see the optional chapter update notices.
- Kept the Chapter 1 second exercise title consistent across Malay, English, and Spanish.

### QA
- Verified `POST /api/highscores` limiter (`40/min`): `1-40 => 200`, `41+ => 429`, `Retry-After: 60`.
- Verified `POST /api/users/progress` limiter (`30/min`): `1-30 => 200`, `31+ => 429`, `Retry-After: 60`.
- Verified `DELETE /api/highscores` limiter (`10/min`): `1-10 => 200`, `11+ => 429`, `Retry-After: 60`.
- Verified same-origin mutation defense: fake cross-origin `Origin` on `POST /api/highscores` returns `403 Forbidden`.

## [0.11.1] - 2026-06-13

### Changed
- Normalized chapter chats so the active learner consistently appears on the right with the active username and selected profile avatar, while other speakers use Aku Aku.

### Fixed
- Corrected chapter chat speaker ownership, dynamic learner-name references, and contextual bubble alignment across Chapters 1–7 and 9–11.
- Incremented the affected chapter content revisions so returning learners can see the optional chapter update notices.

## [0.11.0] - 2026-06-13

### Added
- Added a guided image-match activity, an embedded Arah Jalan route-practice lesson, and optimized WebP/AVIF Chapter 4 artwork for time and route concepts.

### Changed
- Rebuilt Chapter 4 around simpler time basics, times-of-day cards, highlighted sentence examples, and a cleaner asking-directions flow.
- Refreshed the Chapter 4 Aku-Aku goals and shared chapter rendering so the new lesson cards and gated route practice fit the current lesson flow.

### Fixed
- Incremented the Chapter 4 content revision from `1` to `2` so returning learners can see the optional chapter update notice.

## [0.10.0] - 2026-06-09

### Added
- Added a responsive icon-row lesson layout and optimized WebP/AVIF artwork for the six Chapter 3 counter types.

### Changed
- Focused Chapter 3 page 1 on exactly six practical counter types and refreshed Situasi 3.1, Situasi 3.2, and Latihan 1 with short, practical counter conversations and vocabulary practice.
- Incremented the Chapter 3 content revision from `1` to `2` so returning learners can see the optional chapter update notice.

## [0.9.4] - 2026-06-09

### Changed
- Refined Chapter 2 family labels, family-tree exercise targets, and family-dialogue flow so the lesson stays beginner-focused and internally consistent.
- Chat bubbles now distinguish auxiliary family speakers with explicit participant labels and light-blue styling where Chapter 2 needs it.

### Fixed
- Repaired the Chapter 2 family-card data contract so `/chapter/2` no longer crashes when rendering family portraits.
- Corrected Chapter 2 chat speaker ownership and left/right bubble placement for `Azman`, `Ibu`, `Bapa`, and `Muthu`.

## [0.9.3] - 2026-06-06

### Added
- Extended the release drift check to require an annotated `vX.Y.Z` Git tag for every released version listed in the changelog.

## [0.9.2] - 2026-06-06

### Changed
- Clarified the Chapter 1 `Jumpa lagi` hint so it better explains when learners should use the phrase.

### Fixed
- Incremented Chapter 1 content revision to trigger the optional update badge for users who completed the earlier revision.

## [0.9.1] - 2026-06-06

### Changed
- Refreshed the shared wood plank border assets from the updated source set and re-exported them as optimized WebP files for the current app surfaces.

### Fixed
- Removed unwanted rectangular wrapper shadows beneath the landing and user plank panels without changing user, progress, or route behavior.

### Notes
- `woodplank.webp` remains in the active border set for consistency even though it is not currently referenced.

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

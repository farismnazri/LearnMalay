# Mobile Friendly Roadmap

Updated: 2026-02-20

Legend:
- `[x]` done
- `[ ]` not done

## Phase Checklist

- [x] Phase 0 - Audit and scope completed (current mobile gaps identified and effort estimated).

- [x] Phase 1 - Responsive foundation
- [x] Define supported breakpoints and device targets (small phone, large phone, tablet).
- [x] Add shared spacing and sizing conventions for mobile-first layouts.
- [x] Standardize touch target minimum sizes for interactive controls.
- [x] Verify safe area behavior and viewport height handling on mobile browsers.

- [x] Phase 2 - Core pages responsive pass
- [x] Update `/app/page.tsx` for stacked mobile CTA layout and cleaner spacing.
- [x] Update `/app/user/page.tsx` to avoid cramped stat cards and overflow on small screens.
- [x] Update `/app/map/page.tsx` headers/cards sizing for narrow viewports.
- [x] Update `/app/minigames/page.tsx` and all minigame intro pages for consistent mobile grids.

- [x] Phase 3 - Chapter activities mobile interaction pass
- [x] Replace drag-only flows in `/app/chapter/[id]/page.tsx` with touch-friendly tap-select/tap-place behavior.
- [x] Reduce forced horizontal scrolling in box/diagram activities.
- [x] Tune crossword/wordsearch/table activity readability and interaction on small screens.

- [x] Phase 4 - Minigames gameplay mobile pass
- [x] Tune `/app/minigames/numbers/play/page.tsx` layout density, controls, and popup positioning.
- [x] Tune `/app/minigames/word-match/play/page.tsx` interaction spacing and column behavior.
- [x] Tune `/app/minigames/wordsearch/page.tsx` + `/src/components/game/WordSearchCard.tsx` cell readability and target list layout.
- [x] Tune `/app/minigames/currency/play/page.tsx` control groups and game-state readability.
- [x] Tune `/app/minigames/makan-apa/play/page.tsx` and `/app/minigames/misi-membeli/play/page.tsx` board scaling and tap accuracy.
- [x] Tune `/app/minigames/highscores/page.tsx` table behavior for narrow devices.

- [x] Phase 5 - Component-level mobile hardening
- [x] Update `/src/components/game/BackgroundAudio.tsx` volume slider behavior for touch.
- [x] Update `/src/components/game/FoodIntroCard.tsx` and `/src/components/game/DomeGallery.tsx` sizing/gesture behavior for mobile.
- [x] Update `/src/components/game/TableCard.tsx` table responsiveness and readability.

- [ ] Phase 6 - QA and release
- [x] Run manual QA on iPhone and Android viewport sizes in portrait and landscape.
- [x] Validate no blocked flows for login, map progression, chapter completion, and all minigames.
- [x] Check performance (jank, input lag) on mobile for heavy scenes.
- [ ] Ship and monitor feedback, then patch priority regressions.

## Quick Resume Prompt

Use this when continuing later:

"Continue the mobile roadmap in `/Users/FarisNazri/Documents/LearnMalay/learn-malay/ROADMAP.md` from the next unchecked phase, and update checkboxes as tasks are completed."

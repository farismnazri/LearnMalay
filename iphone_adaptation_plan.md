# iPhone Portrait Mobile Playability Plan

## 1. Current Mobile-Readiness Summary

- Reusable foundation: `viewportFit: "cover"` is already set, `app-page-pad` uses safe-area insets, `.min-h-screen` includes `100svh`/`100dvh`, and shared `.touch-target` defaults to 44px.
- Reusable interaction patterns: many routes already stack before `tablet`, and `DragFillCard`, `BoxDragCard`, `WordSearchCard`, and most minigames already have tap-based controls.
- Main risks: absolute title footer overlap, fixed/floating audio controls, hover-only tooltips, wide internal grids/canvases, keyboard viewport compression, and minigames with dense visual hit targets.
- Portrait-first is realistic. No inspected feature appears to truly require landscape, but a few screens need compact portrait layouts rather than simply shrinking desktop layouts.

## 2. Route-By-Route Audit

- Title page `/`: strong visual identity and large image buttons are reusable. Risk is `absolute` footer/acknowledgement/Adventure Log chip colliding with Start/User buttons on 375x667, plus top-right audio control consuming safe-area space.
- User/profile `/user`: login/create flow is mostly mobile-safe. Audit admin/delete modals, avatar grid, password inputs, and active-user cards for keyboard scroll and safe-area spacing.
- Map `/map`: chapter cards are one-column on phones and playable. Risks are the rotated WORLD rail, progress/header density, update tooltip positioning, and hover affordances that need visible tap states.
- Chapter renderer `/chapter/[id]`: top navigation stacks well, but page controls should stay reachable without covering content. Tables already convert to mobile cards; risk remains in wide exercise boards.
- Chapter exercise cards: `DragFillCard` and `BoxDragCard` have tap alternatives but need clearer selected states and phone-sized layouts; `TypeInCard` needs touch-target buttons and keyboard checks; `WordSearchCard`/`CrosswordCard` need overflow affordances; `ImageMatchCard` select controls are fine but Check needs 44px; `ArahJalanPracticeCard` is playable but map/control stacking needs compact tuning.
- Minigame hub `/minigames`: grid cards and controls are mostly phone-ready; ensure locked-card text does not overcrowd square cards at 375px.
- Numbers play: playable with text input; highest risk is forced refocus and keyboard covering feedback/buttons.
- Word Match play: tap-card matching is a good mobile model; preserve stacked two-column behavior on portrait and verify long labels.
- Wordsearch play: tap start/end is mobile-friendly, but medium/hard grids can become scroll-heavy; hard mode needs mobile-specific comfort rules.
- Currency play: tap-money grid is suitable; ultra typed answer needs keyboard-safe layout and visible submit/clear controls.
- Makan Apa play: easy mode is mobile-friendly; hard typed mode needs keyboard-safe submit flow. Image `max-h` should be checked on SE.
- Misi Membeli play: highest tap-precision risk. Buttons clamp to 44px, but dense scene layouts, especially hard mode, need phone-specific board sizing and possibly list-first feedback.
- Arah Jalan play: no landscape requirement, but portrait currently stacks a tall map above command controls; needs a shorter map and tighter command panel.
- Highscores/updates: secondary. Both already use stacked/card layouts; highscores has mobile cards and horizontal tablet table, so only filter wrapping and safe-area spacing need checks.

## 3. Portrait-First Recommendations

- Chapters: keep header, language/audio/map controls, content, and Prev/Next as vertical sections; avoid sticky bottom controls unless padded with `calc(var(--safe-area-bottom) + ...)`.
- Chapter exercises: make every interactive card usable by tap first. Keep drag/drop as optional desktop enhancement; selected option plus target tap must be obvious and resettable.
- Keyboard screens: for `TypeInCard`, Numbers, Makan Apa hard, Currency ultra, and Crossword, ensure focused inputs scroll above iOS keyboard, submit buttons remain reachable, and no forced refocus causes jumpy Safari behavior.
- Bottom/fixed controls: avoid fixed bottom controls for core actions unless they use safe-area padding and do not hide content. Prefer in-flow controls with enough bottom padding.
- Compact layouts needed: title footer, map rail/header, BoxDrag family tree, Wordsearch hard, Crossword, Misi Membeli, Arah Jalan.

## 4. Landscape Recommendations

- Keep iPhone landscape usable by preserving scroll and avoiding clipped top/bottom content.
- Enhance, not require: use side-by-side layouts for Arah Jalan map plus commands, Wordsearch/Crossword grid plus clues, Misi Membeli list plus board, and chapter exercise instructions plus board.
- No inspected feature truly needs a rotate-phone fallback. If Misi Membeli hard remains too dense, prefer a portrait alternate layout before proposing rotation.

## 5. Recommended Implementation Phases

- Phase 1: core browser playability. Fix title footer flow, shared safe-area/viewport rules, hover tooltip tap equivalents, common 44px tap targets, and route-level horizontal overflow.
- Phase 2: chapter comfort. Tune chapter header/navigation, `TypeInCard`, `DragFillCard`, `BoxDragCard`, `WordSearchCard`, `CrosswordCard`, `ImageMatchCard`, and `ArahJalanPracticeCard` for 375/390/430 portrait.
- Phase 3: minigame comfort. Tune Numbers keyboard behavior, Wordsearch grid difficulty sizing, Currency/Makan Apa typed modes, Misi Membeli board precision, and Arah Jalan portrait command ergonomics.
- Phase 4: landscape/PWA polish. Add landscape enhancements, improve `manifest.ts` theme/background colors/icons if needed, and expand mobile QA assertions.

## 6. Likely Files To Edit

- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/app/globals.css`: shared viewport, safe-area, tap target, compact portrait, and landscape enhancement rules.
- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/app/page.tsx`: title footer, acknowledgement, Adventure Log chip, audio control placement, and start/select-user spacing.
- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/app/map/page.tsx`: narrow map header, WORLD rail, update tooltip tap behavior.
- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/app/chapter/[id]/page.tsx`: chapter controls, content spacing, Prev/Next ergonomics.
- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/src/components/game/*`: exercise-specific mobile sizing and tap/keyboard behavior.
- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/app/minigames/*/play/page.tsx`: per-game portrait layouts, typed-input flows, dense board tuning.
- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/src/components/navigation/IconActionLink.tsx` and `BackgroundAudio.tsx`: tooltip/tap/fixed safe-area behavior.
- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/scripts/phase6-mobile-qa.mjs`: add overflow, tap target, keyboard, and route completion checks.
- `/Users/FarisNazri/Documents/LearnMalay/learn-malay/app/manifest.ts`: secondary PWA polish only.

## 7. Acceptance Criteria

- At 375x667, 390x844, and 430x932 portrait: no document-level horizontal scrolling on `/`, `/user`, `/map`, `/chapter/1` through `/chapter/5`, `/minigames`, and each unlocked minigame route.
- New user can start from `/`, create/select a user, reach `/map`, open Chapters 1-5, navigate pages, complete gated exercises, and unlock progress.
- Every unlocked minigame can be played with taps or text input only; no desktop-only drag precision is required.
- Main buttons, icon buttons, options, board targets, selects, and inputs are at least about 44px in both dimensions.
- Text remains readable without extreme shrinking; long labels wrap cleanly.
- Important controls are not hidden behind iOS Safari address/browser UI, safe-area edges, or the on-screen keyboard.
- iPhone landscape remains usable and unclipped, while portrait remains the primary optimized experience.

## 8. Validation Plan

- Run: `npm run lint`, `npm run build`, then `npm run check:release-drift` only if release metadata is touched, which this work should avoid.
- Run existing QA: start the app on a local port and run `node scripts/phase6-mobile-qa.mjs --base-url http://127.0.0.1:<port>`.
- Expand the QA script without new dependencies to assert `document.documentElement.scrollWidth <= innerWidth + 1`, scan visible buttons/links/inputs for 44px targets, and cover 375x667, 390x844, 430x932, plus iPhone landscape.
- Manual browser checks in WebKit/iOS Safari: keyboard on TypeIn/Numbers/Makan Apa/Currency/Crossword, safe-area around fixed controls, and actual play completion for Wordsearch, BoxDrag, Misi Membeli, and Arah Jalan.

## 9. Risk And Scope Estimate

- Effort: large.
- Reason: the shared responsive foundation is good, but making the whole app “properly playable” touches core routes, many chapter exercise components, and seven minigame experiences. The riskiest work is not CSS alone; it is validating real interaction loops on iPhone portrait without changing progress, highscores, APIs, content, release metadata, or the Crash/PS1 visual identity.

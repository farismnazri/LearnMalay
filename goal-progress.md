# Goal Progress: Arah Jalan V1 Easy MVP

Last updated: 2026-05-26

## Checkpoint Status

1. [x] Checkpoint 1: Pure engine and map data
   - Created `src/lib/arahJalan/items.ts` with fixed Easy map, command labels, and helper strings.
   - Created `src/lib/arahJalan/engine.ts` with pure command simulation, facing helpers, and scenario generation.

2. [x] Checkpoint 2: Intro route
   - Created `app/minigames/arah-jalan/page.tsx` with user gate, unlock gate, BM/EN/ES helper text, and play link.

3. [x] Checkpoint 3: Play route
   - Created `app/minigames/arah-jalan/play/page.tsx` with fixed map, queue controls, Run/Undo/Clear, batch animation, feedback, and in-session score.

4. [x] Checkpoint 4: Hub and unlock wiring
   - Updated `app/minigames/page.tsx` to add `arah-jalan` minigame card.
   - Updated `src/lib/minigameUnlocks.ts` with `arah-jalan` id, Chapter 11 prerequisite, and unlock order append.

5. [x] Checkpoint 5: Validation and cleanup
   - Ran required commands from `goal.md`:
     - `rg -n "arah-jalan|Arah Jalan" app src/lib`
     - `npx tsc --noEmit`
     - `npm run lint`
     - `npm run build`
   - All validation commands passed.

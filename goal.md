# Codex Goal: Arah Jalan V1 Easy MVP

## Recommended model

Use codex5.3 - Extra High.

## Project root

/Users/FarisNazri/Documents/LearnMalay/learn-malay

## Objective

Build V1 Easy Mode only for the new `arah-jalan` minigame.

This minigame teaches Malay directions through a fixed map. The player starts at a random road/junction, faces a direction, receives a random destination, builds a queue of Malay direction commands, then presses `Run` to execute the route.

The goal is to create a playable Easy MVP only, not the polished final version.

## Canonical route and id

Use `arah-jalan` as the canonical minigame id and route segment.

Intro route:

`app/minigames/arah-jalan/page.tsx`

Play route:

`app/minigames/arah-jalan/play/page.tsx`

Canonical URL:

`/minigames/arah-jalan`

Do not create a `/directions` alias.

## V1 Easy MVP scope

Implement only:

- one fixed Easy greybox SVG/React map
- random start point
- random destination
- player facing direction
- command buttons:
  - `Belok kiri`
  - `Jalan terus`
  - `Belok kanan`
  - `Pusing balik`
  - `Sampai`
- visible command queue
- `Run`
- `Undo`
- `Clear`
- batch Run animation
- success/fail feedback
- simple in-session score only
- Malay + EN/ES helper text
- minigame hub card
- Chapter 11 unlock metadata

Do not implement:

- Medium map
- Hard map
- final art assets
- full walking sprites
- highscore persistence
- backend score saving
- new packages
- route aliases
- audio recording
- speech recognition
- procedural map generation

## User-facing layout

Use a two-panel layout where possible:

Left panel:

- fixed Easy map
- roads/junctions
- landmark labels
- player marker/arrow
- destination marker or highlighted destination

Right panel:

- mission prompt
- current start/destination info
- command buttons
- command queue
- Run / Undo / Clear controls
- feedback
- simple score/status

On small screens, stack the map and controls vertically using existing responsive minigame layout patterns.

Keep the existing Crash/PS1-inspired style: chunky, playful, rounded, tap-friendly, colorful, and not modern SaaS.

## Core gameplay example

The player sees a mission such as:

`Pergi ke hospital.`

The player builds a command queue such as:

1. `Jalan terus`
2. `Belok kanan`
3. `Jalan terus`
4. `Sampai`

Then the player presses `Run`.

## Command semantics

Use a data-driven graph model.

The map should be represented as nodes, edges, facing direction, and commands.

The player state should include:

- current node
- facing direction
- destination node
- command queue
- current scenario
- feedback/result state
- score/session stats

Command behavior:

- `Jalan terus`: move to the connected node in the current facing direction.
- `Belok kiri`: rotate facing 90° left, no movement.
- `Belok kanan`: rotate facing 90° right, no movement.
- `Pusing balik`: rotate facing 180°, no movement.
- `Sampai`: terminal arrival/check command.

## Run and success/fail rules

Use Batch + Sampai required.

`Run` executes the full command queue in order.

Success only occurs when:

- the player reaches the destination, and
- the final executed command is `Sampai`, and
- `Sampai` is executed while the player is currently at the destination node.

Failure occurs when:

- the player tries to move where there is no road
- the player executes `Sampai` at the wrong location
- the queue ends somewhere other than the destination
- the player reaches the destination but does not finish with `Sampai`
- the final command is not `Sampai`

Treat `Sampai` as terminal. Prevent adding more movement commands after `Sampai`.

## Map content

Create one Easy fixed map only.

Use simple greybox SVG/React shapes for V1. Do not make final art assets yet.

Include these Malay landmarks if practical:

- `hospital`
- `klinik`
- `balai polis`
- `sekolah`
- `kedai`
- `pasar`
- `stesen bas`

The map should avoid trivial impossible scenarios:

- start and destination must be different
- start should be a real playable node/junction
- destination should be reachable
- random scenario should not require Medium/Hard logic

## Suggested file structure

Create:

`app/minigames/arah-jalan/page.tsx`

`app/minigames/arah-jalan/play/page.tsx`

`src/lib/arahJalan/items.ts`

`src/lib/arahJalan/engine.ts`

Edit only if needed:

`app/minigames/page.tsx`

`src/lib/minigameUnlocks.ts`

## Expected file responsibilities

`src/lib/arahJalan/items.ts`

- fixed Easy map data
- nodes
- edges
- landmark labels
- start pool
- destination pool
- helper text/translations if useful

`src/lib/arahJalan/engine.ts`

- pure types and logic
- facing direction helpers
- command execution
- route simulation
- success/fail validation
- deterministic result object for the UI

`app/minigames/arah-jalan/page.tsx`

- intro page
- lock/user gate following existing minigame patterns
- language-aware title/description/helper text
- start button to play route
- navigation back to map/minigames where consistent

`app/minigames/arah-jalan/play/page.tsx`

- playable Easy MVP
- map panel
- command panel
- queue controls
- scenario generation
- run animation/state
- success/fail feedback
- simple in-session score

`app/minigames/page.tsx`

- add new minigame card for `arah-jalan`
- use Malay-first display name `Arah Jalan`
- use English label `Directions`
- use Spanish label `Direcciones`
- preserve existing minigame hub behavior

`src/lib/minigameUnlocks.ts`

- add `"arah-jalan"` to the unlockable minigame id union
- unlock at Chapter 11
- append to unlock order intentionally

## Files to avoid

Do not touch unless there is a blocking integration issue:

`app/globals.css`

`src/components/navigation/IconActionLink.tsx`

`src/components/game/StylizedTitle.tsx`

`src/components/game/BackgroundAudio.tsx`

`src/lib/highscoresTypes.ts`

`src/lib/highscores.ts`

`src/server/highscoreRepo.ts`

`app/minigames/highscores/page.tsx`

Also avoid generated/private folders:

`node_modules/`

`.next/`

`out/`

`build/`

`coverage/`

`.git/`

`.env*`

`.vercel/`

`output/`

`tmp/`

`reports/`

`var/learn-malay.db*`

## Workflow checkpoints

Work in checkpoints.

Checkpoint 1: Pure engine and map data

- create `src/lib/arahJalan/items.ts`
- create `src/lib/arahJalan/engine.ts`
- define map graph, command types, facing helpers, and simulation result
- keep logic pure and testable by inspection

Checkpoint 2: Intro route

- create `app/minigames/arah-jalan/page.tsx`
- match existing minigame intro patterns
- include Malay + EN/ES helper text
- link to play route

Checkpoint 3: Play route

- create `app/minigames/arah-jalan/play/page.tsx`
- render fixed Easy map
- render player marker/facing direction
- render destination
- implement command queue
- implement Run / Undo / Clear
- implement batch run animation
- implement success/fail feedback
- implement simple in-session score

Checkpoint 4: Hub and unlock wiring

- update `app/minigames/page.tsx`
- update `src/lib/minigameUnlocks.ts`
- unlock at Chapter 11
- no highscore persistence

Checkpoint 5: Validation and cleanup

- run required validation commands
- fix only related issues
- do not broaden scope

## Validation commands

Run from the project root:

```bash
cd /Users/FarisNazri/Documents/LearnMalay/learn-malay
rg -n "arah-jalan|Arah Jalan" app src/lib
npx tsc --noEmit
npm run lint
npm run build
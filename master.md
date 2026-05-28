# Learn Malay Master (Short)
Last updated: 2026-05-28

## Purpose
Crash/PS1-inspired web app for learning spoken Malaysian Malay through chapter lessons and minigames.

## Current Product Scope
- Routes: `/`, `/user`, `/map`, `/chapter/[id]`, `/minigames`, `/minigames/highscores`, `/updates`
- Chapters: 11 total (World 1 = Ch 1-4, World 2 = Ch 5-8, World 3 = Ch 9-11)
- Minigames:
  - numbers (unlock after Ch 1)
  - word-match (Ch 2)
  - wordsearch (Ch 3)
  - currency (Ch 5)
  - makan-apa (Ch 7)
  - misi-membeli (Ch 11)
  - arah-jalan (Ch 11)

## Tech + Architecture
- Next.js 16 App Router, React 19, TypeScript, Tailwind v4, SWR
- Chapter content is TypeScript modules in `src/lib/chapters/` (not Markdown)
- Aku-Aku helper dialogs are in `src/lib/akuAku/`
- Core app code: `app/`, shared UI: `src/components/`, server/data logic: `src/server/`

## Language Model
- UI/content translations use `{ ms, en, es }`
- User language preference key: `learnMalay.uiLang.v1`

## Users, Progress, Storage
- Roles: `user`, `demo`, `admin`
- `admin` can manage users and highscore resets; `demo`/`admin` bypass normal unlock gating
- Storage mode:
  - MongoDB when `MONGODB_URI` is set
  - in-memory fallback otherwise (resets on server restart)

## API Surface (Current)
- `/api/users`
- `/api/users/login`
- `/api/users/current`
- `/api/users/progress`
- `/api/users/verify-admin`
- `/api/users/admin/rotate-password`
- `/api/highscores`

## Style Guardrails
- Preserve game-first Crash/PS1 feel (chunky UI, strong readability, mobile-friendly hit targets)
- Use local Crash font at `public/fonts/crash-a-like.ttf` for display moments

## Source-of-Truth Rule
If this file and implementation differ, code is source of truth. Update this file only with current, verifiable behavior.

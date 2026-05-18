# Learn Malay

Crash/PS1-inspired web game for learning spoken Malaysian Malay through chapter-based lessons, helper dialogs, profile progress, and minigames.

The actual app root is:

```bash
/Users/FarisNazri/Documents/LearnMalay/learn-malay
```

## Tech Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS v4 via `@tailwindcss/postcss`
- MongoDB for persistent server storage when configured
- In-memory server storage fallback for local development
- SWR for client-side API data fetching
- `next/image`, local font assets, and static assets under `public/`

## Main Structure

- `app/` - App Router pages, layout, global CSS, manifest, and API routes.
- `app/page.tsx` - title screen.
- `app/user/page.tsx` - user login, signup, avatar selection, and admin user management.
- `app/map/page.tsx` - chapter/world map and progress display.
- `app/chapter/[id]/page.tsx` - main renderer for chapter lesson pages.
- `app/minigames/` - minigame hub, intro pages, play pages, and highscores.
- `app/api/` - users, current session, progress, admin verification, and highscores endpoints.
- `src/lib/` - client helpers, shared types, chapter content, minigame data, unlock rules, fonts, and avatars.
- `src/lib/chapters/` - TypeScript-backed lesson content for chapters 1-11.
- `src/lib/akuAku/` - Aku-Aku helper dialog content.
- `src/components/` - shared game UI and navigation components.
- `src/server/` - MongoDB/in-memory storage adapter, user repo, session repo, highscore repo, and session cookie helpers.
- `public/assets/` - game backgrounds, characters, icons, borders, chapter assets, and audio.
- `scripts/` - utility scripts for PWA icons, mobile QA, and PDF summary generation.

## App Flows

- Title screen: `/` shows the main Learn Malay landing screen and routes the player to the map or user selection.
- User/profile selection: `/user` supports creating accounts, logging in, choosing avatars, switching users, and admin actions.
- Map: `/map` shows chapter/world progress and locks chapters until the user reaches them.
- Chapter pages: `/chapter/[id]` renders the typed chapter content and activity kinds such as tables, chats, drag-fill, type-in, box-drag, wordsearch, crossword, tick, figure, and food intro pages.
- Minigames: `/minigames` lists unlockable games. Current games include numbers, word match, wordsearch, currency, makan apa, and misi membeli.
- Highscores: `/minigames/highscores` displays score tables and supports admin-only clearing through the API.

## Storage And Environment

Server storage uses MongoDB when `MONGODB_URI` is set. Without `MONGODB_URI`, local development falls back to an in-memory store. The in-memory fallback resets when the server restarts and is not safe for production or real user data.

Environment variables:

- `MONGODB_URI` - recommended for development and required for reliable persistent storage in production.
- `LEARN_MALAY_ADMIN_PASSWORD` - required outside development. In development, the server falls back to a temporary admin password if this is not set.

### Admin Password Rotation

Admin password hashes are stored in the database. Updating `LEARN_MALAY_ADMIN_PASSWORD` alone does not change the stored hash until rotation is triggered.

Use the server-only route below while logged in as an admin:

- `POST /api/users/admin/rotate-password` with JSON body `{ "currentPassword": "<current admin password>" }`

Behavior:

- The route verifies the current admin password, reads the new password from `LEARN_MALAY_ADMIN_PASSWORD`, rotates the stored hash/salt, and invalidates admin sessions.
- The env value is never returned to the client.

## Commands

Run commands from the app root.

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run generate:pwa-icons
```

## Files To Avoid Editing

Do not edit or inspect generated/local files deeply unless a task specifically requires it:

- `node_modules/`
- `.next/`
- `out/`
- `build/`
- `coverage/`
- `.env*`
- `output/`
- `tmp/`
- `reports/`

## Manual QA Checklist

Before shipping meaningful app changes, do a short browser pass:

- Create a new user and log in.
- Open the map and confirm the active profile/progress appears.
- Open at least one chapter page.
- Complete a chapter/progress action and confirm the next chapter unlocks.
- Open the minigames hub and at least one minigame.
- Submit and view a highscore.
- Briefly check mobile layout at phone and tablet widths.

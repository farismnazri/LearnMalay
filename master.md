# Learn Malay App — Master Design Document

## 1. Project Vision
A Crash Bandicoot–inspired, PS1-style language learning game that teaches spoken Malaysian Malay through short, playful, level-based experiences.

The app should feel like:
- A game first
- A learning tool second
- Fun, encouraging, and nostalgic

## 2. Platform Strategy
- Web-first (mobile responsive)
- Designed to be:
  - Easily testable in browser
  - Playable on phone immediately
  - Mobile app possible later via wrapping (PWA / Capacitor)

## 3. Theme & Vibe
### Inspiration
- PS1-era Crash Bandicoot
- Tropical islands, jungles, adventure

### Tone
- Playful
- Encouraging
- Never punishing
- Slightly goofy, friendly

## 4. Visual & Motion Style (PS1 / Crash-Inspired)
### Overall Feel
- PS1 nostalgia
- Chunky, bold, colorful
- Feels like a game, not a modern SaaS app

### Visual Rules
- Chunky UI elements
- Rounded edges
- Large hitboxes (tap-friendly)
- No glassmorphism
- No ultra-minimal flat design
- Slight texture or pixelation allowed

### Typography
- Chunky, playful, readable fonts
- Avoid corporate or ultra-thin fonts
- Arcade-like feeling

### Color Palette
- Jungle greens
- Sky blues
- Sand / earth yellows
- Warm browns
- Saturated but soft

### Animation Rules
- Idle animations:
  - Buttons gently bounce
  - World nodes wobble slightly
- Transitions:
  - Slide / fade / scale
  - No instant hard cuts
- Feedback:
  - Success → bounce + sparkle
  - Error → gentle shake (never harsh)

### PS1 Nostalgia Effects
- Subtle blur or pixel filter on backgrounds
- Soft gradients
- Optional very subtle CRT scanline overlay

## 5. App Entry Flow (Mandatory)
```
Title Screen (PS1-style)
  ↓ Start
Create / Choose User (Save Slots)
  ↓
Island Map (World Select)
  ↓
World → Level
```

### Rules
- User must press Start
- User progress is tied to a local profile
- Locked worlds are visually faded
- Only unlocked worlds are selectable

## 6. Learning Philosophy
- Learn by doing
- Short lessons (2–5 minutes)
- Conversation-first
- Grammar explained lightly, later
- Mistakes are part of progress

## 7. Progression System (Game Logic)
- Worlds = Chapters
- Levels = Lessons

Each level includes:
- Vocabulary crates
- Sentence practice
- Mini challenge / quiz

Rewards:
- ⭐ Stars → normal completion
- 💎 Gems → perfect run (no mistakes)

## 8. Language Support (Multilingual)
### Supported UI Languages
- English (EN)
- Spanish (ES)

### Rules
- Malay content stays original
- All explanations must exist in:
  - English
  - Spanish
- Language toggle affects:
  - UI
  - Explanations
  - Aku-Aku helper text

## 9. Vocabulary Interaction
### Web
- Hover → show translation
- Click → pin meaning

### Mobile
- Tap → popup
- Long press → show EN + ES

## 10. Malay Language Style
- Focus on spoken Malaysian Malay
- Teach common real-life expressions
- Explain formal vs casual only when relevant
- Avoid academic linguistic terms

## 11. Content Rules
Every level must:
- Introduce max 5–10 new words
- Include at least:
  - 1 example sentence
  - 1 interactive task
- Use simple explanations
- Avoid jargon

Content is stored as Markdown and rendered by the app.

## 12. Helper Mascot System (Aku-Aku Inspired)
### Role
- Contextual guide
- Not always visible
- Not a chatbot

### Behavior
- Appears based on game events
- Encouraging and playful
- Speaks in selected UI language

### Common Events
- APP_START
- WORLD_ENTER
- LEVEL_START
- FIRST_MISTAKE
- SUCCESS

### Rules
- Messages are shown only once unless reset
- User can dismiss or mute helper
- Uses static images in v1 (animations later)

## 13. Data & Storage Strategy
### Phase 1 (MVP)
- ❌ No backend
- ❌ No database
- ✅ Local-first storage

Stored locally:
- User profiles
- Progress
- Language preference

Content storage:
- Markdown files inside `/content`

Save versioning:
- All saves include a `version` field for future migration

## 14. Asset Strategy
### Asset Types
- Characters (PNG / WebP)
- Backgrounds (WebP)
- Icons (SVG)
- UI elements (PNG / SVG)

### Asset Rules
- No copyrighted Crash Bandicoot assets
- Inspired-by style only
- Consistent naming conventions (example):
  - `akuaku_idle.png`
  - `akuaku_talk.png`
  - `akuaku_happy.png`

## 15. Architecture Principles
- Content-driven development
- Frontend written as if backend exists
- Clear separation of:
  - Content
  - UI
  - State
- Easy future backend integration

## 16. Out of Scope (v1)
- Audio pronunciation
- Online accounts
- Leaderboards
- Daily streaks
- Multiplayer

These may be added later.

## Status
This `master.md` is FINAL for v1. Any changes must be intentional and documented.


## Title Screen UI Contract (Crash-Inspired)

### Required Controls
The Title Screen MUST show exactly two primary actions:
1) **START**
2) **SELECT USER**

### Navigation Rules
- **START** goes to **/map** (World Map).
- **SELECT USER** goes to **/user** (User Select).
- The user MUST have an active selected profile before starting:
  - If no user is selected, **START is disabled** and must show a clear prompt (via helper or inline text).
  - Starting without a selected user is not allowed.

### Typography (Hard Requirement)
- Primary display font is **Crash-like**:
  - Font file name: `crash-a-like.ttf`
  - The app must load this as a local font (not Google fonts).
- All major title/button text uses:
  - **Orange fill**
  - **Black outline**
  - Outline must remain readable on bright backgrounds.

### Text Styling Specification
- Use an outline stroke for the Crash-style look:
  - `-webkit-text-stroke: 3px #000;` (or equivalent)
- Provide a fallback if stroke is unsupported:
  - multi-directional text-shadow (black) to simulate an outline.

### Button Style (Hard Requirement)
- Buttons must feel “game-like”:
  - Large hitbox
  - Press animation (squash)
  - Hover animation (slight scale)
- Disabled START button (no selected user):
  - Visually obvious disabled state (dim + no hover scale)
  - Must still look on-theme (not grey default HTML).

### Copy Rules (Title Screen)
- Button labels MUST be:
  - `START`
  - `SELECT USER`
- Any helper text must be bilingual (EN/ES) if language is already chosen; otherwise EN only is acceptable on v1.
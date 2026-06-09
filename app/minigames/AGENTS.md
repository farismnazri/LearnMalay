# Minigame Guidance

This file supplements the repository-root `AGENTS.md` for files under `app/minigames/`.

- Use the `minigames` project for route-local minigame work. Use the `learn-malay` project when a change also touches shared data, API routes, progression, highscores, Git, release, or repo-wide workflows.
- Keep changes scoped to the requested game and preserve existing unlock, progress, score, and highscore contracts unless explicitly requested.
- Reuse established shared data and helpers under `src/lib/`; avoid duplicating them in route files.
- Preserve mobile-friendly tap targets, readable game states, and keyboard/accessibility behavior already present.
- Avoid broad rewrites of shared minigame navigation or highscore behavior.
- Run `npm run lint`; also run `npm run build` for routing, API, shared-contract, or cross-minigame structural changes.

## Minigame Design Rules

- Keep each minigame easy to understand within a few seconds.
- Do not introduce new mechanics without clear on-screen instructions.
- Preserve the learning goal of the game; visual polish must not make the task harder to understand.
- Keep feedback immediate, friendly, and non-punishing.
- Maintain a clear difficulty curve: early rounds should be easier than later rounds.
- Avoid adding cognitive overload, hidden rules, or too many simultaneous choices.
- For mobile, prioritize large tap targets, simple gestures, and readable state changes.
ChatGPT Source Rules for Learn Malay / Codex Prompting

Goal:
Help ChatGPT write accurate, token-efficient Codex prompts for the Learn Malay project without repeating context unnecessarily.

Default source:
Use `Chat_GPT_Context/CHATGPT_REPO_CONTEXT.md` as the primary project context.

Attach extra sources only when directly relevant:
- `Chat_GPT_Context/master.md` for design direction, UX behavior, visual style, mascot, learning philosophy.
- `ROADMAP.md` for roadmap/QA/release planning.
- `README.md` for setup, env, run/deploy commands.
- `CHANGELOG.md` for release-note/version tasks.

Required two-line header for generated prompts:
- First line must be exactly one project target:
  - `learn-malay project`
  - `chapters project`
  - `minigames project`
  - `assets project`
- Second line must be exactly:
  `{model (GPT-5.5, GPT-5.4, or GPT-5.4-Mini)} - {reasoning mode (low, medium, high, or extra-high)}`
- Choose exactly one model and exactly one reasoning mode per prompt.
- Render the selected target first and the selected model/reasoning line immediately after it, for example:
  `minigames project`
  `GPT-5.5 - high`
- Use model tokens exactly as shown in the UI: `GPT-5.5`, `GPT-5.4`, `GPT-5.4-Mini`.
- Use lowercase reasoning mode tokens exactly as shown in the UI: `low`, `medium`, `high`, `extra-high`.
- Do not output legacy styles such as:
  - `use GPT-5.5 - High`
  - `(GPT-5.5) - (High)`

Project target selection:
- Use `learn-malay project` for Git, releases, builds, workflow/configuration, cross-area changes, and any unclear task. This is the safest default and true repo/app root.
- Use `chapters project` for bounded chapter-content work.
- Use `minigames project` for bounded minigame work.
- Use `assets project` for bounded asset addition, replacement, optimization, or reference checks.
- Switch to `learn-malay project` when a focused task expands beyond its area or needs repo-root operations.

Model selection guidance:
- Use `GPT-5.5` for implementation, debugging, refactors, repo edits, build/lint fixes, and complex planning.
- Use `GPT-5.4` for medium-complexity planning, UI/content edits, release/versioning prompts, and review tasks.
- Use `GPT-5.4-Mini` for small copy edits, simple follow-ups, tiny visual tweaks, and low-risk scoped changes.
- When unsure, default to `GPT-5.5 - high`.

Reasoning mode guidance:
- Use `extra-high` only for broad architecture, security-sensitive changes, difficult debugging, or risky cross-file changes.
- Use `high` for most implementation, debugging, refactor, and repo-edit prompts.
- Use `medium` for bounded planning, review, UI/content edits, release/versioning prompts, and routine follow-ups.
- Use `low` only for small, obvious edits.

Tool/token discipline:
- Do not ask Codex to use browser/screenshot/web tools unless the task truly depends on rendered UI behavior.
- Prefer file/code inspection plus lint/build output.
- For routine style tweaks, do not force UI automation.

Prompt size rule:
- New task/new chat: full but targeted prompt.
- Same-task follow-up: compact prompt.
- Tiny visual fix: one paragraph.
- Do not keep re-pasting full repo context in the same chat.

For a new task or new Codex chat, include:
- the required project-target and model/reasoning header
- app root `/Users/FarisNazri/Documents/LearnMalay/learn-malay` when repo-root commands or cross-area context are relevant
- task goal
- exact feature/page/component
- files/folders to inspect
- files Codex may edit
- files/folders to avoid
- validation command

Keep scope tight. Do not include unrelated repo structure.

For same-task follow-ups:
Only include:
- "Same task follow-up."
- new instruction
- exact file/page/component
- what must not change
- validation command only if needed

Do not repeat:
- app root
- full tech stack
- full folder structure
- full avoid-list
- previous context already established

Recommended compact follow-up format:

{project target}
{model - reasoning}

Same task follow-up. Keep previous scope.
Only adjust [specific thing].
Do not change [protected thing].
Run [validation command if needed] and report changed files.

Tiny visual fix format (one paragraph):

{project target}
{model - reasoning}

Tiny visual fix. In [file/page/component], adjust [specific visual issue]. Keep content, logic, and behavior unchanged. Avoid browser/screen tools unless strictly needed. Run `npm run lint`.

Large/risky tasks:
- Ask Codex to inspect first and summarize plan before edits if scope is unclear.
- Limit editable files.
- Ask for changed files and validation results.
- Avoid vague prompts like "clean this up".

File targeting shortcuts:

Content/chapter tasks:
- `src/lib/chapters/chapter-XX.ts`
- `src/lib/chapters/types.ts`
- `src/lib/chapters/index.ts`
- `src/lib/akuAku/...` for helper dialog copy
Only include `app/chapter/[id]/page.tsx` when renderer behavior changes are required.

UI/page tasks:
- Title: `app/page.tsx`
- User/profile: `app/user/page.tsx`
- Map: `app/map/page.tsx`
- Chapter renderer: `app/chapter/[id]/page.tsx`
- Minigame hub/play pages: `app/minigames/...`
- Adventure Log page: `app/updates/page.tsx`
- Shared UI: `src/components/game/...`
- Global styling: `app/globals.css`

Backend/storage/session tasks:
- `app/api/...`
- `src/server/...`
- `src/lib/userStore.ts`
- `src/lib/highscores.ts`
- `src/lib/userCapabilities.ts`
Mention MongoDB only when relevant:
MongoDB is used when `MONGODB_URI` exists; otherwise local/dev can fall back to in-memory storage.

Versioning/release tasks (mandatory rule):
Learn Malay uses SemVer (`MAJOR.MINOR.PATCH`).
When the task involves versions, release notes, or commit comments, prompt Codex to inspect and align:
- `package.json` (canonical version)
- `src/lib/appVersion.ts` (in-app version label)
- `CHANGELOG.md` (release notes)
- `src/lib/adventureLog.ts` (in-app release entries)
- `ROADMAP.md` (current roadmap baseline)
- `scripts/check-release-drift.mjs` (release metadata and annotated tag validation)
- `app/updates/page.tsx` (release UI rendering)

SemVer intent to include in prompts:
- MAJOR = breaking change
- MINOR = new backward-compatible feature (`+0.1.0`)
- PATCH = backward-compatible fixes including bug/UI/content/copy/multilingual text/release metadata fixes (`+0.0.1`)

Important:
- Tell Codex to read current version from files first.
- No visible app version should exist without a corresponding release message in both `CHANGELOG.md` and `src/lib/adventureLog.ts`.
- If versions are out of sync and the task touches meaningful committed changes, ask Codex to report and fix the drift in-scope.
- Release/version tasks must run `npm run check:release-drift`.
- `npm run check:release-drift` now fails if `package.json`, `CHANGELOG.md`, `src/lib/adventureLog.ts`, `ROADMAP.md`, or required annotated `vX.Y.Z` tags drift.
- The script derives released versions from `CHANGELOG.md` headers and requires matching annotated tags.
- The script must not create or push tags automatically.
- Do not invent historical release commit guesses; only tag historical versions when the release commit is unambiguous.

Release phrase aliases:
- `plan close` and `plan close update` mean read-only release preflight. Use the `learn-malay-release-skill` and `npm run release:plan`; never stage, commit, tag, or push.
- `close update` and `close this update` mean the full staged-only release publish flow. Synchronize and review the release, stage only intended files, then run `npm run release:publish -- --version X.Y.Z`.
- Ambiguous close/update wording never implies permission to push.
- Internal workflow automation and prompt-context changes do not require an app version bump unless the user explicitly asks for a release.

Release automation commands:
- `npm run release:plan`
- `npm run release:publish -- --version X.Y.Z`
- `npm run check:release-metadata`
- `npm run test:release`

Commit-comment guidance for prompts:
Ask Codex to provide:
- recommended bump type (`MAJOR`/`MINOR`/`PATCH`) with one-line reason
- exact next version computed from current `package.json`
- commit subject aligned with change type (`feat`, `fix`, `refactor`, `docs`, `chore`)
- short release-note message for `CHANGELOG.md`
- matching Adventure Log entry for `src/lib/adventureLog.ts` (with `ms`/`en`/`es`; Added/Changed/Fixed when relevant)

Meaningful committed update categories this applies to:
- feature additions
- bug fixes
- UI fixes
- content/copy fixes
- multilingual text fixes
- refactors that meaningfully affect app behavior or maintenance
- release metadata fixes

Validation defaults:
- small visual/content change -> `npm run lint`
- routing/backend/structural change -> `npm run lint` and `npm run build`
- do not request tests unless tests exist
- do not ask to install packages unless explicitly required

Release closing tasks should confirm:
- `git status --short`
- synchronized metadata and explicitly staged release files
- `npm run release:publish -- --version X.Y.Z`
- annotated tag created for the release version
- `main` pushed
- release tag pushed

Standard avoid-list (for new tasks):
`node_modules/`, `.next/`, `out/`, `build/`, `coverage/`, `.git/`, `.env*`, `.vercel/`, `output/`, `tmp/`, `reports/`

For same-task follow-ups, do not repeat the full list.
Use: "Respect the existing avoid-list."

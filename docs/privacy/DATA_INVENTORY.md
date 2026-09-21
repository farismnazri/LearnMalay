# Learn Malay data inventory (internal)

Status: **IN PROGRESS**. Source reviewed 2026-09-20; production-dashboard evidence updated 2026-09-21. This register separates repository behavior from verified deployment facts and is not final legal-basis or public-notice text.

Verified operator: **Red Island Studio**, a business registered with the Companies Commission of Malaysia (SSM) under the Registration of Businesses Act 1956. The current certificate confirms the registered business name `RED ISLAND STUDIO`; it does not establish whether the legal form is sole proprietorship or partnership, so that distinction remains **TO VERIFY**. Public privacy contact: `fa.redislandstudio@gmail.com`. Approved user-facing wording: “Learn Malay is operated by Red Island Studio, a business registered with the Companies Commission of Malaysia (SSM).”

## Flow and common classifications

The account ID is the normalized uppercase username (`src/server/userRepo.ts`); it is directly linkable, not anonymous. Session IDs, highscore run IDs, and activity event IDs are also linkable while their records exist. The repository uses MongoDB if `MONGODB_URI` is set and an in-memory restart-reset store otherwise (`src/server/db.ts`). Production dashboard evidence confirms `MONGODB_URI` is configured in Vercel as a Secret scoped to Production only and points to the MongoDB Atlas `LearnMalay` deployment in AWS Singapore (`ap-southeast-1`); Atlas shows **Backups Inactive**. Preview deployments do not receive that production URI, and local development continues to use local environment configuration. Vercel CDN/function processing may occur outside Singapore, including in the United States. Access, contracts, exact provider-side log/Observability retention and external-recipient role analysis remain **TO VERIFY**. All lawful-basis conclusions require operator/legal review. Unless a narrower rule below is stated, source data is retained until account deletion or an administrator's score reset; that observation is not an approved retention policy.

### `users`: account, authentication, progress

Source: `/user` signup/login/avatar selection and server-generated progress/activity. Storage/schema: `src/server/db.ts:UserDocument`; write/read: `src/server/userRepo.ts`. `POST /api/users` creates the account and session. `GET /api/users/current` returns the current `UserProfile`; authenticated `POST /api/users/current` can switch accounts; `PATCH` changes avatar; `DELETE` logs out. Admin-only `GET /api/users` returns `UserProfile[]`. `POST /api/users/progress` accepts a target ID but checks the actor is that learner or an admin. `DELETE /api/users?id=` permits self or admin deletion, except admin/demo. None of these profile serializers includes password verifier fields. Public highscore names are the selected account names, which are derived from IDs.

Common purpose: persistent account, login/authorization, chapter position and completion, and private admin overview. Access: learner to own profile; admin to profile and analytics; server/database operators to raw records (**TO VERIFY**). External recipient and legal basis: **TO VERIFY**. Current deletion path removes the user, its sessions, `user_id` highscores and activity events; backup/log propagation and legacy name-only score attribution remain **TO VERIFY**.

| Field | Source and requiredness | Classification / exposure | Purpose and current retention |
| --- | --- | --- | --- |
| `id` | Generated from username; required | Directly linkable account ID; own/admin profile APIs, admin views; previously in public score API, now omitted as a separate field | Account lookup, joins; until deletion. |
| `name` | Learner username; required | Public with a saved highscore; own/admin APIs | Display and login; until deletion. |
| `avatar_id` | Selected or defaulted; selection optional | Public with a saved highscore; own/admin APIs | Profile/score display; until deletion. |
| `avatar_migration_version` | Server-generated; optional on old rows | Internal | Avatar migration; until deletion. |
| `is_admin` | Server-generated; required | Own/admin profile role derived from it | Authorization; until deletion. |
| `progress_chapter`, `progress_page` | Learning interaction; required | Own/admin profile APIs and admin analytics | Resume/unlock learning; until deletion. |
| `completed_chapter_revisions` | Learning interaction/backfill; required | Own/admin profile APIs and admin analytics | Completion and revision state; until deletion. |
| `chapter_progression_version` | Server migration; optional | Internal | Progress migration; until deletion. |
| `password_hash`, `password_salt`, `password_algo` | Password-derived verifier; required for normal signup | Server/database only; absent from `UserProfile` | Authentication; until deletion. Password value is not stored by this code. |
| `created_at`, `last_login_at`, `last_active_at` | Server timestamps; latter two optional | Admin analytics; not in normal `UserProfile` | Account age/recent activity; until deletion. |

### `sessions`: authentication cookie and server record

`src/server/sessionAuth.ts` sets `learnMalay.sessionId` with `HttpOnly`, `SameSite=Lax`, path `/`, and `Secure` when `NODE_ENV=production`; an old `learnMalay.currentUserId` cookie is cleared. `src/server/sessionRepo.ts` stores `id`, `user_id`, `created_at`, `last_seen_at`, `expires_at` (numeric milliseconds). All five fields are linkable authentication data, generated on login or signup, used only by auth APIs and server repositories; they are not returned by profile APIs. The cookie is visible to the browser as a cookie name but its value is inaccessible to client JavaScript. Learner expiry is 30 days, admin expiry 8 hours, both absolute; `last_seen_at` changes without extending `expires_at`. Logout, login replacement and account deletion remove relevant records. Expired rows are also removed when read. A bounded cleanup route and once-daily Vercel Cron configuration are prepared in source but have not been deployed, registered or run in production. External recipient, platform cookie/log handling, and live cleanup remain **TO VERIFY** until deployment verification.

### `highscores`: game runs and public score view

Source: authenticated `POST /api/highscores`; storage/schema: `src/server/db.ts:HighscoreDocument`, `src/server/highscoreRepo.ts`. Internal admin analytics reads full rows. Unauthenticated `GET /api/highscores` keeps filterable history but returns a display-only projection: name, avatar, score for Arah Jalan, accuracy for other games, time, date only, and valid game-specific difficulty/attempts/theme/mode/word count where displayed. It omits `user_id`, run `id`, arbitrary metadata, outcome, correct/mistake/hint counts, target language, and response-time detail. Public names remain account-linkable. `DELETE /api/highscores` is capability-restricted for admin score reset.

| Field(s) | Source / classification | Access and purpose | Retention/deletion |
| --- | --- | --- | --- |
| `id` | Client-generated run UUID; linkable through row | Internal deduplication/ranking; excluded from public API | Until account deletion or admin reset; name-only legacy rows **TO VERIFY**. |
| `user_id` | Server session ID link; optional on legacy rows | Internal owner join/admin analytics; excluded from public API | Same; current cascade matches this field. |
| `name`, `avatar_id` | Account snapshot | Public leaderboard display | Same; historic snapshots may outlive later profile edits. |
| `game_id`, `score_version`, `competitive`, `partition_key` | Game/server metadata; latter three optional legacy fields | Game grouping/ranking; public response groups by game but omits internal flags | Same. |
| `outcome`, `score`, `accuracy`, `time_ms` | Run result | Public projection uses score where displayed, accuracy and time; admin sees derived metrics | Same. |
| `attempts`, `correct`, `mistakes`, `hints` | Run counters | Public projection uses only valid attempts where needed | Same. |
| `difficulty`, `mode`, `target_language`, `theme`, `average_correct_response_time_ms` | Game configuration/performance | Public projection uses valid difficulty/mode/theme only; other fields internal | Same. |
| `date_iso`, `created_at` | Server timestamps | Public projection reduces `date_iso` to date; full timestamp internal | Same. |
| `meta_json` | Client-supplied limited JSON, up to 2048 bytes | Internal/legacy ranking fallback; arbitrary object excluded from public response | Same; permitted keys/old data **TO VERIFY**. |
| `difficulty_weight` | Server-derived | Internal ranking support | Same. |

### `activity_events`: learner event history

Source: login, `POST /api/activity`, chapter progress, and highscore submission; storage/schema: `src/server/db.ts:ActivityEventDocument`, `src/server/activityRepo.ts`. `id` is a generated or client-provided event ID (deduplication), `user_id` is linkable, `event_type` is one of login/chapter-started/chapter-completed/minigame-started/minigame-finished, `timestamp` is an ISO timestamp, and `chapter_id`/`minigame_id` are optional. All are used for private admin analytics; no public event-read API was found. A 90-day cleanup command, authenticated cron route and once-daily Vercel configuration are prepared but have not been deployed, registered or run in production. Provisional operator choice: 90 days of raw events, no derived per-learner event history after expiry; legal review and production enforcement are pending. Account deletion now removes `user_id` events. External recipients/log copies: **TO VERIFY**.

### Admin-derived data, logs, browser storage, and metadata

- `src/server/adminAnalyticsRepo.ts` reads users, the rolling 90-day activity window and internal highscores for `/api/admin/analytics`, `/api/admin/users`, and `/api/admin/users/[id]`; each API calls `requireAdminApi`. `/admin` and `/admin/users` pages require an admin session. Derived metrics include account age/activity, chapter completion, recent event counts, game usage, score counts and learner detail. Event-derived views are labelled as a rolling window; account progress/completion state remains.
- In-process auth and route limiters (`src/server/authSecurity.ts`, `src/server/routeRateLimit.ts`) key buckets by apparent IP and account/subject; the buckets expire in process. `logAdminAudit` writes action, success, actor/target IDs, apparent IP, reason and timestamp to `console.info`. Other server catches write errors to `console.error`. Production evidence confirms active Vercel Runtime Logs, deployment/build logs and native Observability. Official Vercel documentation states Hobby Runtime Logs retain one hour and build logs are stored indefinitely per deployment; the project’s deployment-retention policy, provider-side operational/audit logs, capture, access, redaction and Observability retention remain **TO VERIFY**.
- Vercel Web Analytics was enabled on 2026-09-20. Vercel documents a one-month Hobby reporting window, while allowing longer provider storage for upgrade purposes. It is platform analytics separate from the repository’s account-linked activity events. The actual fields/configuration, access, location and lawful-basis/notice analysis remain **TO VERIFY**. Speed Insights is not enabled; no third-party monitoring/error-tracking integration was identified in Vercel Integrations or the scoped repository review.
- Browser `localStorage` stores UI language (`learnMalay.uiLang.v1`), audio settings, add-to-home prompt dismissal and some game difficulty preferences. No source use of `sessionStorage`, IndexedDB or service-worker registration was found in the scoped search; verify deployed scripts and browser behavior. Client `userStore` profile cache is in memory. The session cookie is described above.
- `app_meta` stores `users_auth_v1_bootstrap_done` and `updated_at`; no individual linkage is apparent in source. Reassess if production data differs.

## Open verification before notice

Confirm contractual roles, terms/DPA/subprocessors, access rosters, database security settings, deployment-retention policy, Vercel Observability and provider operational/audit-log retention, legal bases and rights language, whether legacy name-only scores exist and are attributable, legal approval/enforcement of the 90-day activity schedule, restore deletion propagation if future backups are enabled, and any service outside the reviewed repository and Vercel Integrations. Generated IDs must never be described as anonymous merely because they are not shown publicly.

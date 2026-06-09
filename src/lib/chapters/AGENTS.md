# Chapter Content Guidance

This file supplements the repository-root `AGENTS.md` for files under `src/lib/chapters/`.

- Use the `chapters` project for bounded chapter-content work. Use the `learn-malay` project if the change also needs Aku-Aku dialogs, assets, renderer behavior, Git, release, or repo-wide validation.
- Preserve the existing `ChapterContent` types, stable IDs, page order, and completion behavior.
- Keep every required `{ ms, en, es }` value present and non-empty. Prefer natural spoken Malaysian Malay and equivalent learner-friendly translations over literal wording.
- Do not edit `app/chapter/[id]/page.tsx` unless renderer behavior must change.
- Run `npm run lint`; also run `npm run build` when shared types, page structure, or renderer behavior changes.


## Lesson Progression Rules

- Treat each chapter as a sequential learning path. Page 1 should introduce or activate the concepts needed by later pages.
- Do not assume the learner knows vocabulary, grammar, sentence patterns, cultural context, or UI interaction rules unless they were introduced earlier in the same chapter or clearly covered in a previous chapter.
- Each page should connect to the previous page and prepare for the next one. Avoid isolated pages that feel like unrelated flashcards.
- When adding or revising a page, check the full chapter flow from page 1 to the end:
  - what the learner already knows before this page
  - what this page teaches
  - what later pages depend on
- New examples should reuse earlier vocabulary before introducing new vocabulary.
- Introduce only a small number of new concepts per page. If a page needs too many explanations, split it or simplify it.
- Practice pages should only test concepts that have already been taught.
- Avoid using Malay terms in instructions before they are introduced, unless the term is translated immediately.
- Keep the chapter arc coherent: introduction -> guided examples -> comparison/contrast -> practice -> recap or confidence-building close.

## Language Quality Rules

* Prioritize natural Malaysian Malay grammar and usage over direct translation from English or Spanish.
* Treat Malay (`ms`) as the primary learning language. English (`en`) and Spanish (`es`) should explain the same meaning naturally, not mirror Malay word order.
* Do not translate word-for-word when it makes the sentence awkward, unnatural, or grammatically wrong in any language.
* Keep all learner-facing language short, clear, and age-accessible.
* Use spoken, practical Malaysian Malay unless the chapter explicitly teaches formal language.
* Avoid introducing grammar patterns that are more advanced than the current chapter unless they are explained immediately.
* If a phrase sounds unnatural in Malay, rewrite the idea instead of forcing a direct translation.
* Keep tone consistent across languages: friendly, simple, and confidence-building.
* For Spanish, use natural neutral Spanish unless a specific regional tone is requested.
* For English, use simple learner-friendly wording rather than overly literal grammar explanations.

## Chapter Chat Rules

* Chapter chats must feel like natural short conversations, not grammar drills disguised as dialogue.
* Each chat should have a clear everyday situation, such as greeting, asking for help, buying food, meeting family, or asking directions.
* Keep chats short: maximum 4 exchanges per person, 8 speech bubbles total.
* Each speaker should respond logically to the previous line.
* Do not make a character use vocabulary, grammar, or cultural context that the learner has not already seen or that the chat does not immediately clarify.
* Prefer simple sentence patterns and repeated vocabulary so the chat reinforces the lesson.
* Avoid long speeches inside chat bubbles.
* Avoid unnatural “textbook” conversations where characters only list vocabulary.
* Make sure the Malay chat is natural first, then adapt English and Spanish to match the meaning.
* If shortening is needed, preserve conversational logic before preserving exact wording.


## Chapter Revision / Learner Notification Rules

- Each chapter has its own `revision` number. Base/original chapters start at `revision: 1`.
- `revision` is separate from the app SemVer version in `package.json`.
- Increment a chapter `revision` by exactly `+1` when the chapter content change is learner-visible and returning learners should be notified.
- Learner-visible changes include meaningful changes to lesson pages, examples, chats, exercises, answers, translations, or chapter structure.
- Do not increment `revision` for formatting-only edits, internal refactors, comments, lint fixes, or changes that do not affect what learners see.
- If a learner already completed an older chapter revision, the app can show the chapter update `!` notification based on the saved completed revision versus the current chapter revision.
- When revising a chapter, report whether `revision` changed and why.
- If multiple learner-visible edits are made to the same chapter before shipping/committing, increment the revision once for that shipped revision, not once per tiny edit.
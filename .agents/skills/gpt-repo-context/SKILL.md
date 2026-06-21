---
name: gpt-repo-context
description: Refresh a repository's CHATGPT_REPO_CONTEXT.md after meaningful repo changes so future ChatGPT prompt writing has compact, factual, durable project context. Use when the user asks to refresh, update, audit, or repair ChatGPT repo context after recent changes.
---

# GPT Repo Context

Refresh the repo context file from inspected repository facts. Keep the result compact, durable, and useful for future ChatGPT prompt writing.

## When to use

- Use when the user asks for a ChatGPT repo context refresh, especially phrases like `/gpt-repo-context refresh after recent changes`.
- First locate the context file. Prefer `Chat_GPT_Context/CHATGPT_REPO_CONTEXT.md`, then look for obvious variants such as `CHATGPT_REPO_CONTEXT.md`, `chatgpt_repo_context.md`, or `repo_context.md`.
- If no clear context file exists, stop and report that no repo context file was found.

## What to inspect

1. Run `git status --short` and preserve unrelated work.
2. Review recent history with `git log --oneline --decorate`.
3. Inspect relevant package, build, config, routing, framework, or tooling files.
4. Inspect changed source, docs, workflow, or architecture files that affect durable repo context.
5. Inspect version or release files only when the existing context file already has version, release, changelog, or roadmap sections.

## What to update

- Update only factual, durable context that can be verified from the repository.
- Prefer concise summaries of current architecture, workflows, commands, conventions, important files, and active constraints.
- Remove stale claims. If a useful claim cannot be verified, either omit it or mark it as requiring inspection.
- Keep references to files and commands specific enough to be actionable without duplicating large blocks of content.
- Keep the context useful for prompt writing, not exhaustive repository navigation.

## What not to update

- Do not turn the context file into a full project map, changelog, release note, task log, or directory listing.
- Do not duplicate long directory listings when a separate project map or similar file exists.
- Do not update app release metadata, bump versions, tag releases, or publish anything.
- Do not edit unrelated prompt rules, agent instructions, package files, generated files, app code, or release files unless the user explicitly asks.
- Do not add scripts or new automation unless requested.

## Validation

1. Review the context diff for unverifiable claims, stale statements, excess detail, and accidental scope changes.
2. Run `git diff --check`.
3. Run `git status --short`.
4. Report the context file path, key factual updates made, validation results, and any claims left out because they could not be verified.

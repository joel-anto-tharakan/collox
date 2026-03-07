# AGENTS.md

## Repository overview

- Repository name: `collox`
- License: MIT
- Current state: greenfield repository
- Current top-level files: `README.md`, `LICENSE`, and this `AGENTS.md`

## Cursor Cloud specific instructions

This repository does not have an application stack yet.

- No dependency manifests exist yet.
- No source directories exist yet.
- No services exist yet.
- No test, lint, format, or build tooling is configured yet.

Because of that, agents should not assume any language, framework, package manager, or runtime commands are available unless they add them as part of the task.

## Working agreement for future agents

When implementing the first real features in this repository:

1. Keep the initial structure minimal and easy to understand.
2. Prefer a single clearly chosen stack instead of adding multiple overlapping tools.
3. Add only the dependencies needed for the requested task.
4. Create standard scripts or commands for build, test, lint, and local run as soon as tooling exists.
5. Update both `README.md` and this file when project setup instructions become concrete.

## Current testing guidance

Right now there are no configured automated checks. For documentation-only changes, manual review is sufficient.

If you add application code or tooling, you should also add and run the smallest relevant validation for that stack, such as:

- a targeted test command
- a lint or typecheck command
- a build command when applicable

Do not claim commands exist until they are actually configured in the repository.

## Required follow-up when the stack is introduced

As soon as this repository gains a real stack, replace this placeholder guidance with concrete instructions for:

- install/setup
- local development run steps
- test commands
- lint/format commands
- build/package commands
- any required environment variables or local services

## Notes for repository changes

- Prefer small, focused commits.
- Avoid adding unrelated scaffolding unless the task requires it.
- If a task introduces a new convention or project layout, document it here so later agents can follow it consistently.

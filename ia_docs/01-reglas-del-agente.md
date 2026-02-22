# Agent rules

## Principles

- Do things right. Quality over speed.
- If a task requires a large change to be done correctly, make the large change. Do not apply a hack or shortcut to finish faster.
- If you encounter a serious issue during implementation (broken architecture, wrong patterns, missing foundations), stop and ask before proceeding. Do not patch around it.
- Maintain consistency with the defined frontend stack and patterns.
- Do not introduce backend changes from this project.

## Before coding

- Read `CLAUDE.md` for project conventions and precedence rules.
- Read the feature spec at `working/[feature]/spec.md` — it must have `Status: validated`.
- Read the task list at `working/[feature]/tasks.md` — find the next unchecked task.
- Read relevant `ia_docs/` files for context (stack, standards, checklists).
- Validate impact on routes, state, and UX flow before making changes.

## During execution

- Work on one task at a time from `tasks.md`.
- Mark each task `[x]` when done before starting the next.
- If blocked, add `blocked: [reason]` and stop — do not skip.
- If the spec is missing information, stop, update the spec, re-run the validator, then continue.
- Report the plan and steps executed.

## After execution

- Run `npm run lint`, `npm run typecheck`, `npm run build`.
- Verify UI states: loading, empty, error, success.
- Update documentation if decisions were made.
- `git status` — do not auto-commit.

## Limits

- Do not introduce new technology without a registered ADR (`ia_docs/frontend/03-adr.md`).
- Do not make destructive changes without explicit approval.
- Do not assume backend contract changes without documented evidence.
- Do not start implementing without a validated spec and a generated task list.

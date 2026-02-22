# Execution flow

## Overview

```
spec.md  →  validate  →  tasks.md  →  execute (one by one)  →  accept  →  close
```

---

## Optional — Business alignment

These steps are only needed for major features that require product alignment or when starting a new domain. For features where the context is already clear, skip directly to Step 1.

- Define functional scope and main user journeys in `docs/`.
- Document product and UX decisions in `docs/`.
- Translate technical conventions to `ia_docs/`.

---

## Step 1 — Create specification

- Copy `working/_template/spec.md` to `working/[feature]/spec.md`.
- Fill in everything that is already known.
- Leave blanks for what needs to be discussed.

---

## Step 2 — Validate specification

- Run the validator agent: `ia_docs/06-agente-validador.md`.
- Answer each question one at a time until the agent confirms the spec is complete.
- Do not start implementing before the agent outputs: `"Specification complete. Ready for implementation."`
- The agent sets `Status: validated` in `spec.md` automatically.

---

## Step 3 — Generate task list

- After validation, the agent creates `working/[feature]/tasks.md` with an ordered, checkbox task list.
- Each task is atomic: one clear action, one acceptance criterion.
- Do not modify the task list unless the spec changes.

---

## Step 4 — Execute tasks one by one

- Read `tasks.md` and start with the first unchecked task.
- Before starting a task: read the spec and relevant `ia_docs/` files.
- Implement only what that task requires. Do not skip ahead.
- After completing a task: mark it as done in `tasks.md` with `[x]`.
- Then move to the next task.

Rules:
- Never start a new task without marking the previous one as done.
- If a task is blocked, add a `⚠ blocked: [reason]` note and stop — do not skip it silently.
- If a task reveals missing information in the spec, stop, update the spec, re-run the validator, then continue.

---

## Step 5 — Acceptance

Compare the implemented result against the spec, section by section:

- [ ] Objective: does the feature fulfill its stated purpose?
- [ ] User journeys: walk through main flow and error flows — do they work as specified?
- [ ] Screens and states: verify each screen handles loading, empty, error, and success.
- [ ] UI layout: does the layout match the description in the spec?
- [ ] API integration: are all endpoints consumed correctly?
- [ ] Validation rules: test each form field against the rules in the spec.
- [ ] Error cases: trigger each error case from the spec and verify the UI response.
- [ ] Navigation: verify routes, redirects, and auth guards.

If any check fails, create a follow-up task or re-open the relevant task in `tasks.md`.

---

## Step 6 — Technical validation

- `npm run lint` — fix all errors.
- `npm run typecheck` — no TypeScript errors.
- `npm run build` — clean build.
- Verify UI states for the implemented screen: loading / empty / error / success.
- No regressions in existing navigation or flows.

---

## Step 7 — Close

- All tasks marked `[x]` in `tasks.md`.
- Acceptance checklist passed (Step 5).
- Set `Status: implemented` in `spec.md`.
- `git status` — review changes, do not auto-commit.
- If architectural decisions were made: register in `ia_docs/frontend/03-adr.md`.
- If pending work remains: add to `ia_docs/frontend/05-operacion-y-gobernanza.md`.

# Operational checklists

## New feature

### Before implementation
- [ ] Feature spec created in `working/[feature]/spec.md`.
- [ ] Validator agent run — spec `Status: validated`.
- [ ] Task list generated in `working/[feature]/tasks.md`.

### During implementation
- [ ] Each task executed in order, one at a time.
- [ ] Each task marked `[x]` before starting the next.
- [ ] Blocked tasks noted with reason.

### After implementation
- [ ] All tasks marked `[x]` in `tasks.md`.
- [ ] Spec `Status` updated to `implemented`.
- [ ] UX flow defined and working.
- [ ] Breadcrumb implemented on internal screens.
- [ ] Page title and breadcrumb aligned.
- [ ] UI states covered: loading / empty / error / success.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] Documentation synchronized.

## Refactor

- [ ] Functional behavior preserved.
- [ ] Navigation and routes intact.
- [ ] Breadcrumb and back navigation intact.
- [ ] Test coverage sufficient.
- [ ] Complexity reduced or equal.
- [ ] Risks documented.

## Bugfix

- [ ] Root cause identified.
- [ ] Reproducible case documented.
- [ ] Fix validated with test.
- [ ] UI state and error message validated.
- [ ] Regression note added.

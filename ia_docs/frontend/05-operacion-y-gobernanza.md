# Operations and governance

## Roles

- **Product owner:** Defines UX scope in `docs/`.
- **Frontend technical lead:** Approves ADRs, integrates changes.
- **Operations:** Deploy, monitoring (Vercel/Sentry).

## Change process

### Mandatory (every feature)
1. Create feature spec in `working/[feature]/spec.md`.
2. Run validator agent — complete spec until `Status: validated`.
3. Agent generates `working/[feature]/tasks.md`.
4. Implement with Claude Code / Codex — one task at a time, marking `[x]`.
5. Acceptance — compare result vs spec section by section.
6. Technical validation (lint / typecheck / build).
7. PR review + merge + documentation update.

### Optional (major features requiring business alignment)
- Define scope in `docs/` (business context).
- Translate technical rules to `ia_docs/`.

## Definition of Done

- [ ] Spec `Status: validated` before coding started.
- [ ] All tasks in `tasks.md` marked `[x]`.
- [ ] Acceptance checklist passed (result matches spec section by section).
- [ ] Spec `Status: implemented`.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm run build` passes.
- [ ] Test coverage >80%.
- [ ] Dev server runs without errors.
- [ ] Documentation synchronized (`ia_docs/`, `docs/`).
- [ ] Demo on deploy preview.

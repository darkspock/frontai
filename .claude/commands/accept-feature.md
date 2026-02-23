Read the execution flow at `ia_docs/02-flujo-de-ejecucion.md` (Steps 5, 6, and 7).

Run the acceptance process for feature: `working/$ARGUMENTS/`

Steps:
1. **Acceptance (Step 5):** Compare the implementation against each section of `working/$ARGUMENTS/spec.md` using the checklist from the execution flow.
2. **Technical validation (Step 6):** Run `npm run lint`, `npm run typecheck`, `npm run build`. Verify UI states.
3. **Close (Step 7):** If all checks pass, mark `Status: implemented` in `spec.md`. Report results.

If any check fails, create follow-up tasks or re-open relevant tasks in `tasks.md`.

If no argument is provided, ask which feature by listing the folders inside `working/` (excluding `_template`).

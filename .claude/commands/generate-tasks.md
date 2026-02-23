Read the execution flow at `ia_docs/02-flujo-de-ejecucion.md` (Step 3).
Read the validator agent output format at `ia_docs/06-agente-validador.md` (section "Output after validation").

Generate the task list for: `working/$ARGUMENTS/tasks.md`

Requirements:
- The spec at `working/$ARGUMENTS/spec.md` must have `Status: validated`. If not, refuse and suggest running `/validate-spec` first.
- Follow the task ordering defined in `ia_docs/06-agente-validador.md`.
- Each task must be atomic with a clear acceptance criterion.
- Use `- [ ]` checkboxes.

If no argument is provided, ask which feature by listing the folders inside `working/` (excluding `_template`).

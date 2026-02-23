Read and follow the agent rules at `ia_docs/01-reglas-del-agente.md`.
Read the execution flow at `ia_docs/02-flujo-de-ejecucion.md` (Step 4).

Execute the tasks for feature: `working/$ARGUMENTS/tasks.md`

Process:
1. Read the task list and find the first unchecked `- [ ]` task.
2. Read the spec at `working/$ARGUMENTS/spec.md` for context.
3. Read relevant `ia_docs/` files as needed.
4. Implement the task.
5. Mark it `[x]` in `tasks.md`.
6. Move to the next unchecked task.
7. Repeat until all tasks are done or a task is blocked.

If no argument is provided, ask which feature by listing the folders inside `working/` (excluding `_template`).

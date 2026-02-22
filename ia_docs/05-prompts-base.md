# Base prompts

## Prompt: Implement task

```text
Read CLAUDE.md for project conventions.
Read the feature spec at working/[feature]/spec.md.
Read the task list at working/[feature]/tasks.md.
Find the next unchecked task and implement only that task.
Follow ia_docs/03-estandares-de-codigo.md for code quality.
After completing the task, mark it [x] in tasks.md.
Run npm run lint, npm run typecheck, npm run build.
If blocked, explain what is missing and stop.
```

## Prompt: Review quality

```text
Do a frontend code review focused on bugs, flow/navigation regressions, and missing tests.
Prioritize findings by severity and indicate file and line.
Do not focus on style unless it impacts maintainability or causes failures.
Verify that all UI states are handled: loading, empty, error, success.
```

## Prompt: Safe refactor

```text
Refactor without changing external behavior.
First describe routes, flows, and UI contracts that must be preserved.
Then apply small changes and validate with lint/typecheck/build.
Summarize residual risks.
```

## Prompt: Validate spec

```text
Run the validator agent defined in ia_docs/06-agente-validador.md.
Read working/[feature]/spec.md.
Check all 10 required sections in order.
For each missing or incomplete section, ask ONE question at a time.
Once all sections pass, confirm and generate tasks.md.
```

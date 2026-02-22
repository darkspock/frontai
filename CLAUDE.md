# FrontAI — Claude Code Project Instructions

## What this project is

Reusable frontend base for management apps, built with AI assistants (Claude Code / Codex). No backend — assumes an external REST API.

## Tech stack

- Vite 5 + React 18 + TypeScript 5
- Tailwind CSS 3 + shadcn/ui + lucide-react
- React Router DOM v6
- TanStack Query v5 (server state)
- Zod + react-hook-form (validation)

## Mandatory workflow

Before implementing any feature, follow the execution flow in `ia_docs/02-flujo-de-ejecucion.md`:

1. Read the feature spec at `working/[feature]/spec.md`.
2. If no spec exists, create one from `working/_template/spec.md`.
3. Run the validator agent (`ia_docs/06-agente-validador.md`) — answer questions until the spec is validated.
4. After validation, a `tasks.md` is generated in the same folder.
5. Execute tasks one by one in order. Mark each `[x]` before moving to the next.
6. Run `npm run lint`, `npm run typecheck`, `npm run build` after completing tasks.
7. Never skip a task. If blocked, stop and note the reason.

## Key docs to read before coding

- `ia_docs/00-contexto-del-proyecto.md` — stack, constraints, assumptions
- `ia_docs/01-reglas-del-agente.md` — agent rules and limits
- `ia_docs/03-estandares-de-codigo.md` — code quality standards
- `ia_docs/04-checklists.md` — checklists by change type
- `ia_docs/references/frontend/` — reference material (see precedence rule below)

## Documentation hierarchy

When docs conflict, this is the precedence order (highest wins):

1. This file (`CLAUDE.md`)
2. `ia_docs/` root files (00 through 06)
3. `ia_docs/frontend/` files
4. `ia_docs/references/frontend/` (imported, advisory only)
5. `docs/` (business context, not technical specs)

## Quality principles

- Do things right. Quality over speed.
- If a task requires a large change to be done correctly, make the large change. Do not hack or shortcut to finish faster.
- If you encounter a serious issue (broken architecture, wrong patterns, missing foundations), stop and ask before proceeding. Do not patch around it.

## Project conventions

- All documentation and code comments in English.
- Feature specs live in `working/[feature]/spec.md`.
- Task lists live in `working/[feature]/tasks.md`.
- Do not introduce new technologies without registering an ADR in `ia_docs/frontend/03-adr.md`.
- Do not auto-commit. Run `git status` and let the user decide.
- States required for every screen: loading, empty, error, success.
- Date format in UI: `YYYY/MM/DD`.
- Imports path alias: `@/` maps to `src/`.

## Source structure (target)

```
src/
├── app/           # Routes and layouts
├── components/    # UI components
│   ├── ui/        # shadcn/ui only
│   └── [Feature]/ # Feature-specific
├── hooks/         # Custom hooks
├── lib/           # Utilities (utils.ts, validators.ts)
├── services/      # API adapters
├── types/         # TypeScript type definitions
└── constants/     # Constants and configuration
```

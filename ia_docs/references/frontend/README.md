# Frontend References (Imported)

Este directorio contiene documentacion importada desde:

- `../desksupportmonkey/ai_docs/architecture/frontend`

## Objetivo

- Conservar referencias utiles de frontend sin mezclar el flujo principal frontend-only de este proyecto.

## Estructura reorganizada

- `standards/coding-standards.md`
- `architecture/technical-architecture.md`
- `components/component-library.md`
- `design/screen-design-guide.md`
- `design/web-ui-design-guide.md`

## Precedence rule

These documents are **advisory reference material only**. When any content here conflicts with the project's own documentation, the project docs always win.

Priority order (highest first):
1. `CLAUDE.md` (project root)
2. `ia_docs/` root files (00 through 06)
3. `ia_docs/frontend/` files
4. `ia_docs/references/frontend/` (this folder — lowest priority)

## Known differences with this project

These references come from Metrica.uno and use a different configuration:
- React 19 (this project uses React 18)
- React Router v6 with different route structure
- Different `src/` folder layout (`src/pages/` vs this project's `src/app/`)
- Different API error format (`{detail: ...}` vs this project's `{error: msg, code: string}`)

When in doubt, follow `ia_docs/00-contexto-del-proyecto.md` — not these references.

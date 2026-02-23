# FrontAI — Instrucciones del proyecto para Claude Code

## Que es este proyecto

Base frontend reutilizable para aplicaciones de gestion, construida con asistentes de IA (Claude Code / Codex). Sin backend — asume una API REST externa.

## Stack tecnologico

- Vite 5 + React 18 + TypeScript 5
- Tailwind CSS 3 + shadcn/ui + lucide-react
- React Router DOM v6
- TanStack Query v5 (estado del servidor)
- Zod + react-hook-form (validacion)

## Flujo obligatorio

Antes de implementar cualquier feature, seguir el flujo de ejecucion en `ia_docs/02-flujo-de-ejecucion.md`:

1. Leer la spec del feature en `working/[feature]/spec.md`.
2. Si no existe spec, crearla desde `working/_template/spec.md`.
3. Ejecutar el agente validador (`ia_docs/06-agente-validador.md`) — responder preguntas hasta que la spec este validada.
4. Tras la validacion, se genera un `tasks.md` en la misma carpeta.
5. Ejecutar las tareas una por una en orden. Marcar cada `[x]` antes de pasar a la siguiente.
6. Ejecutar `npm run lint`, `npm run typecheck`, `npm run build` tras completar las tareas.
7. No saltar ninguna tarea. Si hay bloqueo, detenerse y anotar el motivo.

## Documentacion clave antes de codificar

- `ia_docs/00-contexto-del-proyecto.md` — stack, restricciones, supuestos
- `ia_docs/01-reglas-del-agente.md` — reglas y limites del agente
- `ia_docs/03-estandares-de-codigo.md` — estandares de calidad de codigo
- `ia_docs/04-checklists.md` — checklists por tipo de cambio

## Jerarquia de documentacion

Cuando los documentos entren en conflicto, este es el orden de precedencia (el mas alto gana):

1. Este archivo (`CLAUDE.md`)
2. Archivos raiz de `ia_docs/` (00 a 06)
3. Archivos de `ia_docs/frontend/`
4. `docs/` (contexto de negocio, no especificaciones tecnicas)

## Principios de calidad

- Hacer las cosas bien. Calidad sobre velocidad.
- Si una tarea requiere un cambio grande para hacerse correctamente, hacer el cambio grande. No hackear ni atajar para terminar mas rapido.
- Si se encuentra un problema serio (arquitectura rota, patrones incorrectos, fundamentos faltantes), detenerse y preguntar antes de continuar. No parchear alrededor del problema.

## Convenciones del proyecto

- Toda la documentacion y comentarios de codigo en español.
- Las specs de features viven en `working/[feature]/spec.md`.
- Las listas de tareas viven en `working/[feature]/tasks.md`.
- No introducir tecnologias nuevas sin registrar un ADR en `ia_docs/frontend/03-adr.md`.
- No hacer auto-commit. Ejecutar `git status` y dejar que el usuario decida.
- Estados requeridos para cada pantalla: loading, empty, error, success.
- Formato de fecha en UI: `YYYY/MM/DD`.
- Alias de imports: `@/` apunta a `src/`.

## Estructura del codigo fuente (objetivo)

```
src/
├── app/           # Rutas y layouts
├── components/    # Componentes UI
│   ├── ui/        # Solo shadcn/ui
│   └── [Feature]/ # Especificos del feature
├── hooks/         # Custom hooks
├── lib/           # Utilidades (utils.ts, validators.ts)
├── services/      # Adaptadores de API
├── types/         # Definiciones de tipos TypeScript
└── constants/     # Constantes y configuracion
```

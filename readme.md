# FrontAI

Frontend del proyecto **Desk Support Monkey** (DSM) — plataforma de IT Service Desk y gestion de activos. Construido con desarrollo asistido por IA usando Claude Code.

## Stack

Vite 5 + React 18 + TypeScript 5 + Tailwind CSS 3 + shadcn/ui + TanStack Query v5.

## Alcance

- Pantallas y experiencia de usuario del frontend.
- Flujos de navegacion y arquitectura de rutas.
- Gestion de estado de UI y estado de servidor.
- Integracion con la API backend existente (~170 endpoints).

Este repositorio no define ni implementa backend.

## Flujo de trabajo

### Flujo obligatorio (cada feature)

1. Crear spec en `working/[feature]/spec.md` (copiar desde `working/_template/spec.md`).
2. Ejecutar el agente validador (`ia_docs/06-agente-validador.md`) — responder preguntas hasta que la spec este completa.
3. Implementar con Claude Code — una tarea a la vez desde el `tasks.md` generado.
4. Aceptacion — comparar el resultado contra la spec seccion por seccion.
5. Validacion tecnica (`npm run lint`, `npm run typecheck`, `npm run build`), actualizar documentacion.

### Pasos opcionales (para features grandes que requieren alineacion de negocio)

- Definir alcance funcional y journeys principales en `docs/`.
- Documentar decisiones de producto y UX en `docs/`.
- Traducir convenciones tecnicas a `ia_docs/`.

Estos pasos son utiles al iniciar un dominio nuevo o un feature grande. Para features donde el contexto ya esta claro, empezar directamente en el paso 1.

## Arquitectura de documentacion

- `docs/`: contexto de negocio y producto (ligero, orientado a humanos).
- `ia_docs/`: documentacion tecnica principal y operativa (fuente principal para implementacion con IA).
- `ia_docs/frontend/`: documentacion tecnica detallada del frontend (arquitectura, tokens, patterns, API catalog).
- `working/`: especificaciones activas por funcionalidad — una subcarpeta por feature con `spec.md` y `tasks.md`.

## Estructura del proyecto

```
├── CLAUDE.md              # Instrucciones para Claude Code (prioridad maxima)
├── docs/                  # Contexto de negocio y producto
├── ia_docs/               # Documentacion tecnica para IA
│   ├── 00-06              # Reglas, flujos, estandares, checklists, prompts, validador
│   └── frontend/          # Arquitectura, tokens, patterns, API catalog
├── working/               # Specs activas por feature
│   ├── _template/         # Plantillas base (spec.md, tasks.md)
│   └── [feature]/         # Una carpeta por feature
└── src/                   # Codigo fuente
    ├── app/               # Rutas y layouts
    ├── components/        # Componentes UI (ui/ para shadcn, [Feature]/ para especificos)
    ├── hooks/             # Custom hooks
    ├── lib/               # Utilidades
    ├── services/          # Adaptadores de API
    ├── types/             # Tipos TypeScript
    └── constants/         # Constantes y configuracion
```

## Convenciones

- Toda decision tecnica debe reflejarse en `ia_docs/`.
- Toda decision de negocio o producto debe reflejarse en `docs/`.
- Ambas fuentes deben mantenerse sincronizadas en cada iteracion.
- Idioma de documentacion y comentarios de codigo: español.
- Formato de fecha en UI: `YYYY/MM/DD`.
- Path alias: `@/` apunta a `src/`.

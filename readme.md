# FrontAI

## Objetivo
Este proyecto establece una base para crear aplicaciones frontend de gestion usando asistentes de desarrollo como Claude Code o Codex.

La meta es definir:
- Un flujo de trabajo claro entre personas y agentes de IA.
- Una arquitectura frontend reutilizable para nuevos proyectos.
- Una organizacion documental que separe contexto tecnico para IA y documentacion orientada a humanos.

## Alcance del proyecto
- Diseno de pantallas y experiencia de usuario.
- Flujos de navegacion y arquitectura de rutas.
- Gestion de estado de UI y estado de servidor.
- Integracion con una API backend ya existente.

Este repositorio no define ni implementa backend.

## Flujo de trabajo propuesto

### Mandatory flow (every feature)
1. Create feature spec in `working/[feature]/spec.md`.
2. Run validator agent (`ia_docs/06-agente-validador.md`) — complete missing fields question by question until the spec is ready.
3. Implement with Claude Code or Codex — one task at a time from the generated `tasks.md`.
4. Acceptance — compare the result against the spec section by section.
5. Technical validation (lint, typecheck, build), documentation update, consolidation.

### Optional steps (for major features requiring business alignment)
- Define functional scope and main user journeys in `docs/`.
- Document product and UX decisions in `docs/`.
- Translate technical conventions to `ia_docs/`.

These steps are useful when starting a new domain or a large feature that requires alignment between product and engineering. For smaller features where the context is already clear, start directly at step 1.

## Arquitectura de documentacion
- `docs`: contexto de negocio y producto (ligero, para alineacion humana).
- `ia_docs`: documentacion tecnica principal y operativa (fuente fuerte para implementacion frontend con IA).
- `working`: especificaciones activas por funcionalidad — una subcarpeta por feature, con su `spec.md`.

## Estructura inicial incluida
- `docs/README.md` con indice de documentos para humanos.
- `ia_docs/README.md` con indice de documentos para IA.
- `working/README.md` con estructura y convencion de uso.
- `working/_template/spec.md` con plantilla base para especificaciones.
- `ia_docs/06-agente-validador.md` con el agente que valida especificaciones antes de implementar.
- Plantillas base listas para completar en ambas carpetas.

## Convencion inicial
- Toda decision tecnica debe reflejarse en `ia_docs`.
- Toda decision de negocio o producto debe reflejarse en `docs`.
- Ambas fuentes deben mantenerse sincronizadas en cada iteracion.
- `docs` no es el lugar de especificaciones tecnicas detalladas.

# Reglas del agente

## Principios

- Hacer las cosas bien. Calidad sobre velocidad.
- Si una tarea requiere un cambio grande para hacerse correctamente, hacer el cambio grande. No aplicar hacks ni atajos para terminar mas rapido.
- Si se encuentra un problema serio durante la implementacion (arquitectura rota, patrones incorrectos, fundamentos faltantes), detenerse y preguntar antes de continuar. No parchear alrededor del problema.
- Mantener consistencia con el stack y patrones frontend definidos.
- No introducir cambios de backend desde este proyecto.

## Antes de codificar

- Leer `CLAUDE.md` para convenciones del proyecto y reglas de precedencia.
- Leer la spec del feature en `working/[feature]/spec.md` — debe tener `Status: validated`.
- Leer la lista de tareas en `working/[feature]/tasks.md` — encontrar la siguiente tarea sin marcar.
- Leer los archivos relevantes de `ia_docs/` para contexto (stack, estandares, checklists).
- Validar impacto en rutas, estado y flujo UX antes de hacer cambios.

## Durante la ejecucion

- Trabajar en una tarea a la vez desde `tasks.md`.
- Marcar cada tarea `[x]` al completarla antes de iniciar la siguiente.
- Si hay bloqueo, agregar `blocked: [motivo]` y detenerse — no saltar.
- Si la spec tiene informacion faltante, detenerse, actualizar la spec, re-ejecutar el validador, luego continuar.
- Reportar el plan y los pasos ejecutados.

## Despues de la ejecucion

- Ejecutar `npm run lint`, `npm run typecheck`, `npm run build`.
- Verificar estados de UI: loading, empty, error, success.
- Actualizar documentacion si se tomaron decisiones.
- `git status` — no hacer auto-commit.

## Limites

- No introducir tecnologia nueva sin registrar un ADR (`ia_docs/frontend/03-adr.md`).
- No hacer cambios destructivos sin aprobacion explicita.
- No asumir cambios en contratos del backend sin evidencia documentada.
- No empezar a implementar sin una spec validada y una lista de tareas generada.

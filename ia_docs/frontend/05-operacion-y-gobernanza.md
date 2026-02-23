# Operación y gobernanza

## Roles

- **Product owner:** Define el alcance de UX en `docs/`.
- **Frontend technical lead:** Aprueba ADRs, integra cambios.
- **Operaciones:** Deploy, monitoreo (Vercel/Sentry).

## Proceso de cambio

### Obligatorio (cada feature)
1. Crear spec del feature en `working/[feature]/spec.md`.
2. Ejecutar agente validador — completar spec hasta `Status: validated`.
3. Agente genera `working/[feature]/tasks.md`.
4. Implementar con Claude Code / Codex — una tarea por vez, marcando `[x]`.
5. Aceptación — comparar resultado vs spec sección por sección.
6. Validación técnica (lint / typecheck / build).
7. Revisión de PR + merge + actualización de documentación.

### Opcional (features mayores que requieren alineación de negocio)
- Definir alcance en `docs/` (contexto de negocio).
- Traducir reglas técnicas a `ia_docs/`.

## Definición de Completado

- [ ] Spec `Status: validated` antes de empezar a codificar.
- [ ] Todas las tareas en `tasks.md` marcadas `[x]`.
- [ ] Lista de verificación de aceptación pasada (resultado coincide con spec sección por sección).
- [ ] Spec `Status: implemented`.
- [ ] `npm run lint` pasado.
- [ ] `npm run typecheck` pasado.
- [ ] `npm run build` pasado.
- [ ] Cobertura de tests >80%.
- [ ] Servidor dev ejecuta sin errores.
- [ ] Documentación sincronizada (`ia_docs/`, `docs/`).
- [ ] Demo en deploy preview.

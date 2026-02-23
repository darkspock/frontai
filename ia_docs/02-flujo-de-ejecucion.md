# Flujo de ejecución

## Descripción general

```
spec.md  →  validate  →  tasks.md  →  execute (one by one)  →  accept  →  close
```

---

## Opcional — Alineación de negocio

Estos pasos solo son necesarios para features mayores que requieren alineación de producto o cuando se inicia un nuevo dominio. Para features donde el contexto ya es claro, saltar directamente al Paso 1.

- Definir el alcance funcional y los flujos principales de usuario en `docs/`.
- Documentar decisiones de producto y UX en `docs/`.
- Traducir convenciones técnicas a `ia_docs/`.

---

## Paso 1 — Crear especificación

- Copiar `working/_template/spec.md` a `working/[feature]/spec.md`.
- Completar todo lo que ya se conoce.
- Dejar espacios en blanco para lo que necesita ser discutido.

---

## Paso 2 — Validar especificación

- Ejecutar el agente validador: `ia_docs/06-agente-validador.md`.
- Responder cada pregunta una por una hasta que el agente confirme que la spec está completa.
- No empezar a implementar antes de que el agente muestre: `"Especificación completa. Lista para implementación."`
- El agente establece automáticamente `Status: validated` en `spec.md`.

---

## Paso 3 — Generar lista de tareas

- Después de la validación, el agente crea `working/[feature]/tasks.md` con una lista de tareas ordenada con checkboxes.
- Cada tarea es atómica: una acción clara, un criterio de aceptación.
- No modificar la lista de tareas a menos que la spec cambie.

---

## Paso 4 — Ejecutar tareas una por una

- Leer `tasks.md` y comenzar con la primera tarea sin marcar.
- Antes de empezar una tarea: leer la spec y los archivos relevantes en `ia_docs/`.
- Implementar solo lo que esa tarea requiere. No saltar adelante.
- Después de completar una tarea: marcarla como hecha en `tasks.md` con `[x]`.
- Luego pasar a la siguiente tarea.

Reglas:
- Nunca empezar una tarea nueva sin marcar la anterior como completada.
- Si una tarea está bloqueada, añadir una nota `⚠ blocked: [reason]` y detener — no saltarla silenciosamente.
- Si una tarea revela información faltante en la spec, detener, actualizar la spec, re-ejecutar el validador, luego continuar.

---

## Paso 5 — Aceptación

Comparar el resultado implementado contra la spec, sección por sección:

- [ ] Objetivo: ¿El feature cumple su propósito establecido?
- [ ] Flujos de usuario: recorrer flujo principal y flujos de error — ¿funcionan como se especifica?
- [ ] Pantallas y estados: verificar que cada pantalla maneja loading, empty, error, y success.
- [ ] Diseño de UI: ¿El diseño coincide con la descripción en la spec?
- [ ] Integración de API: ¿Se consumen correctamente todos los endpoints?
- [ ] Reglas de validación: probar cada campo de formulario contra las reglas en la spec.
- [ ] Casos de error: disparar cada caso de error desde la spec y verificar la respuesta de UI.
- [ ] Navegación: verificar rutas, redirecciones y guards de autenticación.

Si alguna verificación falla, crear una tarea de seguimiento o re-abrir la tarea relevante en `tasks.md`.

---

## Paso 6 — Validación técnica

- `npm run lint` — corregir todos los errores.
- `npm run typecheck` — sin errores de TypeScript.
- `npm run build` — compilación limpia.
- Verificar estados de UI para la pantalla implementada: loading / empty / error / success.
- Sin regresiones en navegación o flujos existentes.

---

## Paso 7 — Cerrar

- Todas las tareas marcadas `[x]` en `tasks.md`.
- Lista de verificación de aceptación pasada (Paso 5).
- Establecer `Status: implemented` en `spec.md`.
- `git status` — revisar cambios, no hacer auto-commit.
- Si se tomaron decisiones arquitectónicas: registrar en `ia_docs/frontend/03-adr.md`.
- Si hay trabajo pendiente: añadir a `ia_docs/frontend/05-operacion-y-gobernanza.md`.

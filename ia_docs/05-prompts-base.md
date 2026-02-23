# Prompts base

## Prompt: Implementar tarea

```text
Leer CLAUDE.md para convenciones del proyecto.
Leer la spec del feature en working/[feature]/spec.md.
Leer la lista de tareas en working/[feature]/tasks.md.
Encontrar la siguiente tarea sin marcar e implementar solo esa tarea.
Seguir ia_docs/03-estandares-de-codigo.md para calidad de código.
Después de completar la tarea, marcarla [x] en tasks.md.
Ejecutar npm run lint, npm run typecheck, npm run build.
Si está bloqueada, explicar qué falta y detener.
```

## Prompt: Revisar calidad

```text
Hacer una revisión de código frontend enfocada en bugs, regresiones de flujo/navegación, y tests faltantes.
Priorizar hallazgos por severidad e indicar archivo y línea.
No enfocarse en estilo a menos que afecte mantenibilidad o cause fallos.
Verificar que todos los estados de UI estén manejados: loading, empty, error, success.
```

## Prompt: Refactor seguro

```text
Refactorizar sin cambiar el comportamiento externo.
Primero describir rutas, flujos, y contratos de UI que deben ser preservados.
Luego aplicar cambios pequeños y validar con lint/typecheck/build.
Resumir riesgos residuales.
```

## Prompt: Validar spec

```text
Ejecutar el agente validador definido en ia_docs/06-agente-validador.md.
Leer working/[feature]/spec.md.
Verificar las 11 secciones requeridas en orden.
Para cada sección faltante o incompleta, hacer UNA pregunta por vez.
Una vez que todas las secciones pasen, confirmar y generar tasks.md.
```

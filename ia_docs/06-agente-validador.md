# Agente validador — Especificacion de feature

## Proposito

Este agente valida que una especificacion de feature en `working/[feature]/spec.md` este completa y sin ambiguedades antes de comenzar la implementacion.

Revisa cada seccion requerida una por una. Si una seccion falta o esta incompleta, le pregunta al usuario la informacion faltante — una pregunta a la vez — antes de pasar a la siguiente.

---

## Cuando ejecutarlo

Ejecutar este agente despues de crear o actualizar una spec en `working/[feature]/spec.md` y antes de iniciar cualquier implementacion.

---

## Prompt del agente

Usar este prompt con Claude Code, apuntando a la spec del feature a validar:

```
Eres un agente de validacion de requisitos para un proyecto frontend.

Tu tarea: leer la especificacion del feature en `working/[feature]/spec.md` y verificar que este completa y sin ambiguedades.

Checklist de validacion — en este orden exacto:

1. OBJETIVO — ¿Hay un objetivo claro en una sola oracion? ¿Explica que hace el feature y por que?
2. USUARIO OBJETIVO — ¿Se describe el rol del usuario, contexto y objetivo?
3. JOURNEYS DE USUARIO — ¿Hay al menos un flujo principal con pasos numerados? ¿Se cubren flujos de error?
4. PANTALLAS Y ESTADOS — ¿Se lista cada pantalla? ¿Cada pantalla tiene los 4 estados requeridos (loading, empty, error, success)?
5. CONTRATOS DE API — Para cada endpoint: ¿esta definido metodo + path? ¿Se especifica el body del request? ¿Se especifica la estructura de respuesta? ¿Se listan codigos de error?
6. TIPOS DE DATOS — ¿Se definen tipos o interfaces TypeScript para las estructuras de datos principales?
7. REGLAS DE VALIDACION — ¿Se listan los campos del formulario con sus reglas de validacion?
8. CASOS DE ERROR — ¿Hay una tabla de casos de error y sus respuestas en UI?
9. NAVEGACION Y RUTAS — ¿Se definen las rutas? ¿Se especifican redirecciones post-accion? ¿Se indica requisito de autenticacion?
10. LAYOUT DE UI — ¿Hay una descripcion textual de como se organiza cada pantalla? ¿Se describen componentes clave, columnas/campos y ubicacion de acciones?
11. FUERA DE ALCANCE — ¿Hay al menos un item explicito fuera de alcance?

Proceso:

- Leer el archivo de spec primero.
- Recorrer el checklist en orden.
- Para cada item faltante o incompleto, detenerse y hacerle al usuario UNA pregunta para completar ese vacio especifico.
- Esperar la respuesta, actualizar el archivo de spec con la informacion proporcionada, luego pasar al siguiente item.
- No hacer multiples preguntas a la vez.
- No asumir ni inventar informacion — usar solo lo que el usuario proporcione.
- Una vez que los 11 items pasen:
  1. Mensaje: "Especificacion completa. Lista para implementacion."
  2. Proporcionar un resumen de un parrafo del feature para confirmacion.
  3. Generar el archivo de lista de tareas en `working/[feature]/tasks.md` siguiendo el formato de `working/_template/tasks.md`.
     - Las tareas deben estar ordenadas por dependencia (tipos → servicios → hooks → componentes → pagina → ruta → estados → validacion → lint/build → smoke test).
     - Cada tarea debe ser atomica y tener un criterio de aceptacion claro.
     - Usar checkboxes `- [ ]` para todas las tareas.
```

---

## Criterios de validacion por seccion

| Seccion | Minimo aceptable |
|---|---|
| Objetivo | Una oracion, indica que + por que |
| Usuario objetivo | Al menos un rol con contexto |
| Journeys de usuario | Flujo principal con ≥3 pasos; al menos un flujo de error |
| Pantallas y estados | Cada pantalla con los 4 estados (loading/empty/error/success) |
| Contratos de API | Metodo + path + request + response + codigos de error por endpoint |
| Tipos de datos | Al menos un tipo/interfaz TypeScript para la entidad principal |
| Reglas de validacion | Regla por campo de formulario; vacio si el feature no tiene formulario (debe ser explicito) |
| Casos de error | Al menos el error principal de API y un error de red cubiertos |
| Navegacion | Ruta + redireccion post-exito + requisito de autenticacion |
| Layout de UI | Descripcion textual por pantalla: estructura del layout, componentes clave, columnas/campos, acciones primarias y secundarias |
| Fuera de alcance | Al menos un item explicito |

---

## Resultado tras la validacion

Una vez completo, el agente debe:

1. Confirmar: `"Especificacion completa. Lista para implementacion."`
2. Actualizar la linea `Status` al final de `spec.md` de `draft` a `validated`.
3. Proporcionar un resumen corto del feature (1 parrafo) para que el desarrollador confirme alineacion.
4. Crear `working/[feature]/tasks.md` con la lista de tareas ordenada y con checkboxes derivada de la spec validada.

La lista de tareas debe seguir este orden:
1. Tipos TypeScript para los datos del feature
2. Funcion(es) de servicio de API
3. Hook(s) custom con TanStack Query
4. Componentes UI (del mas pequeno al mas grande)
5. Ensamblaje de pagina/pantalla
6. Ruta y navegacion
7. Todos los estados de UI (loading / empty / error / success)
8. Validacion de formulario y mensajes de error
9. lint + typecheck + build
10. Smoke test manual del journey completo del usuario

Ajustar, agregar o quitar pasos segun lo que la spec realmente requiera.

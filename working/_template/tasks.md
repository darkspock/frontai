# Tareas: [Nombre del feature]

> Generado desde `spec.md` despues de la validacion. Ejecutar en orden, una tarea a la vez.

**Status:** in-progress / completed

---

## Tareas

- [ ] 1. [Descripcion de la tarea — que hacer y donde]
- [ ] 2. [Descripcion de la tarea]
- [ ] 3. [Descripcion de la tarea]

---

## Referencia de formato de tarea

Cada tarea debe ser:
- **Atomica** — una accion clara (crear un componente, agregar una ruta, llamar un endpoint, etc.)
- **Ordenada** — dependencias respetadas (tipos antes que hooks, hooks antes que componentes, componentes antes que paginas)
- **Verificable** — es obvio cuando esta completada

Orden sugerido para un feature tipico:
1. Definir tipos TypeScript para los datos del feature
2. Crear la(s) funcion(es) de servicio de API
3. Crear el/los hook(s) custom con TanStack Query
4. Construir los componentes UI (del mas pequeno al mas grande)
5. Ensamblar la pagina/pantalla
6. Agregar la ruta y navegacion
7. Manejar todos los estados de UI (loading / empty / error / success)
8. Validar formularios y mensajes de error
9. Ejecutar lint + typecheck + build
10. Smoke test manual del journey completo del usuario

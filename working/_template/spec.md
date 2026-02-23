# Feature: [Nombre del feature]

## 1. Objetivo
<!-- Una oracion: que hace este feature y por que. -->


## 2. Usuario objetivo
<!-- Quien usa este feature. Rol, contexto, objetivo. -->


## 3. Journeys de usuario
<!-- Flujos paso a paso desde la perspectiva del usuario. Un flujo por lista. -->

**Flujo principal:**
1.
2.
3.

**Flujos alternativos:**
-

**Flujos de error:**
-

## 4. Pantallas y estados
<!-- Lista cada pantalla involucrada. Para cada una, listar sus estados requeridos. -->

| Pantalla | Estados requeridos |
|----------|-------------------|
|          | loading / empty / error / success |

## 5. Contratos de API
<!-- Para cada endpoint: metodo, path, body del request, estructura de respuesta, codigos de error. -->

### [Nombre del endpoint]
- **Metodo + path:** `POST /api/v1/...`
- **Request:**
  ```json
  {}
  ```
- **Response:**
  ```json
  {}
  ```
- **Errores:** `400`, `401`, `422`, ...

## 6. Tipos de datos
<!-- Tipos o interfaces TypeScript para los datos con los que trabaja este feature. -->

```typescript

```

## 7. Reglas de validacion
<!-- Campos de formulario y reglas de negocio. Formato: campo — regla. -->

- `campo`: requerido, longitud minima X, ...

## 8. Casos de error
<!-- Que puede salir mal y como debe manejar la UI cada caso. -->

| Error | Respuesta en UI |
|-------|-----------------|
|       |                 |

## 9. Navegacion y rutas
<!-- Rutas involucradas, redirecciones, rutas protegidas. -->

- Ruta: `/...`
- Despues de exito: redirigir a `...`
- Autenticacion requerida: si / no

## 10. Layout de UI
<!-- Descripcion textual de como se organiza cada pantalla. Describir estructura del layout, componentes clave, columnas, ubicacion de acciones. Referenciar patrones de ia_docs/frontend/08-layout-shell.md y ia_docs/frontend/09-state-patterns.md. -->

### [Nombre de pantalla]
- **Layout:** (ej. encabezado de pagina + barra de filtros + tabla de datos)
- **Componentes clave:** (ej. DataTable, Button, Dialog)
- **Columnas / campos:** (ej. Nombre, Email, Rol, Acciones)
- **Accion primaria:** (ej. boton "Agregar usuario" arriba a la derecha)
- **Acciones secundarias:** (ej. editar/eliminar por fila)

## 11. Fuera de alcance
<!-- Listar explicitamente lo que esta spec NO cubre. -->

-

---

**Status:** draft / validated / implemented

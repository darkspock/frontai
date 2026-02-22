# Arquitectura funcional de frontend

## Modulos y dominios de UI
- Dashboard:
  - Responsabilidad: Overview métricas, quick actions.
  - Pantallas: /dashboard (cards KPIs).
  - Datos: /api/metrics, /api/summary.
- Usuarios:
  - Responsabilidad: CRUD + list.
  - Pantallas: /users, /users/new, /users/:id.
  - Datos: /api/users{?page,search,filter}.

## Navegacion y rutas
- Estructura: / (dashboard), /users, /users/new, /users/:id/edit.
- Layouts: RootLayout (nav+outlet), DashboardLayout (breadcrumb).
- Guardas: Auth loader (redirect /login si no token).

## Reglas obligatorias de navegacion y orientacion
- Breadcrumb siempre visible en pantallas internas (todas excepto home/dashboard raiz).
- El breadcrumb debe mostrar la ruta jerarquica completa y marcar claramente la vista actual.
- Debe existir una accion de retorno visible (breadcrumb o boton volver) sin depender solo del boton del navegador.
- El titulo de pagina y el ultimo item del breadcrumb deben coincidir semantica y textual.
- La ubicacion del breadcrumb y del titulo debe ser consistente en toda la aplicacion.
- Las URLs deben reflejar el estado navegable (ruta, parametros y filtros relevantes).
- Al volver a listados, se debe preservar el contexto del usuario (filtros, busqueda, paginacion) cuando aplique.

## Reglas de composicion de pantalla
- Cada pantalla debe tener un encabezado con: breadcrumb, titulo y accion primaria (si aplica).
- Solo una accion primaria visible por pantalla.
- Estados de pantalla obligatorios: loading, empty, error y success.
- Los errores deben ser accionables: mensaje claro + siguiente accion recomendada.

## Flujos clave
- CRUD Usuario:
  - Listar /users (query params persist).
  - Create /users/new -> POST /api/users -> redirect list.
  - Edit /users/:id -> PUT -> success toast.
  - Delete confirm dialog -> optimistic delete.

## Limites del sistema
- Backend: REST /api/v1/users{?page=1&limit=10&search=q}.
- Restricciones: No graphql, paginación offset, no websockets.
- Reglas: TanStack Query infiniteQuery lists, mutations optimistic.

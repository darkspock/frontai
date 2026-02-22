# Alcance y requisitos

## Alcance MVP
- Pantallas: Dashboard (listado principal), CRUD Usuarios, Configuración básica.
- Flujos: Navegación breadcrumb, list/create/edit/view/delete, search/filter/paginate.
- Fuera: Autenticación compleja (asume JWT externo), reports avanzados, mobile app.

## Usuarios y roles
- Admin:
  - Necesidad: Gestionar usuarios y config.
  - Acción: CRUD usuarios, ver dashboard métricas.
- Usuario:
  - Necesidad: Ver/operar datos diarios.
  - Acción: Listar/filtrar datos, editar own records.

## Requisitos funcionales
- RF-001: Dashboard listado
  - Descripción: Tabla paginada usuarios con search/filter, estados empty/loading/error.
  - Criterio: Responsive, persist state URL, TanStack Query cache.
- RF-002: CRUD Usuario
  - Descripción: Form create/edit con Zod validation, dialog overlay.
  - Criterio: Optimistic updates, error handling, success feedback.

## Requisitos no funcionales de frontend
- RNF-001 (rendimiento UX): Bundle <1MB gz, LCP<2s, lazy routes.
- RNF-002 (accesibilidad): WCAG AA, keyboard nav, ARIA labels.
- RNF-003 (observabilidad frontend): Console.error logs, Sentry si aplica.
- RNF-004 (resiliencia ante errores de API): Retry 3x, offline fallback, user-friendly msgs.

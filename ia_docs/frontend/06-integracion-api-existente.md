# Integracion con API existente

## Objetivo

Definir reglas para consumir una API backend ya implementada sin redisenar sus contratos.

## Convenciones de integracion

- Fuente oficial: Swagger backend o Postman collection.
- Cliente HTTP: TanStack Query (fetcher en src/services/api.ts).
- Autenticación: Bearer JWT from localStorage.getItem('token').
- Errores: Global query error handler, toast msgs.
- Reintentos/timeouts: Query default retry:3, staleTime:5min.

## Sincronizacion con backend

- Update este doc + zod schemas en types/api.ts.
- Version API: /v1/, backward compatible.
- No control backend.

## Checklist por endpoint

- ✅ Ruta/metodo zod typed.
- ✅ Mutations optimistic + rollback on error.
- ✅ InfiniteQuery para lists grandes.
- ✅ Error boundaries + retry UX.

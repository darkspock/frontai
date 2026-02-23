# Integración de API

## Origen de la API

- **Plataforma:** Desk Support Monkey — IT Service Desk & Asset Inventory
- **URL base (staging):** `https://staging.desksupportmonkey.com`
- **Prefijo de API:** `/api/v1/`
- **Spec OpenAPI:** `https://staging.desksupportmonkey.com/openapi.json`
- **Swagger UI:** `https://staging.desksupportmonkey.com/docs`

---

## Autenticación

- **Método:** Bearer JWT (HTTPBearer).
- **Fuente del token:** `localStorage.getItem('token')`.
- **Flujos de login:**
  - Magic link: `POST /api/v1/auth/magic-link` → email link → `POST /api/v1/auth/verify` → token.
  - Contraseña (solo admin): `POST /api/v1/auth/login` → token.
- **Usuario actual:** `GET /api/v1/auth/me`.
- **Endpoints públicos (sin auth):** `/health`, `/api/v1/auth/magic-link`, `/api/v1/auth/verify`, `/api/v1/auth/login`, `/api/v1/register`.
- **Todos los demás endpoints requieren token Bearer.**

---

## Reglas de integración

- **Cliente HTTP:** TanStack Query con fetcher en `src/services/api.ts`.
- **Manejo de errores:** Manejador de error de query global + mensajes toast. Siempre extraer mensajes de error de API (nunca mostrar errores genéricos cuando la API retornó un mensaje específico).
- **Reintentos:** Query default `retry: 3`, `staleTime: 5min`.
- **Paginación:** Todos los endpoints de lista usan parámetros query `page` (1-based) + `page_size`.
- **Tipado de respuestas:** Las respuestas de API no están tipadas en la spec OpenAPI (`{}` schema). Definir esquemas Zod basados en respuestas reales de API y validar en el límite.
- **Errores de validación:** `422` retorna `{ detail: [{ loc, msg, type }] }` (estándar FastAPI).
- **Mutaciones:** Actualizaciones optimistas + rollback en error cuando sea apropiado.
- **Listas grandes:** Usar `useInfiniteQuery` de TanStack Query cuando sea necesario.

---

## Sincronización con backend

- Actualizar este doc + esquemas Zod en `src/types/` cuando la API cambie.
- Versión de API: `/v1/`, compatible hacia atrás.
- Sin control de backend desde este proyecto.

---

## Checklist por endpoint

- [ ] Ruta + método tipado con Zod (request y response).
- [ ] Mutaciones optimistas + rollback en error.
- [ ] InfiniteQuery para listas grandes.
- [ ] Error boundaries + retry UX.
- [ ] Estados loading / empty / error / success manejados.

---

## Descripción general de dominios de API

| Dominio | Endpoints | Descripción |
|---|---|---|
| Auth | 5 | Magic link, login por contraseña, verify, set password, usuario actual |
| API Keys | 3 | List, create, revoke |
| Registration | 1 | Registro de empresa self-service |
| Companies | 5 | CRUD + cambio de estado |
| Departments | 7 | CRUD + asignación de manager |
| Users | 11 | List, invite, import, quick-create, get, update, role, activate/deactivate, department |
| Assets | 10 | CRUD, import, status, history, assign/unassign |
| Requests | 13 | CRUD, status, priority, assign, approve/reject, comments, notes, events |
| My (profile) | 11 | Profile, equipment, requests, notifications, company settings, appointments, shipments, maintenance |
| Dashboard | 11 | Request summary/trend/resolution, asset summary, alerts (warranty/aging/SLA), budget, POs, shipments, maintenance |
| Reports | 4 | Create, list, get, download |
| Employee Roles | 5 | CRUD |
| Equipment Profiles | 8 | CRUD, activate/deactivate, my-budget |
| Settings | 6 | AI assignment, request classification, procurement |
| Vendors | 6 | CRUD, activate/deactivate |
| Purchase Orders | 13 | CRUD, submit, approve, reject, mark-ordered, receive, close, cancel, PDF |
| Appointments | 7 | CRUD, confirm, cancel, complete, reschedule |
| Shipments | 12 | CRUD, dispatch, in-transit, deliver, fail, cancel, return, modify items |
| Addresses | 6 | CRUD, by-user |
| Availability | 6 | Set/get availability, overrides, slots |
| Budgets | 3 | Set/get department budget, summary |
| Maintenance | 9 | CRUD, assign, start, complete, cancel, skip |
| Maintenance Templates | 6 | CRUD, apply |
| Maintenance Plans | 3 | List, get, delete |

**Total: ~170 endpoints**

Para el catálogo completo de endpoints con esquemas de request, ver `12-api-catalog.md`.

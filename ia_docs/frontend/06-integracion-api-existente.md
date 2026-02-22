# API integration

## API origin

- **Platform:** Desk Support Monkey — IT Service Desk & Asset Inventory
- **Base URL (staging):** `https://staging.desksupportmonkey.com`
- **API prefix:** `/api/v1/`
- **OpenAPI spec:** `https://staging.desksupportmonkey.com/openapi.json`
- **Swagger UI:** `https://staging.desksupportmonkey.com/docs`

---

## Authentication

- **Method:** Bearer JWT (HTTPBearer).
- **Token source:** `localStorage.getItem('token')`.
- **Login flows:**
  - Magic link: `POST /api/v1/auth/magic-link` → email link → `POST /api/v1/auth/verify` → token.
  - Password (admin only): `POST /api/v1/auth/login` → token.
- **Current user:** `GET /api/v1/auth/me`.
- **Public endpoints (no auth):** `/health`, `/api/v1/auth/magic-link`, `/api/v1/auth/verify`, `/api/v1/auth/login`, `/api/v1/register`.
- **All other endpoints require Bearer token.**

---

## Integration rules

- **HTTP client:** TanStack Query with fetcher in `src/services/api.ts`.
- **Error handling:** Global query error handler + toast messages. Always extract API error messages (never show generic errors when the API returned a specific message).
- **Retries:** Query default `retry: 3`, `staleTime: 5min`.
- **Pagination:** All list endpoints use `page` (1-based) + `page_size` query params.
- **Response typing:** API responses are untyped in the OpenAPI spec (`{}` schema). Define Zod schemas based on actual API responses and validate at the boundary.
- **Validation errors:** `422` returns `{ detail: [{ loc, msg, type }] }` (FastAPI standard).
- **Mutations:** Optimistic updates + rollback on error where appropriate.
- **Large lists:** Use TanStack Query `useInfiniteQuery` when needed.

---

## Sync with backend

- Update this doc + Zod schemas in `src/types/` when API changes.
- API version: `/v1/`, backward compatible.
- No backend control from this project.

---

## Checklist per endpoint

- [ ] Route + method Zod typed (request and response).
- [ ] Mutations optimistic + rollback on error.
- [ ] InfiniteQuery for large lists.
- [ ] Error boundaries + retry UX.
- [ ] Loading / empty / error / success states handled.

---

## API domains overview

| Domain | Endpoints | Description |
|---|---|---|
| Auth | 5 | Magic link, password login, verify, set password, current user |
| API Keys | 3 | List, create, revoke |
| Registration | 1 | Self-service company registration |
| Companies | 5 | CRUD + status change |
| Departments | 7 | CRUD + manager assignment |
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

For the full endpoint catalog with request schemas, see `12-api-catalog.md`.

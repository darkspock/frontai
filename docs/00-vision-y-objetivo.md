# Vision and objective

## Problem

IT departments in mid-size companies manage equipment (laptops, monitors, peripherals) and service requests (incidents, new equipment, onboarding) manually — via spreadsheets, email threads, and tribal knowledge. This leads to:

- Lost or untracked assets with no audit trail.
- Slow request resolution with no visibility for employees.
- No data for decision-making (aging hardware, warranty expirations, budget overruns).
- Compliance gaps (who has what, who did what, when).

## Product

**Desk Support Monkey** — an IT Service Desk & Asset Inventory platform.

Employees submit service requests and track their status in real time. IT technicians manage a prioritized request queue and maintain a full inventory of company equipment. Admins get dashboards, alerts, reports, and budget control. The platform also handles procurement, appointment scheduling, shipping logistics, and scheduled maintenance.

## Value proposition

- **For employees:** Self-service portal — submit requests, track status in real time, see assigned equipment.
- **For technicians:** Prioritized queue, inventory management, appointment scheduling, maintenance tracking.
- **For admins:** Dashboards with KPIs, budget enforcement, procurement workflow, alert system (warranties, SLA, aging).
- **For the platform:** Multi-tenant (each company isolated), role-based access (super admin, admin, technician, employee), AI-assisted request classification.

## Frontend objective

Build a React SPA that consumes the existing backend API (~170 endpoints) and provides the complete user experience for all four roles. The backend is fully implemented — the frontend is the remaining piece.

## Tech stack (backend — already built)

| Layer | Technology |
|---|---|
| API | Python 3.13 + FastAPI |
| Database | PostgreSQL 15 |
| Queue | Celery + Redis |
| Storage | MinIO (S3-compatible) |
| Real-time | WebSockets (FastAPI native) |
| Auth | Magic link + JWT + Google/Microsoft OAuth |

## Architecture highlights (backend)

- **DDD + Clean Architecture + CQRS** with bounded contexts per module.
- **Multi-tenancy:** All data scoped by `company_id`, isolation at repository level.
- **Event sourcing:** Asset history as append-only event log.
- **State machines:** Requests, purchase orders, shipments, maintenance — all with validated transitions.
- **Pub/sub:** Domain events trigger notifications, audit log, dashboard updates.
- **RBAC:** super_admin > admin > technician > employee, enforced at HTTP layer.

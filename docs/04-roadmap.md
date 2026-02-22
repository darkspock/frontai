# Roadmap

## Backend status

All backend epics through E17 are **done**. The API is fully functional with ~170 endpoints. The frontend needs to be built to consume this API.

## Epic overview

| # | Epic | Description | Backend | Frontend |
|---|---|---|---|---|
| E0 | Foundation | Auth, multi-tenancy, base infrastructure | Done | Pending |
| E1 | Company Management | Companies, departments, user management | Done | Pending |
| E2 | Asset Inventory | Asset CRUD, assignment, history, CSV import | Done | Pending |
| E3 | Service Requests | Request lifecycle, queue, comments, notes | Done | Pending |
| E4 | Real-time & Notifications | WebSocket events, in-app notifications | Done | Pending |
| E5 | Admin Dashboard | Metrics, charts, alerts | Done | Pending |
| E6 | Report Generation | Async PDF reports via Celery | Done | Pending |
| E7 | Frontend | React SPA for all modules | — | Pending |
| E9 | UX Improvements | Invite users, design system, accessibility | Done | Pending |
| E10 | Asset QR & Barcodes | QR/barcode on asset detail, print labels | Done | Pending |
| E11 | Equipment Profiles | Department-role equipment profiles, budgets | Done | Pending |
| E12 | Request Typification | Categories, sub-types, priority scoring, approval | Done | Pending |
| E13 | AI Classification | Auto-classify requests by AI | Done | Pending |
| E14 | Procurement & Budget | Vendors, POs, budget enforcement | Done | Pending |
| E15 | Appointment Scheduling | Technician availability, booking, calendar | Done | Pending |
| E16 | Shipping & Logistics | Shipment tracking, addresses, returns | Done | Pending |
| E17 | Scheduled Maintenance | Templates, plans, recurring maintenance | Done | Pending |
| E24 | Google & Microsoft Login | OAuth2 login, account linking | Done | Pending |
| E35 | MCP Server | AI tool integration | Done | — |

## Suggested frontend implementation order

### Phase 1 — Foundation & Auth
- Project setup (routing, layout shell, API client, auth context).
- Magic link login flow + JWT storage.
- Google/Microsoft OAuth login buttons.
- App shell: sidebar, header, responsive navigation.
- Role-based routing (employee, technician, admin, super admin).

### Phase 2 — Core modules (employee + technician)
- Employee portal: my equipment, submit request, my requests, my notifications.
- Technician panel: request queue, request detail (status/priority/assign), inventory CRUD.
- Asset pages: list, detail, create, edit, assign, history, CSV import.
- User pages: list, invite, detail, role change, department assignment.

### Phase 3 — Admin & dashboards
- Admin dashboard: request metrics, asset metrics, alerts, budget health.
- Company management (super admin): list, create, detail, status.
- Department management: CRUD, manager assignment, budget.
- Reports: request, list, download.

### Phase 4 — Advanced modules
- Equipment profiles: department-role profiles, budget per item.
- Procurement: vendors, purchase orders (full lifecycle), goods receipt.
- Appointments: scheduling, availability, calendar view.
- Shipping: shipment tracking, address management, returns.
- Maintenance: records, templates, plans.

### Phase 5 — Polish
- Settings pages: AI config, classification config, procurement config.
- API keys management.
- QR/barcode on asset detail.
- Real-time WebSocket integration across all relevant views.
- Accessibility audit and fixes.
- Responsive polish for tablet and mobile.

## Future backend epics (not yet implemented)

| # | Epic | Priority | Notes |
|---|---|---|---|
| E18 | Knowledge Base & Self-Service | High | Wiki, FAQ, AI article suggestions |
| E19 | SLA Management | High | Configurable policies, escalation |
| E22 | Employee Onboarding/Offboarding | High | Automated workflows |
| E29 | Audit Trail & Compliance | High | GDPR, NIS2/DORA evidence |
| E30 | Custom Fields | High | Admin-defined fields per entity |
| E31 | Workflow Automations | High | Rule engine for if-then actions |
| E36 | Security Incident Management | High | NIS2 incident lifecycle |
| E39 | Compliance Dashboard | High | NIS2/DORA/ISO 27001 controls |
| E43 | Billing & Subscriptions | Critical | Stripe integration, plans |
| E42 | SSO & Directory Sync | High | SAML/OIDC, LDAP |

These will require additional frontend work when implemented.

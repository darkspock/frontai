# Scope and requirements

## Roles

| Role | Scope | Description |
|---|---|---|
| **Super Admin** | Platform | Creates and manages companies. Platform-level access |
| **Admin** | Company | Manages users, departments, configuration, budgets, procurement |
| **Technician** | Company | Processes requests, manages inventory, handles appointments and maintenance |
| **Employee** | Company | Submits requests, views equipment and request status |

## Authentication

- **Magic link:** User enters email → system sends login link → link valid 24h, single-use.
- **Password login:** Admin only (optional).
- **Google/Microsoft OAuth:** Login buttons, auto-creation by domain match.
- **Auto-creation:** First login with matching company domain creates user as `employee`.
- **JWT:** Bearer token in `Authorization` header.

## Modules (implemented in backend)

### Module 0: Company Management (Super Admin)
- Company CRUD: name, email domains, contact person.
- Company statuses: `active`, `suspended`, `deactivated`.
- Each company has isolated data.
- Assign initial admin per company.

### Module 1: Asset Inventory
- Register assets: type (laptop, monitor, keyboard, mouse, headset, docking station, other), brand, model, serial number, purchase date, warranty.
- Asset statuses: `in_stock`, `assigned`, `in_repair`, `decommissioned`.
- Assignment to employees and departments.
- Full audit trail (event sourcing).
- Search by serial, model, type, status, employee. Filter by department.
- CSV bulk import.
- QR codes and barcodes for physical labels.

### Module 2: Employee Portal
- **My Equipment:** All assets assigned to the current user.
- **Submit Request:** Types — incident ("something is broken"), new equipment ("I need a monitor"), onboarding ("new hire starting").
- **My Requests:** List with real-time status updates via WebSocket.
- **My Notifications:** In-app notification center.
- **My Appointments:** Scheduled support visits.
- **My Shipments:** Equipment being shipped to/from the employee.
- **My Maintenance:** Maintenance records for assigned equipment.

### Module 3: Service Desk (Technician)
- Prioritized request queue.
- Request types with sub-types: repair, new equipment (computer, mobile, peripheral, accessory), configuration, access, other.
- Request state machine: `submitted` → `in_review` → `in_progress` → `resolved` / `rejected`.
- Priority scoring based on type, department, and role.
- Approval workflow for new equipment requests.
- AI-powered automatic classification (infers category, sub-type, priority from description).
- Comments (visible to employee) and internal notes (technician only).
- Self-assignment from queue.

### Module 4: Admin Dashboard
- **Request metrics:** Open count by type/priority, average resolution time, trend over time.
- **Asset metrics:** Assets by status (chart data).
- **Alerts:** Warranty expiring (30/60/90 days), aging assets (configurable years), SLA breaches.
- **Budget health:** Department spending vs allocation.
- **User management:** List, promote/demote roles, deactivate, assign departments.

### Module 5: Reports
- Async PDF generation (Celery + MinIO).
- Report types: asset inventory, request summary, technician performance.
- Download via signed S3 URL.

### Module 6: Department Equipment Profiles
- Department managers.
- Role-based equipment profiles (e.g., "Tech Lead → Linux 32GB", "Design → MacBook Pro").
- Budget per item in profile.
- Automatic asset assignment suggestions by department and role.

### Module 7: Procurement & Budget
- **Vendors:** CRUD, activate/deactivate.
- **Purchase orders:** Full lifecycle — create → submit → approve/reject → mark ordered → receive → close/cancel.
- **Budget enforcement:** Department budgets per fiscal year, spending tracking.
- **Goods receipt:** Receive items against PO, optionally create assets.
- **PO PDF generation.**

### Module 8: Appointment Scheduling
- Schedule support appointments between technicians and employees.
- Technician availability windows (weekly schedule + date overrides).
- Available time slot calculation.
- Appointment states: scheduled → confirmed → completed/cancelled.
- Reschedule with reason.

### Module 9: Shipping & Logistics
- Ship equipment to employee home, other offices, or vendor for repair.
- Shipment lifecycle: created → dispatched → in_transit → delivered / failed / cancelled.
- Return shipment creation.
- Address management (per user, office addresses).
- Carrier and tracking information.

### Module 10: Scheduled Maintenance
- Maintenance records: create, assign technician, start, complete, cancel, skip.
- Maintenance templates with checklist items.
- Recurring maintenance plans (apply template to assets).
- Priority levels.

### Module 11: Settings
- AI assignment configuration (provider, model, prompt template).
- Request classification configuration (enable/disable, confidence threshold).
- Procurement configuration (enforcement mode, approval threshold, PO prefix, fiscal year).

### Module 12: Real-time Notifications
- WebSocket events: request status changed, comment added, assignment, report ready.
- In-app notification center with read/unread.
- Mark individual or all as read.

### Module 13: API Keys & MCP Server
- API key management (create, list, revoke).
- MCP server for AI assistant integration (tool calls for all modules).

## Out of scope (v1)

- Email/Slack notifications (only in-app).
- Mobile native app.
- File attachments on requests.
- SLA configuration UI (hardcoded thresholds).
- Knowledge base / self-service wiki.
- SSO / LDAP directory sync.
- Billing & subscriptions.

## Non-functional requirements

| Category | Requirement |
|---|---|
| Performance | Bundle < 1MB gzipped, LCP < 2s, lazy routes |
| Accessibility | WCAG AA, keyboard navigation, ARIA labels |
| Real-time | WebSocket auto-reconnect with exponential backoff |
| Resilience | Retry 3x, user-friendly error messages, offline fallback |
| Security | JWT Bearer, company data isolation, no secrets in client |
| Observability | Console.error logs, Sentry if applicable |

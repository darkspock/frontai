# Catálogo de puntos de API

Referencia completa de puntos de API de Desk Support Monkey. Fuente: `https://staging.desksupportmonkey.com/openapi.json`.

> **Nota:** Las respuestas de API no tienen tipo en la especificación OpenAPI. Las formas de respuesta deben inferirse de llamadas reales de API y escribirse con esquemas Zod en el frontend.

---

## Health

| Method | Path | Summary | Auth |
|---|---|---|---|
| GET | `/health` | Health check | No |

---

## Auth

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/magic-link` | Request magic link | No |
| POST | `/api/v1/auth/verify` | Verify magic link token | No |
| POST | `/api/v1/auth/login` | Password login (admin only) | No |
| POST | `/api/v1/auth/set-password` | Set password | Yes |
| GET | `/api/v1/auth/me` | Get current user profile | Yes |

### Request schemas

**MagicLinkRequest**
```typescript
{ email: string } // email format
```

**VerifyRequest**
```typescript
{ token: string }
```

**PasswordLoginRequest**
```typescript
{ email: string, password: string } // email format
```

**SetPasswordRequest**
```typescript
{ password: string }
```

---

## API Keys

| Method | Path | Summary | Auth |
|---|---|---|---|
| GET | `/api/v1/auth/api-keys` | List API keys | Yes |
| POST | `/api/v1/auth/api-keys` | Create API key | Yes |
| DELETE | `/api/v1/auth/api-keys/{key_id}` | Revoke API key | Yes |

### Request schemas

**CreateApiKeyRequest**
```typescript
{ name: string }
```

---

## Registration

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/register` | Self-service company registration | No |

### Request schemas

**RegisterCompanyRequest**
```typescript
{
  name: string
  admin_email: string       // email format
  email_domains: string[]
}
```

---

## Companies

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/companies` | Create company | Yes |
| GET | `/api/v1/companies` | List companies | Yes |
| GET | `/api/v1/companies/{company_id}` | Get company | Yes |
| PUT | `/api/v1/companies/{company_id}` | Update company | Yes |
| PATCH | `/api/v1/companies/{company_id}/status` | Update company status | Yes |

**Query params (list):** `page`, `page_size`, `search`

### Request schemas

**CreateCompanyRequest**
```typescript
{
  name: string
  email_domains: string[]
  admin_email?: string | null
}
```

**UpdateCompanyRequest**
```typescript
{
  name?: string | null
  email_domains?: string[] | null
}
```

**UpdateCompanyStatusRequest**
```typescript
{ status: string }
```

---

## Departments

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/departments` | Create department | Yes |
| GET | `/api/v1/departments` | List departments | Yes |
| GET | `/api/v1/departments/{department_id}` | Get department | Yes |
| PUT | `/api/v1/departments/{department_id}` | Update department | Yes |
| DELETE | `/api/v1/departments/{department_id}` | Delete department | Yes |
| PUT | `/api/v1/departments/{department_id}/manager` | Assign manager | Yes |
| DELETE | `/api/v1/departments/{department_id}/manager` | Remove manager | Yes |

**Query params (list):** `page`, `page_size`, `include_inactive`

### Request schemas

**CreateDepartmentRequest**
```typescript
{ name: string }
```

**UpdateDepartmentRequest**
```typescript
{
  name: string
  priority_weight?: number | null
  budget_enforcement_enabled?: boolean | null
}
```

**AssignManagerRequest**
```typescript
{ user_id: string }
```

---

## Users

| Method | Path | Summary | Auth |
|---|---|---|---|
| GET | `/api/v1/users` | List users | Yes |
| POST | `/api/v1/users/invite` | Invite user | Yes |
| POST | `/api/v1/users/import/preview` | Preview user import (CSV) | Yes |
| POST | `/api/v1/users/import/confirm` | Confirm user import | Yes |
| POST | `/api/v1/users/quick-create` | Quick create employee | Yes |
| GET | `/api/v1/users/{user_id}` | Get user | Yes |
| PATCH | `/api/v1/users/{user_id}` | Update user | Yes |
| PATCH | `/api/v1/users/{user_id}/role` | Change role | Yes |
| PATCH | `/api/v1/users/{user_id}/deactivate` | Deactivate user | Yes |
| PATCH | `/api/v1/users/{user_id}/activate` | Activate user | Yes |
| PATCH | `/api/v1/users/{user_id}/department` | Assign department | Yes |

**Query params (list):** `page`, `page_size`, `role`, `is_active`, `department_id`, `search`

### Request schemas

**InviteUserRequest**
```typescript
{
  email: string       // email format
  name?: string | null
  role?: string | null
}
```

**QuickCreateEmployeeRequest**
```typescript
{
  email: string       // email format
  name?: string | null
}
```

**UpdateUserRequest**
```typescript
{
  name?: string | null
  role?: string | null
  department_id?: string | null
  employee_role_id?: string | null
}
```

**ChangeRoleRequest**
```typescript
{ role: string }
```

**AssignDepartmentRequest**
```typescript
{ department_id?: string | null }
```

**Import (CSV upload):** `multipart/form-data` with `file` (binary). Confirm also accepts `department_mapping` and `employee_role_mapping` as JSON strings.

---

## Assets

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/assets` | Create asset | Yes |
| GET | `/api/v1/assets` | List assets | Yes |
| POST | `/api/v1/assets/import` | Import assets (CSV) | Yes |
| GET | `/api/v1/assets/assignable-users` | List assignable users | Yes |
| GET | `/api/v1/assets/{asset_id}` | Get asset | Yes |
| PUT | `/api/v1/assets/{asset_id}` | Update asset | Yes |
| PATCH | `/api/v1/assets/{asset_id}/status` | Change asset status | Yes |
| GET | `/api/v1/assets/{asset_id}/history` | Get asset history | Yes |
| PATCH | `/api/v1/assets/{asset_id}/assign` | Assign asset | Yes |
| PATCH | `/api/v1/assets/{asset_id}/unassign` | Unassign asset | Yes |

**Query params (list):** `page`, `page_size`, `search`, `type`, `status`, `department_id`, `assigned_to`, `sort_by`, `sort_order`

### Request schemas

**CreateAssetRequest**
```typescript
{
  type: string
  brand: string
  model: string
  serial_number: string
  purchase_date?: string | null
  warranty_expiration?: string | null
  notes?: string | null
}
```

**UpdateAssetRequest**
```typescript
{
  brand?: string | null
  model?: string | null
  purchase_date?: string | null
  warranty_expiration?: string | null
  notes?: string | null
}
```

**ChangeStatusRequest**
```typescript
{ status: string }
```

**AssignAssetRequest**
```typescript
{ user_id: string }
```

---

## Requests (Service Desk)

| Method | Path | Summary | Auth |
|---|---|---|---|
| GET | `/api/v1/requests` | List requests | Yes |
| POST | `/api/v1/requests` | Create request | Yes |
| GET | `/api/v1/requests/{request_id}` | Get request | Yes |
| GET | `/api/v1/requests/{request_id}/events` | List request events | Yes |
| PATCH | `/api/v1/requests/{request_id}/status` | Change status | Yes |
| PATCH | `/api/v1/requests/{request_id}/priority` | Change priority | Yes |
| PATCH | `/api/v1/requests/{request_id}/assign` | Assign request | Yes |
| POST | `/api/v1/requests/{request_id}/approve` | Approve request | Yes |
| POST | `/api/v1/requests/{request_id}/reject` | Reject request | Yes |
| POST | `/api/v1/requests/{request_id}/comments` | Add comment | Yes |
| GET | `/api/v1/requests/{request_id}/comments` | List comments | Yes |
| POST | `/api/v1/requests/{request_id}/notes` | Add note | Yes |
| GET | `/api/v1/requests/{request_id}/notes` | List notes | Yes |

**Query params (list):** `page`, `page_size`, `search`, `status`, `type`, `priority`, `assigned_to`, `subtype`

### Request schemas

**CreateRequestRequest**
```typescript
{
  type: string
  title: string
  description: string
  subtype?: string | null
  data?: object | null
  on_behalf_of?: string | null
}
```

**ChangePriorityRequest**
```typescript
{ priority: string }
```

**AssignRequestRequest**
```typescript
{ user_id: string }
```

**RejectRequestRequest**
```typescript
{ reason: string }
```

**AddCommentRequest**
```typescript
{ body: string }
```

---

## My (current user)

| Method | Path | Summary | Auth |
|---|---|---|---|
| PATCH | `/api/v1/my/profile` | Update my profile | Yes |
| GET | `/api/v1/my/equipment` | My equipment | Yes |
| GET | `/api/v1/my/requests` | My requests | Yes |
| GET | `/api/v1/my/notifications` | My notifications | Yes |
| PATCH | `/api/v1/my/notifications/{notification_id}/read` | Mark notification read | Yes |
| PATCH | `/api/v1/my/notifications/read-all` | Mark all read | Yes |
| GET | `/api/v1/my/company-settings` | Get my company settings | Yes |
| PUT | `/api/v1/my/company-settings` | Update my company settings | Yes |
| GET | `/api/v1/my/appointments` | My appointments | Yes |
| GET | `/api/v1/my/shipments` | My shipments | Yes |
| GET | `/api/v1/my/maintenance` | My maintenance | Yes |

**Query params:** `page`, `page_size` on all lists. Additionally: `status`+`subtype` (requests), `is_read` (notifications), `status`+`view` (appointments).

### Request schemas

**UpdateMyProfileRequest**
```typescript
{ name: string }
```

**UpdateMyCompanySettingsRequest**
```typescript
{ email_domains: string[] }
```

---

## Dashboard

| Method | Path | Summary | Auth |
|---|---|---|---|
| GET | `/api/v1/dashboard/requests/summary` | Request summary | Yes |
| GET | `/api/v1/dashboard/requests/resolution-time` | Resolution time | Yes |
| GET | `/api/v1/dashboard/requests/trend` | Request trend | Yes |
| GET | `/api/v1/dashboard/assets/summary` | Asset summary | Yes |
| GET | `/api/v1/dashboard/alerts/warranty` | Warranty alerts | Yes |
| GET | `/api/v1/dashboard/alerts/aging` | Aging alerts | Yes |
| GET | `/api/v1/dashboard/alerts/sla` | SLA alerts | Yes |
| GET | `/api/v1/dashboard/budget-health` | Budget health | Yes |
| GET | `/api/v1/dashboard/recent-purchase-orders` | Recent purchase orders | Yes |
| GET | `/api/v1/dashboard/shipments/summary` | Shipment summary | Yes |
| GET | `/api/v1/dashboard/maintenance` | Maintenance summary | Yes |

**Query params:** `from_date`, `to_date` (most), `bucket` (trend: day/week/month), `days` (warranty, default 30), `years` (aging, default 3).

All dashboard endpoints are read-only GET requests.

---

## Reports

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/reports` | Create report | Yes |
| GET | `/api/v1/reports` | List reports | Yes |
| GET | `/api/v1/reports/{report_id}` | Get report | Yes |
| GET | `/api/v1/reports/{report_id}/download` | Download report | Yes |

**Query params (list):** `page`, `page_size`

### Request schemas

**CreateReportRequest**
```typescript
{
  type: string
  parameters?: object | null
}
```

---

## Employee Roles

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/employee-roles` | Create employee role | Yes |
| GET | `/api/v1/employee-roles` | List employee roles | Yes |
| GET | `/api/v1/employee-roles/{role_id}` | Get employee role | Yes |
| PUT | `/api/v1/employee-roles/{role_id}` | Update employee role | Yes |
| DELETE | `/api/v1/employee-roles/{role_id}` | Delete employee role | Yes |

**Query params (list):** `page`, `page_size`, `include_inactive`

### Request schemas

**CreateEmployeeRoleRequest**
```typescript
{
  name: string
  description?: string | null
}
```

**UpdateEmployeeRoleRequest**
```typescript
{
  name: string
  description?: string | null
}
```

---

## Equipment Profiles

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/equipment-profiles` | Create profile | Yes |
| GET | `/api/v1/equipment-profiles` | List profiles | Yes |
| GET | `/api/v1/equipment-profiles/my-budget` | My budget | Yes |
| GET | `/api/v1/equipment-profiles/{profile_id}` | Get profile | Yes |
| PUT | `/api/v1/equipment-profiles/{profile_id}` | Update profile | Yes |
| DELETE | `/api/v1/equipment-profiles/{profile_id}` | Delete profile | Yes |
| POST | `/api/v1/equipment-profiles/{profile_id}/activate` | Activate profile | Yes |
| POST | `/api/v1/equipment-profiles/{profile_id}/deactivate` | Deactivate profile | Yes |

**Query params (list):** `page`, `page_size`, `department_id`, `employee_role_id`, `is_active`

### Request schemas

**CreateProfileRequest**
```typescript
{
  department_id: string
  employee_role_id: string
  items: ProfileItem[]
}
```

**UpdateProfileRequest**
```typescript
{
  items: ProfileItem[]
}
```

**ProfileItem**
```typescript
{
  asset_type: string
  quantity?: number           // default 1
  preferred_brand?: string | null
  preferred_model?: string | null
  min_ram_gb?: number | null
  min_storage_gb?: number | null
  budget_cents?: number | null
}
```

---

## Settings

| Method | Path | Summary | Auth |
|---|---|---|---|
| GET | `/api/v1/settings/assignment-ai` | Get AI assignment config | Yes |
| PUT | `/api/v1/settings/assignment-ai` | Save AI assignment config | Yes |
| GET | `/api/v1/settings/request-classification` | Get classification config | Yes |
| PUT | `/api/v1/settings/request-classification` | Save classification config | Yes |
| GET | `/api/v1/settings/procurement` | Get procurement config | Yes |
| PUT | `/api/v1/settings/procurement` | Save procurement config | Yes |

### Request schemas

**SaveAIConfigRequest**
```typescript
{
  provider: string
  prompt_template: string
  model?: string | null
}
```

**SaveClassificationConfigRequest**
```typescript
{
  is_enabled: boolean
  provider: string
  model?: string | null
  confidence_threshold?: number    // default 0.7
  prompt_template?: string | null
  timeout_seconds?: number         // default 10
}
```

**ProcurementConfigUpdateRequest**
```typescript
{
  enforcement_mode: string
  approval_threshold_cents: number
  po_number_prefix: string
  fiscal_year_start_month: number
  currency: string
  auto_create_assets?: boolean     // default false
}
```

---

## Vendors

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/vendors` | Create vendor | Yes |
| GET | `/api/v1/vendors` | List vendors | Yes |
| GET | `/api/v1/vendors/{vendor_id}` | Get vendor | Yes |
| PUT | `/api/v1/vendors/{vendor_id}` | Update vendor | Yes |
| POST | `/api/v1/vendors/{vendor_id}/activate` | Activate vendor | Yes |
| POST | `/api/v1/vendors/{vendor_id}/deactivate` | Deactivate vendor | Yes |

**Query params (list):** `page`, `page_size`, `search`, `is_active`

### Request schemas

**VendorCreateRequest / VendorUpdateRequest**
```typescript
{
  name: string
  contact_email?: string | null
  phone?: string | null
  address?: string | null
  notes?: string | null
}
```

---

## Purchase Orders

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/purchase-orders` | Create PO | Yes |
| GET | `/api/v1/purchase-orders` | List POs | Yes |
| GET | `/api/v1/purchase-orders/{purchase_order_id}` | Get PO | Yes |
| PUT | `/api/v1/purchase-orders/{purchase_order_id}` | Update PO | Yes |
| POST | `/api/v1/purchase-orders/{purchase_order_id}/submit` | Submit PO | Yes |
| POST | `/api/v1/purchase-orders/{purchase_order_id}/approve` | Approve PO | Yes |
| POST | `/api/v1/purchase-orders/{purchase_order_id}/reject` | Reject PO | Yes |
| POST | `/api/v1/purchase-orders/{purchase_order_id}/mark-ordered` | Mark ordered | Yes |
| POST | `/api/v1/purchase-orders/{purchase_order_id}/receive` | Receive items | Yes |
| POST | `/api/v1/purchase-orders/{purchase_order_id}/close` | Close PO | Yes |
| POST | `/api/v1/purchase-orders/{purchase_order_id}/cancel` | Cancel PO | Yes |
| POST | `/api/v1/purchase-orders/{purchase_order_id}/pdf` | Generate PO PDF | Yes |
| GET | `/api/v1/purchase-orders/{purchase_order_id}/pdf` | Get PO PDF | Yes |

**Query params (list):** `page`, `page_size`, `status`, `vendor_id`, `department_id`, `request_id`

### Request schemas

**POCreateRequest / POUpdateRequest**
```typescript
{
  vendor_id?: string | null
  vendor_name: string
  department_id: string
  items: POItem[]
  request_ids?: string[]       // default []
  notes?: string | null
}
```

**POItem**
```typescript
{
  description: string
  asset_type?: string | null
  quantity: number
  unit_cost_cents: number
  notes?: string | null
}
```

**ReceiveRequest**
```typescript
{
  items: ReceiveItem[]
}
```

**ReceiveItem**
```typescript
{
  item_id: string
  received_quantity: number
  create_asset?: boolean         // default false
  link_asset_id?: string | null
}
```

**RejectRequest**
```typescript
{ reason: string }
```

**CancelRequest**
```typescript
{ reason: string }
```

---

## Appointments

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/appointments` | Create appointment | Yes |
| GET | `/api/v1/appointments` | List appointments | Yes |
| GET | `/api/v1/appointments/{appointment_id}` | Get appointment | Yes |
| POST | `/api/v1/appointments/{appointment_id}/confirm` | Confirm | Yes |
| POST | `/api/v1/appointments/{appointment_id}/cancel` | Cancel | Yes |
| POST | `/api/v1/appointments/{appointment_id}/complete` | Complete | Yes |
| POST | `/api/v1/appointments/{appointment_id}/reschedule` | Reschedule | Yes |

**Query params (list):** `page`, `page_size`, `status`, `technician_id`, `employee_id`, `request_id`, `date_from`, `date_to`

### Request schemas

**AppointmentCreateRequest**
```typescript
{
  request_id: string
  technician_id: string
  employee_id: string
  scheduled_start: string        // date-time
  duration_minutes: number
  location?: string | null
}
```

**CancelAppointmentRequest**
```typescript
{ reason: string }
```

**CompleteAppointmentRequest**
```typescript
{ notes?: string | null }
```

**RescheduleAppointmentRequest**
```typescript
{
  new_start: string              // date-time
  new_duration_minutes: number
  reason: string
  location?: string | null
}
```

---

## Shipments

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/shipments` | Create shipment | Yes |
| GET | `/api/v1/shipments` | List shipments | Yes |
| GET | `/api/v1/shipments/by-asset/{asset_id}` | Shipments by asset | Yes |
| GET | `/api/v1/shipments/{shipment_id}` | Get shipment | Yes |
| PATCH | `/api/v1/shipments/{shipment_id}` | Update shipment | Yes |
| POST | `/api/v1/shipments/{shipment_id}/dispatch` | Dispatch | Yes |
| POST | `/api/v1/shipments/{shipment_id}/in-transit` | Mark in transit | Yes |
| POST | `/api/v1/shipments/{shipment_id}/deliver` | Deliver | Yes |
| POST | `/api/v1/shipments/{shipment_id}/fail` | Fail | Yes |
| POST | `/api/v1/shipments/{shipment_id}/cancel` | Cancel | Yes |
| POST | `/api/v1/shipments/{shipment_id}/return` | Create return | Yes |
| PATCH | `/api/v1/shipments/{shipment_id}/items` | Modify items | Yes |

**Query params (list):** `page`, `page_size`, `status`, `direction`, `destination_type`, `request_id`, `po_id`

### Request schemas

**CreateShipmentRequest**
```typescript
{
  direction: string
  destination_type: string
  destination_address_id: string
  asset_ids: string[]
  origin_address_id?: string | null
  recipient_name?: string | null
  recipient_user_id?: string | null
  carrier?: string | null
  service_level?: string | null
  tracking_number?: string | null
  tracking_url?: string | null
  items_description?: string | null
  internal_notes?: string | null
  request_id?: string | null
  po_id?: string | null
  notes?: string | null
}
```

**UpdateShipmentRequest**
```typescript
{
  carrier?: string | null
  service_level?: string | null
  tracking_number?: string | null
  tracking_url?: string | null
  items_description?: string | null
  internal_notes?: string | null
  notes?: string | null
}
```

**DispatchShipmentRequest**
```typescript
{
  carrier?: string | null
  tracking_number?: string | null
  tracking_url?: string | null
}
```

**DeliverShipmentRequest**
```typescript
{ notes?: string | null }
```

**FailShipmentRequest**
```typescript
{ reason: string }
```

**CancelShipmentRequest**
```typescript
{ reason: string }
```

**CreateReturnRequest**
```typescript
{
  destination_address_id: string
  asset_ids: string[]
  carrier?: string | null
  tracking_number?: string | null
  notes?: string | null
}
```

**ModifyItemsRequest**
```typescript
{
  add_asset_ids?: string[]       // default []
  remove_item_ids?: string[]     // default []
}
```

---

## Addresses

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/addresses` | Create address | Yes |
| GET | `/api/v1/addresses` | List addresses | Yes |
| GET | `/api/v1/addresses/by-user/{user_id}` | Addresses by user | Yes |
| GET | `/api/v1/addresses/{address_id}` | Get address | Yes |
| PUT | `/api/v1/addresses/{address_id}` | Update address | Yes |
| DELETE | `/api/v1/addresses/{address_id}` | Deactivate address | Yes |

**Query params (list):** `page`, `page_size`, `user_id`, `is_office`, `is_active`

### Request schemas

**AddressCreateRequest**
```typescript
{
  label: string
  street_line_1: string
  city: string
  state: string
  postal_code: string
  country?: string               // default "US"
  street_line_2?: string | null
  recipient_name?: string | null
  phone?: string | null
  user_id?: string | null
  is_office?: boolean            // default false
}
```

**AddressUpdateRequest**
```typescript
{
  label?: string | null
  street_line_1?: string | null
  street_line_2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
  recipient_name?: string | null
  phone?: string | null
  user_id?: string | null
  is_office?: boolean | null
}
```

---

## Availability & Scheduling

| Method | Path | Summary | Auth |
|---|---|---|---|
| PUT | `/api/v1/availability/technicians/{technician_id}` | Set availability | Yes |
| GET | `/api/v1/availability/technicians/{technician_id}` | Get availability | Yes |
| POST | `/api/v1/availability/technicians/{technician_id}/overrides` | Add override | Yes |
| GET | `/api/v1/availability/technicians/{technician_id}/overrides` | List overrides | Yes |
| DELETE | `/api/v1/availability/overrides/{override_id}` | Delete override | Yes |
| GET | `/api/v1/availability/technicians/{technician_id}/slots` | Get available slots | Yes |

**Query params (overrides):** `date_from` (required), `date_to` (required)
**Query params (slots):** `date` (required), `duration_minutes` (optional, 30-90)

### Request schemas

**SetAvailabilityRequest**
```typescript
{
  windows: AvailabilityWindow[]
}
```

**AvailabilityWindow**
```typescript
{
  day_of_week: number            // 0-6
  start_time: string             // time format HH:MM
  end_time: string               // time format HH:MM
}
```

**OverrideCreateRequest**
```typescript
{
  date: string                   // date format YYYY-MM-DD
  is_available: boolean
  start_time?: string | null     // time format
  end_time?: string | null       // time format
  reason?: string | null
}
```

---

## Budgets

| Method | Path | Summary | Auth |
|---|---|---|---|
| PUT | `/api/v1/departments/{department_id}/budget` | Set department budget | Yes |
| GET | `/api/v1/departments/{department_id}/budget` | Get department budget | Yes |
| GET | `/api/v1/budgets/summary` | Get budget summary | Yes |

**Query params:** `fiscal_year` (optional)

### Request schemas

**BudgetSetRequest**
```typescript
{
  fiscal_year?: number | null
  allocated_amount_cents: number
}
```

---

## Maintenance

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/maintenance` | Create maintenance record | Yes |
| GET | `/api/v1/maintenance` | List maintenance records | Yes |
| GET | `/api/v1/maintenance/{record_id}` | Get maintenance record | Yes |
| PATCH | `/api/v1/maintenance/{record_id}` | Update maintenance record | Yes |
| POST | `/api/v1/maintenance/{record_id}/assign` | Assign record | Yes |
| POST | `/api/v1/maintenance/{record_id}/start` | Start maintenance | Yes |
| POST | `/api/v1/maintenance/{record_id}/complete` | Complete maintenance | Yes |
| POST | `/api/v1/maintenance/{record_id}/cancel` | Cancel maintenance | Yes |
| POST | `/api/v1/maintenance/{record_id}/skip` | Skip maintenance | Yes |

**Query params (list):** `page`, `page_size`, `status`, `asset_id`, `technician_id`, `priority`, `scheduled_from`, `scheduled_to`, `search`

### Request schemas

**CreateMaintenanceRecordRequest**
```typescript
{
  asset_id: string
  title: string
  priority?: string              // default "MEDIUM"
  description?: string | null
  technician_id?: string | null
  template_id?: string | null
  plan_id?: string | null
  checklist_items?: string[]
  scheduled_at?: string | null
}
```

**UpdateMaintenanceRecordRequest**
```typescript
{
  title?: string | null
  priority?: string | null
  description?: string | null
  checklist_items?: any[] | null
  scheduled_at?: string | null
}
```

**AssignMaintenanceRequest**
```typescript
{ technician_id: string }
```

**CompleteMaintenanceRequest**
```typescript
{
  completion_notes?: string | null
  actual_findings?: string | null
}
```

**CancelMaintenanceRequest**
```typescript
{ reason: string }
```

**SkipMaintenanceRequest**
```typescript
{ reason: string }
```

---

## Maintenance Templates

| Method | Path | Summary | Auth |
|---|---|---|---|
| POST | `/api/v1/maintenance-templates` | Create template | Yes |
| GET | `/api/v1/maintenance-templates` | List templates | Yes |
| GET | `/api/v1/maintenance-templates/{template_id}` | Get template | Yes |
| PUT | `/api/v1/maintenance-templates/{template_id}` | Update template | Yes |
| DELETE | `/api/v1/maintenance-templates/{template_id}` | Delete template | Yes |
| POST | `/api/v1/maintenance-templates/{template_id}/apply` | Apply template | Yes |

### Request schemas

**CreateMaintenanceTemplateRequest**
```typescript
{
  name: string
  default_priority?: string      // default "MEDIUM"
  description?: string | null
  recurrence_frequency?: string | null
  recurrence_interval?: number   // default 1
  asset_type_filter?: string | null
  checklist_items: ChecklistItem[]
}
```

**ChecklistItem**
```typescript
{
  title: string
  description?: string | null
  is_required?: boolean          // default true
}
```

**ApplyTemplateRequest**
```typescript
{
  asset_ids?: string[] | null
  first_due_at?: string | null
}
```

---

## Maintenance Plans

| Method | Path | Summary | Auth |
|---|---|---|---|
| GET | `/api/v1/maintenance-plans` | List plans | Yes |
| GET | `/api/v1/maintenance-plans/{plan_id}` | Get plan | Yes |
| DELETE | `/api/v1/maintenance-plans/{plan_id}` | Delete plan | Yes |

Read-only CRUD (plans are generated by applying templates).

---

## Patrones comunes

### Paginación
Todos los puntos de lista aceptan `page` (basado en 1, por defecto 1) y `page_size` (por defecto varía, típicamente 20-50).

### Respuestas de error
- `422` — Error de validación: `{ detail: [{ loc: [], msg: string, type: string }] }`
- `401` — No autorizado (token faltante o inválido)
- `403` — Prohibido (permisos insuficientes)
- `404` — No encontrado
- `409` — Conflicto (duplicado, transición de estado inválida)

### Transiciones de estado
Varias entidades usan máquinas de estado (solicitudes, órdenes de compra, envíos, mantenimiento, citas). Los cambios de estado se hacen vía puntos de acción dedicados (por ejemplo, `/submit`, `/approve`, `/cancel`), no estableciendo directamente el campo de estado.

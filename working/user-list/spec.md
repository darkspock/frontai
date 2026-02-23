# Feature: User List with Add and Edit

## 1. Objective

Allow admins to view all company users in a paginated table with search and role filtering, invite new users via email, and edit existing user details — so they can manage team access and roles from a single screen.

## 2. Target user

- **Admin / Super Admin** — responsible for managing company users, assigning roles, and controlling access.

## 3. User journeys

**Main flow — View user list:**
1. Admin navigates to `/users` from the sidebar.
2. The page loads and displays a paginated table of users with columns: email, name, role, department, status.
3. Admin can search by email or name using the search input.
4. Admin can filter by role using the role dropdown.
5. Admin can paginate through results (20 per page).

**Alternative flow — Invite new user:**
1. Admin clicks the "Invite User" button (top right).
2. A modal dialog opens with fields: email, name (optional), role.
3. Admin fills in the form and clicks "Send Invite".
4. System calls the API, shows loading state on the button.
5. On success: toast notification "Invitation sent", modal closes, table refreshes.
6. The new user appears in the list with status "Active".

**Alternative flow — Edit user:**
1. Admin clicks the edit icon on a user row.
2. A modal dialog opens pre-filled with the user's current data: name, role, department, employee role.
3. Admin modifies the desired fields and clicks "Save".
4. System calls the API, shows loading state on the button.
5. On success: toast notification "User updated", modal closes, table refreshes.

**Alternative flow — Activate/Deactivate user:**
1. Admin clicks the toggle status icon on a user row.
2. A confirmation dialog appears: "Deactivate user@email.com? They will lose access until reactivated." (or activate equivalent).
3. Admin confirms.
4. System calls the API, toast notification, table refreshes.

**Error flows:**
- Empty email on invite: field-level error "Email is required".
- Invalid email format on invite: field-level error "Enter a valid email".
- API error on invite (e.g., 409 duplicate): inline error in modal + toast "This email is already registered".
- API error on edit: inline error in modal + toast with error detail.
- API error loading list: page-level error state with "Try again" button.
- API error on activate/deactivate: toast error with detail.

## 4. Screens and states

| Screen | States required |
|--------|-----------------|
| User list page (`/users`) | loading (spinner while fetching) / empty (no users yet, CTA to invite) / error (API failed, retry button) / success (table with data) |
| Invite user modal | default (form visible) / submitting (button loading) / validation error (field-level errors) / API error (inline error message) |
| Edit user modal | default (pre-filled form) / submitting (button loading) / validation error (field-level errors) / API error (inline error message) |
| Confirm dialog (activate/deactivate) | default (confirmation text + buttons) / submitting (confirm button loading) |

## 5. API contracts

### List users
- **Method + path:** `GET /api/v1/users`
- **Query params:** `page` (default 1), `page_size` (default 20), `search` (string), `role` (enum), `is_active` (boolean)
- **Response:**
  ```json
  {
    "data": [
      {
        "id": "uuid",
        "email": "user@acme.com",
        "name": "John Doe",
        "role": "employee",
        "company_id": "uuid",
        "department_id": "uuid",
        "department_name": "Engineering",
        "employee_role_id": "uuid",
        "is_active": true,
        "created_at": "2025-01-15T10:00:00Z"
      }
    ],
    "meta": {
      "page": 1,
      "page_size": 20,
      "total": 45
    }
  }
  ```
- **Errors:** `401` (not authenticated), `403` (not admin)

### Invite user
- **Method + path:** `POST /api/v1/users/invite`
- **Request:**
  ```json
  {
    "email": "newuser@acme.com",
    "name": "Jane Smith",
    "role": "employee"
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      "id": "uuid",
      "email": "newuser@acme.com",
      "name": "Jane Smith",
      "role": "employee",
      "is_active": true
    }
  }
  ```
- **Errors:** `401`, `403`, `409` (email already exists), `422` (validation)

### Update user
- **Method + path:** `PATCH /api/v1/users/{user_id}`
- **Request:**
  ```json
  {
    "name": "Jane Smith Updated",
    "role": "technician",
    "department_id": "uuid",
    "employee_role_id": "uuid"
  }
  ```
- **Response:**
  ```json
  {
    "data": {
      "id": "uuid",
      "email": "user@acme.com",
      "name": "Jane Smith Updated",
      "role": "technician",
      "department_id": "uuid",
      "is_active": true
    }
  }
  ```
- **Errors:** `401`, `403`, `404` (user not found), `422` (validation)

### Deactivate user
- **Method + path:** `PATCH /api/v1/users/{user_id}/deactivate`
- **Request:** empty body
- **Response:**
  ```json
  { "data": { "id": "uuid", "is_active": false } }
  ```
- **Errors:** `401`, `403`, `404`

### Activate user
- **Method + path:** `PATCH /api/v1/users/{user_id}/activate`
- **Request:** empty body
- **Response:**
  ```json
  { "data": { "id": "uuid", "is_active": true } }
  ```
- **Errors:** `401`, `403`, `404`

### List departments (for edit modal dropdown)
- **Method + path:** `GET /api/v1/departments`
- **Query params:** `page_size=100`
- **Response:**
  ```json
  {
    "data": [{ "id": "uuid", "name": "Engineering" }],
    "meta": { "page": 1, "page_size": 100, "total": 5 }
  }
  ```

## 6. Data types

```typescript
export type UserRole = 'super_admin' | 'admin' | 'technician' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  company_id: string;
  department_id: string | null;
  department_name?: string | null;
  employee_role_id?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    page_size: number;
    total: number;
  };
}

export interface InviteUserRequest {
  email: string;
  name?: string | null;
  role: UserRole;
}

export interface UpdateUserRequest {
  name?: string | null;
  role?: UserRole;
  department_id?: string | null;
  employee_role_id?: string | null;
}

export interface Department {
  id: string;
  name: string;
}
```

## 7. Validation rules

### Invite user form
- `email`: required, must be valid email format.
- `name`: optional, min length 2 if provided.
- `role`: required, must be one of the allowed roles.

### Edit user form
- `name`: optional, min length 2 if provided.
- `role`: required, must be one of the allowed roles.
- `department_id`: optional (dropdown, can be "Unassigned").
- `employee_role_id`: optional (dropdown, can be "Unassigned").

## 8. Error cases

| Error | UI response |
|-------|-------------|
| List fails to load (network/server error) | Page-level error state: "Failed to load users" + "Try again" button |
| Email already registered on invite (409) | Inline error in modal: "This email is already registered" + toast |
| Invalid email format on invite | Field-level error: "Enter a valid email" |
| Empty email on invite | Field-level error: "Email is required" |
| Role not selected on invite | Field-level error: "Role is required" |
| Update fails (404, user deleted) | Toast error: "User not found" + close modal |
| Update fails (422, validation) | Inline error in modal with API detail |
| Activate/deactivate fails | Toast error with API detail |
| Network error (any operation) | Toast error: "Something went wrong. Please try again." |

## 9. Navigation and routing

### Routes

| Path | Page | Auth required | Roles |
|------|------|---------------|-------|
| `/users` | User list page | Yes | admin, super_admin |

### Auth guard behavior
- Unauthenticated user → redirect to `/auth/login?returnTo=/users`.
- Non-admin user → redirect to role default route.

### Navigation
- Accessible from sidebar under "Management" section.
- No sub-routes — all interactions (invite, edit, activate/deactivate) happen via modals on the same page.

## 10. UI layout

### User list page (`/users`)

- **Layout:** Page header (title + action button) → filter bar → data table → pagination.
- **Page header:**
  - Left: "Users" title (`text-3xl font-bold`).
  - Right: "Invite User" primary button.
- **Filter bar:** Horizontal row below header with:
  - Search input (placeholder: "Search by email or name..."), left-aligned, `max-w-sm`.
  - Role dropdown filter (options: "All roles", "Admin", "Technician", "Employee"), right of search.
- **Data table:** Full-width table with columns:
  - Email (always visible).
  - Name (always visible).
  - Role (always visible, displayed as badge).
  - Department (hidden on mobile, visible from `md` breakpoint).
  - Status (badge: green "Active" / red "Inactive").
  - Actions (edit icon + toggle activate/deactivate icon).
- **Pagination:** Below table. Shows current page, total pages. Previous/Next buttons.
- **Responsive:** On mobile, department column hidden. Filter bar stacks vertically on small screens.

### Invite user modal

- **Layout:** Centered overlay modal, max-width 448px.
- **Header:** "Invite User" title + close (X) button.
- **Body:** Vertical form with fields: email input, name input, role dropdown select.
- **Footer:** "Cancel" secondary button (left) + "Send Invite" primary button (right).
- **Dismissible:** Click backdrop or press Escape to close.

### Edit user modal

- **Layout:** Same modal style as invite.
- **Header:** "Edit User" title + subtitle showing user email (read-only) + close (X) button.
- **Body:** Vertical form with fields: name input, role dropdown, department dropdown, employee role dropdown.
- **Footer:** "Cancel" secondary button + "Save" primary button.
- **Pre-filled:** All fields show current values on open.

### Confirm dialog (activate/deactivate)

- **Layout:** Centered small dialog, max-width 400px.
- **Content:** Icon + title ("Deactivate User?" / "Activate User?") + description text + two buttons.
- **Buttons:** "Cancel" secondary + "Deactivate"/"Activate" primary (destructive variant for deactivate).

## 11. Out of scope

- CSV user import (separate feature).
- Quick-create employee flow.
- Role change as a separate endpoint (handled via edit modal's role field using PATCH /users/{id}).
- Department assignment as a separate endpoint (handled via edit modal).
- User detail page (view-only profile — future feature).
- Password reset or OAuth status display.
- Bulk actions (select multiple users, bulk deactivate).
- Sorting columns by click.
- Export user list.

---

## Implementation reference (reverse engineering from DSM)

> This section documents how the original DeskSupportMonkey frontend implements these patterns, for educational reference.

### User list page pattern (DSM: `src/pages/admin/UsersPage.tsx`)
- Single file (~600 lines) containing: list page, invite modal, edit modal, confirm dialog.
- TanStack Query for data fetching with key `['users', page, search, roleFilter]`.
- Search input triggers page reset to 1.
- Role filter as `<select>` with "All roles" + enum values.
- Custom `<Table>`, `<Th>`, `<Td>` semantic components for the table.
- `<Pagination>` component with page/total from API meta.
- Status shown as `<Badge variant="success|danger">`.

### Invite modal pattern (DSM: inline in UsersPage.tsx)
- State: `showInviteModal` boolean toggle.
- Fixed overlay with `z-[90]` and `bg-black/40` backdrop.
- Form fields: email (autofocus), name (optional), role (select, default "employee").
- Submit: `api.post('/users/invite', payload)` → invalidate queries → close modal → toast.
- Error: `setInviteError(detail)` displayed as inline red text above form.

### Edit modal pattern (DSM: inline in UsersPage.tsx)
- State: `editingUser: User | null` — non-null opens modal.
- Pre-fills from `editingUser` on open.
- Fetches departments and employee roles as dropdown options (separate queries, `page_size: 100`).
- Submit: `api.patch('/users/{id}', payload)` → invalidate queries → close → toast.
- Maps `department_id: "" → null` and `employee_role_id: "" → null` for "Unassigned" option.

### Activate/deactivate pattern (DSM: inline in UsersPage.tsx)
- Uses `<ConfirmDialog>` reusable component.
- State: `userToToggle: User | null` — non-null opens dialog.
- Tone: `"danger"` for deactivate, `"default"` for activate.
- API: conditional endpoint based on `is_active` → `deactivate` or `activate`.

### Empty state pattern (DSM)
- Shows when `users.length === 0 && !search && !roleFilter`.
- Icon + "No users yet" + "Invite your first team member" + Invite button as CTA.
- Does NOT show empty state when filters are active with no results — shows table with "No results" instead.

---

**Status:** draft

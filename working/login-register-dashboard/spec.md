# Feature: Login, Registration and Dashboard Shell

## 1. Objective

Build the authentication pages (login with magic link, company registration) and the main application shell (sidebar, header, dashboard placeholder) so the app has a navigable structure. No real API calls — all data is mocked or static. This serves as the foundation for all future screens.

## 2. Target user

- **Any user** arriving at the app for the first time — they need to log in or register their company.
- **Admin/Technician/Employee** — once "logged in," they see the app shell with sidebar navigation and a dashboard landing page.

## 3. User journeys

**Main flow — Magic link login:**
1. User opens the app and lands on `/auth/login`.
2. User enters their email and clicks "Send magic link."
3. UI shows a confirmation message: "Check your email for the login link."
4. (In a real flow, user clicks the link in their email and lands on `/auth/verify?token=...`.)
5. For the demo: clicking the confirmation message or a "Continue" button navigates directly to the dashboard.

**Alternative flow — Company registration:**
1. User clicks "Register your company" link on the login page.
2. User is taken to `/auth/register`.
3. User fills in: company name, admin email, email domain.
4. UI shows success message: "Company registered. Check your email."
5. A "Back to login" link returns to `/auth/login`.

**Alternative flow — Already authenticated:**
1. User opens the app with a mock token present.
2. App redirects from `/` to the default route based on role (`/dashboard` for admin).

**Error flows:**
- Empty email field: inline validation "Email is required."
- Invalid email format: inline validation "Enter a valid email."
- Empty required fields on registration form: inline validation per field.

## 4. Screens and states

| Screen | States required |
|--------|-----------------|
| Login page (`/auth/login`) | default / sending (button loading) / sent (success message) / validation error |
| Register page (`/auth/register`) | default / submitting (button loading) / success / validation error |
| Dashboard (`/dashboard`) | default (static mocked content) / loading (N/A — static data) / empty (N/A — always has mocked cards) / error (N/A — no API calls) / success (N/A) |
| App shell (sidebar + header) | sidebar expanded (desktop) / sidebar hidden (mobile) / sidebar as sheet (mobile open) |

## 5. API contracts

> **Note:** For this demo feature, no real API calls are made. All interactions are mocked with `setTimeout` to simulate network latency. The contracts below document what the real API expects, for reference.

### Magic link request
- **Method + path:** `POST /api/v1/auth/magic-link`
- **Request:**
  ```json
  { "email": "user@company.com" }
  ```
- **Response:**
  ```json
  { "data": { "message": "Magic link sent" } }
  ```
- **Errors:** `422` (validation), `429` (rate limit)

### Company registration
- **Method + path:** `POST /api/v1/register`
- **Request:**
  ```json
  {
    "name": "Acme Corp",
    "admin_email": "admin@acme.com",
    "email_domains": ["acme.com"]
  }
  ```
- **Response:**
  ```json
  { "data": { "id": "...", "name": "Acme Corp" } }
  ```
- **Errors:** `422` (validation), `409` (domain already registered)

### Current user
- **Method + path:** `GET /api/v1/auth/me`
- **Response:**
  ```json
  {
    "data": {
      "id": "...",
      "email": "admin@acme.com",
      "name": "Admin User",
      "role": "admin",
      "company_id": "...",
      "is_active": true
    }
  }
  ```
- **Errors:** `401` (not authenticated)

## 6. Data types

```typescript
// User returned by /auth/me
interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'super_admin' | 'admin' | 'technician' | 'employee';
  company_id: string;
  is_active: boolean;
}

// Auth state held in context
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

// Magic link request
interface MagicLinkRequest {
  email: string;
}

// Registration request
interface RegisterCompanyRequest {
  name: string;
  admin_email: string;
  email_domains: string[];
}
```

## 7. Validation rules

### Login form
- `email`: required, must be valid email format.

### Registration form
- `name`: required, min length 2.
- `admin_email`: required, must be valid email format.
- `email_domains`: required, at least one domain, each must be a valid domain (e.g., `acme.com`).

## 8. Error cases

| Error | UI response |
|-------|-------------|
| Empty email on login | Field-level error: "Email is required" |
| Invalid email format on login | Field-level error: "Enter a valid email" |
| Empty company name on register | Field-level error: "Company name is required" |
| Empty admin email on register | Field-level error: "Admin email is required" |
| Empty email domains on register | Field-level error: "At least one domain is required" |
| Network error (simulated) | Toast error: "Something went wrong. Please try again." |

## 9. Navigation and routing

### Routes

| Path | Page | Auth required | Roles |
|------|------|---------------|-------|
| `/auth/login` | Login page | No | — |
| `/auth/register` | Register page | No | — |
| `/auth/verify` | Verify page (placeholder) | No | — |
| `/` | Redirect to role default | Yes | All |
| `/dashboard` | Dashboard | Yes | admin |
| `/my/equipment` | Placeholder page | Yes | employee |
| `/requests` | Placeholder page | Yes | technician |

### Role-based defaults
- `admin` → `/dashboard`
- `technician` → `/requests`
- `employee` → `/my/equipment`

### Auth guard behavior
- Unauthenticated user accessing a protected route → redirect to `/auth/login?returnTo={current_path}`.
- Authenticated user accessing a route outside their role → redirect to their role default.
- Authenticated user accessing `/auth/login` → redirect to role default.

## 10. UI layout

### Login page (`/auth/login`)
- **Layout:** Two-panel (branded left panel + form right panel) on desktop. Single column on mobile.
- **Left panel (desktop only):** Brand color background, app logo, tagline text. Takes 50% width.
- **Right panel:** Centered form card with max-width ~400px.
- **Key components:** Input (email), Button (submit), link to register.
- **Primary action:** "Send magic link" button.
- **Secondary action:** "Register your company" text link below the form.

### Register page (`/auth/register`)
- **Layout:** Same two-panel layout as login.
- **Right panel:** Form with 3 fields (company name, admin email, email domain).
- **Key components:** Input (text + email), Button (submit), link back to login.
- **Primary action:** "Register" button.
- **Secondary action:** "Back to login" text link.

### App shell (layout wrapper)
- **Layout:** Sidebar (left, 256px desktop / hidden mobile) + Header (top, 64px sticky) + Content area (remaining space).
- **Sidebar:** Navigation links grouped by section. Each link has icon (Lucide) + label. Active link highlighted. Logo/app name at top.
- **Header:** Hamburger menu (mobile) on left, user avatar + name dropdown on right.
- **Content area:** `max-w-7xl mx-auto p-6`. Renders child route via `<Outlet />`.

### Dashboard (`/dashboard`)
- **Layout:** Page header ("Dashboard" title) + grid of placeholder cards.
- **Key components:** 4 stat cards in a row (mocked numbers), empty chart placeholders below.
- **Columns:** 4-column grid on desktop, 2 on tablet, 1 on mobile.
- **Primary action:** None (read-only page).

### Sidebar navigation items (for demo)

| Section | Label | Icon | Route | Roles |
|---------|-------|------|-------|-------|
| My Activity | My Equipment | `Monitor` | `/my/equipment` | employee |
| My Activity | My Requests | `MessageSquare` | `/my/requests` | employee |
| Operations | Dashboard | `LayoutDashboard` | `/dashboard` | admin |
| Operations | Requests | `Inbox` | `/requests` | technician, admin |
| Operations | Assets | `HardDrive` | `/assets` | technician, admin |
| Management | Users | `Users` | `/users` | admin |
| Management | Departments | `Building2` | `/departments` | admin |
| Management | Settings | `Settings` | `/settings` | admin |

## 11. Out of scope

- Real API integration (all calls are mocked with `setTimeout`).
- Password login flow.
- Google/Microsoft OAuth buttons.
- Token verification flow (`/auth/verify` is a placeholder only).
- Functional dashboard widgets with real data.
- WebSocket / real-time notifications.
- i18n (English only for this feature).
- All pages beyond login, register, and dashboard shell (they show "Coming soon" placeholder).

---

## Implementation reference (reverse engineering from DSM)

> This section documents how the original DeskSupportMonkey frontend implements these patterns, for educational reference.

### Auth context pattern (DSM: `src/contexts/AuthContext.tsx`)
- `AuthProvider` wraps the entire app.
- State: `{ user, token, loading }`.
- On mount: reads token from `localStorage`, calls `GET /auth/me` to hydrate user.
- `login(token)`: saves to localStorage, fetches user.
- `logout()`: removes token, clears user.
- `isRole(...roles)`: check current user role.
- Listens for `401` events from Axios interceptor to auto-logout.

### Route guard pattern (DSM: `src/components/auth/RequireRole.tsx`)
- Wraps route elements: `<RequireRole roles={['admin']}><Page /></RequireRole>`.
- No user → redirect to `/auth/login?returnTo=...`.
- User with wrong role → redirect to `getDefaultRouteForRole(user.role)`.

### App shell pattern (DSM: `src/components/layout/AppLayout.tsx`)
- Renders `<Sidebar>` + `<Header>` + `<main><Outlet /></main>`.
- Mobile: sidebar as overlay (state managed by `mobileNavOpen`).
- Forces password set for staff without password.
- Redirects `/` to role default.

### Login page pattern (DSM: `src/pages/auth/LoginPage.tsx`)
- Two-panel layout via `AuthShell` wrapper.
- `LoginMode` toggle between magic-link and password.
- On magic link: `api.post('/auth/magic-link', { email })` → show "check email" message.
- On password: `api.post('/auth/login', { email, password })` → `login(token)` → navigate.
- Already authenticated → redirect to role default.

### API client pattern (DSM: `src/lib/api.ts`)
- Axios instance with `baseURL: '/api/v1'`.
- Request interceptor: attaches `Authorization: Bearer {token}`.
- Response interceptor: normalizes error messages, handles 401 (clear token, redirect to login).
- Vite proxy: `/api` → `http://localhost:8001`.

### Sidebar pattern (DSM: `src/components/layout/Sidebar.tsx`)
- Desktop: `w-56 hidden md:flex md:flex-col`, always visible.
- Mobile: `fixed inset-0 z-40 md:hidden`, overlay with backdrop.
- Navigation items grouped in collapsible sections.
- Active route auto-expands its section.
- Items filtered by `user.role`.

### CSS / Theming (DSM: `src/index.css`)
- Tailwind CSS with design tokens as CSS custom properties in `:root`.
- OKLCH color space for all colors.
- Sidebar has its own dark tokens.

---

**Status:** validated

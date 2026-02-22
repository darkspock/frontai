# Tasks: Login, Registration and Dashboard Shell

Feature: `working/login-register-dashboard/spec.md`

---

## Types and foundations

- [x] **T01 — Define TypeScript types**
  Create `src/types/auth.ts` with `User`, `AuthState`, `MagicLinkRequest`, `RegisterCompanyRequest` interfaces.
  _Acceptance: types compile, no errors._

- [x] **T02 — Create mock API helper**
  Create `src/lib/api.ts` with an Axios-like mock that uses `setTimeout` (500ms delay). Export `mockApi.post()` and `mockApi.get()` that return hardcoded responses matching the spec's API contracts.
  _Acceptance: `mockApi.post('/auth/magic-link', { email })` resolves after 500ms with `{ data: { message: 'Magic link sent' } }`._

- [x] **T03 — Create utility: `cn()` classname helper**
  Already existed in `src/lib/utils.ts` (clsx + tailwind-merge). No action needed.
  _Acceptance: `cn('foo', false && 'bar', 'baz')` returns `'foo baz'`._

## Auth context and routing

- [x] **T04 — Create AuthContext and AuthProvider**
  Create `src/contexts/AuthContext.tsx`. Manages `{ user, token, loading }`. On mount, reads token from localStorage; if present, sets a hardcoded mock user. Exposes `login(token)`, `logout()`, `isRole(...roles)`.
  _Acceptance: wrapping app in `<AuthProvider>`, calling `login('fake-token')` sets user, `logout()` clears it._

- [x] **T05 — Create RequireRole route guard**
  Create `src/components/auth/RequireRole.tsx`. If no user → redirect to `/auth/login?returnTo=...`. If user role not in allowed list → redirect to role default. Otherwise render children.
  _Acceptance: unauthenticated access to `/dashboard` redirects to `/auth/login?returnTo=%2Fdashboard`._

- [x] **T06 — Create route helper: `getDefaultRouteForRole(role)`**
  Create `src/lib/navigation.ts`. Returns `/dashboard` for admin, `/requests` for technician, `/my/equipment` for employee.
  _Acceptance: function returns correct path for each role._

- [x] **T07 — Configure React Router with all routes**
  Create `src/router.tsx` using `createBrowserRouter`. Public routes: `/auth/login`, `/auth/register`, `/auth/verify`. Protected routes under `AppLayout`: `/dashboard`, `/my/equipment`, `/requests`, `/assets`, `/users`, `/departments`, `/settings`. Use lazy loading with `React.lazy()` and `<Suspense>`. Placeholder pages for routes that aren't fully implemented yet.
  _Acceptance: navigating to each route renders the correct page or placeholder. Protected routes redirect to login._

## UI components

- [x] **T08 — Create AuthShell layout component**
  Create `src/components/auth/AuthShell.tsx`. Two-panel layout: left panel (brand color bg + logo + tagline, hidden on mobile), right panel (centered content slot). Responsive: single column on mobile.
  _Acceptance: renders branded split layout on desktop, single column on mobile._

- [x] **T09 — Create app shell: Sidebar component**
  Create `src/components/layout/Sidebar.tsx`. Desktop: `w-64` fixed left, always visible. Mobile: hidden by default, rendered as slide-in overlay when toggled. Navigation items grouped by section (My Activity, Operations, Management). Items filtered by current user role. Active route highlighted. Lucide icons per item.
  _Acceptance: sidebar shows correct items for admin role. Active route is highlighted. Mobile overlay opens/closes._

- [x] **T10 — Create app shell: Header component**
  Create `src/components/layout/Header.tsx`. Sticky top, 64px height. Left: hamburger (mobile only). Right: user name + avatar dropdown with "Sign out" option that calls `logout()`.
  _Acceptance: hamburger toggles mobile sidebar. Sign out clears auth state and redirects to login._

- [x] **T11 — Create AppLayout wrapper**
  Create `src/components/layout/AppLayout.tsx`. Composes `<Sidebar>` + `<Header>` + `<main><Outlet /></main>`. Checks auth: if loading → spinner, if no user → redirect to login, if at `/` → redirect to role default.
  _Acceptance: renders shell with sidebar + header + child route content. Redirects work correctly._

- [x] **T12 — Create shared UI: Loading, StateBlock**
  Create `src/components/ui/Loading.tsx` (`Loading` inline spinner, `PageLoading` fullscreen) and `src/components/ui/StateBlock.tsx` (`EmptyState`, `ErrorState`) following patterns from `ia_docs/frontend/09-state-patterns.md`.
  _Acceptance: components render correctly with appropriate icons and messages._

## Pages

- [x] **T13 — Create Login page**
  Create `src/pages/auth/LoginPage.tsx`. Uses `AuthShell`. Email input + "Send magic link" button. Validates email (required, format). On submit: shows button loading state, calls mock API, then shows "Check your email" success state with a "Continue (demo)" button that calls `login('mock-token')` and navigates to `/`. If already authenticated, redirects to role default.
  _Acceptance: form validates, button shows loading, success message appears, demo continue works._

- [x] **T14 — Create Register page**
  Create `src/pages/auth/RegisterPage.tsx`. Uses `AuthShell`. Three fields: company name, admin email, email domain. Validates all fields. On submit: shows button loading, calls mock API, shows success message + "Back to login" link.
  _Acceptance: form validates all fields, success message appears, back to login works._

- [x] **T15 — Create Verify page (placeholder)**
  Create `src/pages/auth/VerifyPage.tsx`. Reads `?token=` from URL. Shows "Verifying..." spinner. After mock delay, calls `login('mock-token')` and redirects to `/`. If no token param, shows error and link to login.
  _Acceptance: with token → auto-logs in and redirects. Without token → shows error._

- [x] **T16 — Create Dashboard page**
  Create `src/pages/admin/DashboardPage.tsx`. Page header: "Dashboard" title. 4 stat cards in a responsive grid (4 cols desktop, 2 tablet, 1 mobile) with mocked numbers: "Open Requests: 12", "Assets: 156", "Avg Resolution: 4.2h", "SLA Breaches: 3". Below: 2 placeholder cards for charts ("Request Trend" and "Assets by Status") with centered text "Chart coming soon".
  _Acceptance: page renders with stat cards grid and placeholder charts. Responsive._

- [x] **T17 — Create placeholder pages for remaining routes**
  Create minimal pages for `/my/equipment`, `/my/requests`, `/requests`, `/assets`, `/users`, `/departments`, `/settings`. Each shows the page title and "Coming soon" text centered.
  _Acceptance: each route renders its placeholder page within the app shell._

## Integration and wiring

- [x] **T18 — Wire App.tsx with provider tree**
  Update `src/App.tsx` to wrap with `<QueryClientProvider>` → `<AuthProvider>` → `<RouterProvider>`. Configure QueryClient with `retry: 1`, `staleTime: 30_000`.
  _Acceptance: app boots, providers are active, routing works._

- [x] **T19 — Update index.css with design tokens**
  Update `src/index.css` with CSS custom properties from `ia_docs/frontend/07-design-tokens.md`. Include semantic colors (primary, destructive, muted, etc.), border radius, and sidebar-specific tokens.
  _Acceptance: Tailwind classes like `bg-primary`, `text-muted-foreground`, `rounded-md` render with correct values._

## Validation

- [x] **T20 — Verify all 4 UI states on login page**
  Test login page: default (form visible), sending (button loading), sent (success message), validation error (inline errors).
  _Acceptance: all 4 states work correctly._

- [x] **T21 — Verify responsive behavior**
  Test at 3 breakpoints: mobile (<768px), tablet (768-1023px), desktop (>=1024px). Auth pages: two-panel on desktop, single on mobile. App shell: sidebar hidden on mobile (hamburger), visible on desktop.
  _Acceptance: layout adapts correctly at all breakpoints._

- [x] **T22 — Verify auth guard redirects**
  Test: unauthenticated → redirects to login with returnTo. Wrong role → redirects to role default. Authenticated on login page → redirects to role default.
  _Acceptance: all redirect scenarios work._

- [x] **T23 — Run lint + typecheck + build**
  Run `npm run lint`, `npm run typecheck`, `npm run build`. Fix all errors.
  _Acceptance: all 3 commands pass with zero errors._

- [x] **T24 — Smoke test full journey**
  Manual walkthrough: open app → see login → enter email → see success → click continue → see dashboard with sidebar → navigate via sidebar → sign out → return to login.
  _Acceptance: full journey works end to end._

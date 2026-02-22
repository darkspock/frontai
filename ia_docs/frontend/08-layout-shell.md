# Layout shell and responsive breakpoints

Defines the app shell (sidebar + header + content area) and responsive behavior at each breakpoint.

---

## App shell structure

```
┌──────────────────────────────────────────────┐
│                 Header (64px)                 │
├──────────┬───────────────────────────────────┤
│          │                                   │
│ Sidebar  │         Content area              │
│ (256px)  │     (max-w-7xl, p-6)              │
│          │                                   │
│          │                                   │
│          │                                   │
└──────────┴───────────────────────────────────┘
```

### Header

- Height: `h-16` (64px).
- Fixed at top: `sticky top-0 z-50`.
- Contents: breadcrumb (left), user menu (right).
- Background: `bg-background border-b`.

### Sidebar

- Expanded width: `w-64` (256px).
- Collapsed width: `w-16` (64px).
- Fixed at left: `fixed left-0 top-16 bottom-0`.
- Background: `bg-muted/40 border-r`.
- Contents: navigation links with Lucide icons.
- Collapse trigger: toggle button at the bottom of the sidebar.
- Collapsed state: icons only, tooltip on hover for each item.

### Content area

- Offset: `ml-64` (or `ml-16` when sidebar collapsed).
- Offset top: `mt-16` for fixed header.
- Max width: `max-w-7xl mx-auto`.
- Padding: `p-6`.
- Background: `bg-background`.

---

## Page layout inside content area

Every page follows this structure:

```
┌─────────────────────────────────────┐
│ Page header                         │
│ ┌─────────────────────────────────┐ │
│ │ Breadcrumb                      │ │
│ │ Title + primary CTA (right)     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Page content                        │
│ ┌─────────────────────────────────┐ │
│ │ Sections with space-y-6         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

- Page header: `mb-6`.
- Breadcrumb: `text-sm text-muted-foreground mb-2`.
- Title: `text-3xl font-bold`.
- Primary CTA: aligned right on the same row as title.
- Sections: separated by `space-y-6`.

---

## Responsive breakpoints

Using Tailwind's default breakpoints:

| Breakpoint | Min width | Name | Layout changes |
|---|---|---|---|
| Default | 0px | Mobile | Sidebar hidden. Hamburger menu in header. Content full width. |
| `sm` | 640px | Mobile landscape | Same as mobile. Minor text adjustments. |
| `md` | 768px | Tablet | Sidebar collapsed (64px, icons only). Content adjusts. |
| `lg` | 1024px | Desktop | Sidebar expanded (256px). Full layout. |
| `xl` | 1280px | Wide desktop | Same as desktop. Content max-width applies. |

### Mobile (< 768px)

- Sidebar: hidden by default. Opened as a `Sheet` (slide-in panel) from hamburger.
- Header: hamburger button (left), logo (center), user avatar (right).
- Content: `p-4` instead of `p-6`.
- Tables: switch to stacked card-like rows (each row becomes a compact block).
- Dialogs: full-screen (`DialogContent` with `max-w-full`).

### Tablet (768px – 1023px)

- Sidebar: collapsed (64px), icons only, tooltip on hover.
- Header: same as desktop but without breadcrumb text (icon only).
- Content: `ml-16 p-6`.
- Tables: horizontal scroll if needed, no layout change.

### Desktop (>= 1024px)

- Full layout as defined in shell structure above.
- Sidebar: expanded (256px) with text labels.
- Content: `ml-64 p-6 max-w-7xl`.

---

## Sidebar navigation items

Standard navigation structure:

| Label | Icon | Route |
|---|---|---|
| Dashboard | `LayoutDashboard` | `/` |
| Users | `Users` | `/users` |
| Settings | `Settings` | `/settings` |

Add items as features are implemented. Keep the list short (max 8 top-level items).

---

## Rules

- Never hide the primary CTA on any breakpoint.
- Sidebar state (collapsed/expanded) persists in localStorage.
- Mobile sidebar closes automatically after navigation.
- Content area always has consistent padding — never zero.
- Header is always visible — never scrolls away.

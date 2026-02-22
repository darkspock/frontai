# Design tokens

Concrete values for this project. Every implementation must use these tokens — no arbitrary values.

---

## Colors (semantic)

Based on shadcn/ui slate theme with CSS variables. Use these Tailwind classes, not raw hex values.

### Core

| Token | Usage | Tailwind class |
|---|---|---|
| Background | Page background | `bg-background` |
| Foreground | Default text | `text-foreground` |
| Primary | Action buttons, links, active states | `bg-primary`, `text-primary` |
| Secondary | Less emphasis buttons | `bg-secondary`, `text-secondary-foreground` |
| Muted | Disabled, placeholders, subtle backgrounds | `bg-muted`, `text-muted-foreground` |
| Accent | Hover states, highlights | `bg-accent`, `text-accent-foreground` |
| Destructive | Errors, delete actions | `bg-destructive`, `text-destructive` |

### Status colors

| Status | Background | Text | Border |
|---|---|---|---|
| Success | `bg-green-50` | `text-green-700` | `border-green-200` |
| Warning | `bg-amber-50` | `text-amber-700` | `border-amber-200` |
| Error | `bg-destructive/15` | `text-destructive` | `border-destructive/30` |
| Info | `bg-blue-50` | `text-blue-700` | `border-blue-200` |

### Usage rules

- Never use raw hex colors in components.
- Use semantic tokens (`bg-primary`) over literal colors (`bg-blue-600`).
- Status colors follow the table above — no variations per screen.
- Opacity modifiers are allowed: `bg-destructive/15`, `bg-primary/10`.

---

## Typography

One font family: system default (Tailwind's `font-sans`). No custom fonts in v1.

| Level | Tailwind classes | Size | Use for |
|---|---|---|---|
| H1 | `text-3xl font-bold` | 30px | Page titles |
| H2 | `text-2xl font-semibold` | 24px | Section headings |
| H3 | `text-xl font-semibold` | 20px | Card titles, subsections |
| H4 | `text-lg font-medium` | 18px | Group headings |
| Body | `text-base` | 16px | Default text |
| Small | `text-sm` | 14px | Table cells, secondary text, helper text |
| Caption | `text-xs` | 12px | Badges, timestamps, metadata |

### Rules

- Maximum 2 font weights per screen (regular + semibold or bold).
- Line height: use Tailwind defaults (already set per size).
- Do not use `text-lg` for body text — reserve it for headings.
- Muted text: always pair with `text-muted-foreground`, never raw gray values.

---

## Spacing

Use Tailwind's spacing scale only. These are the allowed values:

| Token | Value | Common use |
|---|---|---|
| `1` | 4px | Tight gaps (icon-to-text) |
| `2` | 8px | Inline spacing, small gaps |
| `3` | 12px | Form field internal padding |
| `4` | 16px | Standard padding and gaps |
| `6` | 24px | Section separation |
| `8` | 32px | Major section gaps |
| `12` | 48px | Page-level vertical rhythm |
| `16` | 64px | Large separation (page top/bottom) |

### Rules

- Within a group: smaller spacing (`gap-2`, `space-y-2`).
- Between groups: larger spacing (`gap-6`, `space-y-6`).
- Page content padding: `p-6` (24px).
- Card internal padding: `p-4` (16px) or `p-6` (24px).
- No arbitrary values like `p-[17px]` or `mt-[23px]`.

---

## Border radius

| Token | Value | Use for |
|---|---|---|
| `rounded-md` | 6px | Default (buttons, inputs, badges) |
| `rounded-lg` | 8px | Cards, dialogs, sheets |
| `rounded-xl` | 12px | Large containers (rare) |
| `rounded-full` | 9999px | Avatars, circular badges, pills |

Do not use `rounded-sm` or `rounded` (4px) — too subtle. Default is `rounded-md`.

---

## Shadows

| Token | Use for |
|---|---|
| `shadow-sm` | Subtle elevation (dropdowns, popovers) |
| `shadow` | Cards and panels |
| `shadow-md` | Elevated elements (dialogs, sheets) |
| `shadow-lg` | Floating elements (modals) |

### Rules

- Most UI elements have no shadow (flat with border).
- Cards use `shadow` or `border` — not both unless intentional.
- Dialogs and sheets always use `shadow-lg`.

---

## Dark mode

**Not supported in v1.** This is an explicit decision.

- Do not add `dark:` variants to any component.
- Do not implement theme switching.
- Design only for light mode.
- If dark mode is added later, it will be a separate ADR and a dedicated task.

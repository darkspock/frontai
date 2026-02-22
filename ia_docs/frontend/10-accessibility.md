# Accessibility baseline

Minimum accessibility requirements for every screen. This is not a complete WCAG audit — it covers the rules that most commonly fail in management apps.

---

## Color contrast

- All text must meet WCAG AA contrast ratio:
  - Normal text (< 18px): **4.5:1** minimum.
  - Large text (>= 18px bold or >= 24px): **3:1** minimum.
- Do not use color as the only indicator of state. Pair with an icon, text, or border.
  - Bad: a red dot alone to indicate error.
  - Good: a red dot + the word "Error" or an `AlertTriangle` icon.
- Use the semantic color tokens from `07-design-tokens.md` — they are already contrast-safe.

---

## Keyboard navigation

- Every interactive element must be reachable with Tab.
- Tab order must follow visual order (left-to-right, top-to-bottom).
- Focus must be visible: use Tailwind's `focus-visible:ring-2 focus-visible:ring-ring` (shadcn/ui default).
- Do not remove focus outlines with `outline-none` without adding an alternative visible focus style.
- Dialogs, sheets, and popovers must trap focus inside when open.
- Escape key must close any open overlay (dialog, sheet, popover, dropdown).
- Enter or Space must activate buttons and links.

---

## ARIA labels

- Every icon-only button must have `aria-label`:
  ```tsx
  <Button size="icon" aria-label="Delete user">
    <Trash2 className="h-4 w-4" />
  </Button>
  ```
- Form inputs must be linked to their label via `htmlFor`/`id`:
  ```tsx
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  ```
- Error messages must be linked to their input with `aria-describedby`:
  ```tsx
  <Input id="email" aria-describedby="email-error" />
  <p id="email-error" className="text-xs text-destructive">Invalid email</p>
  ```
- Decorative icons (not conveying information) must have `aria-hidden="true"`.
- Use `role="alert"` for error messages that appear dynamically.

---

## Screen readers

- Page titles must be unique and descriptive (set via `document.title` or a title component).
- Headings must follow hierarchy: one `h1` per page, then `h2`, `h3` in order. Do not skip levels.
- Tables must use `<thead>` and `<th>` for column headers.
- Live regions: toast notifications should use `role="status"` or `aria-live="polite"`.
- Navigation landmarks: use `<nav>`, `<main>`, `<header>`, `<aside>` for the app shell.

---

## Forms

- Every input must have a visible label. Do not rely on placeholder as the only label.
- Required fields must indicate it: add `*` to the label or use `aria-required="true"`.
- Error messages must appear immediately adjacent to the field, not only at the top of the form.
- Submit buttons must not be disabled as the primary validation pattern (see screen-design-guide).

---

## Checklist for every screen

- [ ] All text passes AA contrast ratio.
- [ ] Color is not the only state indicator.
- [ ] Every interactive element reachable by Tab.
- [ ] Focus is visible on all interactive elements.
- [ ] Icon-only buttons have `aria-label`.
- [ ] Form inputs linked to labels (`htmlFor`/`id`).
- [ ] Error messages linked to inputs (`aria-describedby`).
- [ ] One `h1` per page, heading hierarchy respected.
- [ ] Semantic landmarks used (`nav`, `main`, `aside`, `header`).
- [ ] Escape closes overlays.

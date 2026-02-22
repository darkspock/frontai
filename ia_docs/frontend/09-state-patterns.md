# UI state patterns

Every screen must handle 4 states: loading, empty, error, success. This doc defines how each state looks and behaves so implementations are consistent.

---

## Loading state

Used while data is being fetched. Never show a blank screen.

### Page-level loading

```tsx
<div className="flex items-center justify-center min-h-[400px]">
  <div className="flex flex-col items-center gap-3">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-muted border-t-primary" />
    <p className="text-sm text-muted-foreground">Loading...</p>
  </div>
</div>
```

### Inline loading (inside a card or section)

```tsx
<div className="flex items-center gap-2 p-4">
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-muted border-t-primary" />
  <span className="text-sm text-muted-foreground">Loading...</span>
</div>
```

### Button loading

```tsx
<Button disabled>
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-muted border-t-current mr-2" />
  Saving...
</Button>
```

### Rules

- Spinner: `border-2 border-muted border-t-primary` with `animate-spin`. No third-party spinners.
- Always include a text label next to the spinner (except inside buttons where space is limited).
- Page-level loading: vertically centered with `min-h-[400px]`.
- Skeleton loaders: optional for lists/tables when the shape of the content is known.

---

## Empty state

Used when there is no data to show. Always provides a path forward.

### Standard empty state

```tsx
<div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
  <div className="rounded-full bg-muted p-4 mb-4">
    <InboxIcon className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold mb-1">No users yet</h3>
  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
    Create your first user to get started.
  </p>
  <Button>
    <Plus className="h-4 w-4 mr-2" />
    Add user
  </Button>
</div>
```

### Rules

- Icon: Lucide icon inside a `rounded-full bg-muted p-4` circle.
- Title: short, specific to the entity ("No users yet", not "No data").
- Description: one sentence, explains what to do next.
- CTA button: always present. Uses the same primary action as the page header.
- Centered vertically with `min-h-[300px]`.

---

## Error state

Used when an operation fails. Must always be actionable.

### Page-level error (API call failed, data could not load)

```tsx
<div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
  <div className="rounded-full bg-destructive/15 p-4 mb-4">
    <AlertTriangle className="h-8 w-8 text-destructive" />
  </div>
  <h3 className="text-lg font-semibold mb-1">Failed to load users</h3>
  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
    Something went wrong. Please try again.
  </p>
  <Button variant="outline" onClick={refetch}>
    Try again
  </Button>
</div>
```

### Inline error (form submission, validation)

```tsx
<div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
  {errorMessage}
</div>
```

### Field-level error

```tsx
<div className="space-y-1">
  <Label htmlFor="email" className="text-destructive">Email</Label>
  <Input id="email" className="border-destructive" />
  <p className="text-xs text-destructive">Invalid email format</p>
</div>
```

### Toast error (background operation failed)

```tsx
toast({
  title: "Failed to save",
  description: extractApiError(error),
  variant: "destructive",
});
```

### Rules

- Page-level: same layout as empty state but with `AlertTriangle` icon and destructive colors. Always include a "Try again" button.
- Inline: `bg-destructive/15 text-destructive rounded-md p-3`. Placed above the form or section that failed.
- Field-level: red border on input + error text below. Label also turns red.
- Toast: for operations that happen in the background (auto-save, delete).
- Always extract and show API error messages (never show generic "Something went wrong" when the API returned a specific message).

---

## Success state

Used to confirm a completed action. Transient — not a permanent screen.

### Toast (default for most actions)

```tsx
toast({
  title: "User created",
  description: "The user has been added successfully.",
});
```

### Inline success (after form submission, before redirect)

```tsx
<div className="bg-green-50 text-green-700 border border-green-200 text-sm p-3 rounded-md">
  Changes saved successfully.
</div>
```

### Rules

- Default: use toast. It disappears automatically.
- Inline success: only when the user stays on the same page after the action.
- Never use a success page/screen for simple CRUD operations.
- After create/edit: redirect to the list or detail view + toast.
- After delete: return to the list + toast.

---

## Decision table

| Scenario | State pattern |
|---|---|
| Page loading data from API | Page-level loading |
| Section loading inside a page | Inline loading |
| Button performing an action | Button loading |
| No data exists yet | Empty state with CTA |
| API call failed on page load | Page-level error with retry |
| Form submission failed | Inline error above form |
| Field validation failed | Field-level error |
| Background operation failed | Toast error |
| CRUD action succeeded | Toast success + redirect |
| Save without navigation | Inline success |

# Feature: [Feature name]

## 1. Objective
<!-- One sentence: what does this feature do and why. -->


## 2. Target user
<!-- Who uses this feature. Role, context, goal. -->


## 3. User journeys
<!-- Step-by-step flows from the user's perspective. One flow per bullet list. -->

**Main flow:**
1.
2.
3.

**Alternative flows:**
-

**Error flows:**
-

## 4. Screens and states
<!-- List each screen involved. For each one, list its required states. -->

| Screen | States required |
|--------|-----------------|
|        | loading / empty / error / success |

## 5. API contracts
<!-- For each endpoint used: method, path, request body, response structure, error codes. -->

### [Endpoint name]
- **Method + path:** `POST /api/v1/...`
- **Request:**
  ```json
  {}
  ```
- **Response:**
  ```json
  {}
  ```
- **Errors:** `400`, `401`, `422`, ...

## 6. Data types
<!-- TypeScript types or interfaces for the data this feature works with. -->

```typescript

```

## 7. Validation rules
<!-- Form fields and business rules. Format: field — rule. -->

- `field`: required, min length X, ...

## 8. Error cases
<!-- What can go wrong and how the UI should handle each case. -->

| Error | UI response |
|-------|-------------|
|       |             |

## 9. Navigation and routing
<!-- Routes involved, redirects, protected routes. -->

- Route: `/...`
- After success: redirect to `...`
- Auth required: yes / no

## 10. UI layout
<!-- Text description of how each screen is organized. Describe layout structure, key components, columns, action placement. Reference patterns from ia_docs/frontend/08-layout-shell.md and ia_docs/frontend/09-state-patterns.md. -->

### [Screen name]
- **Layout:** (e.g., page header + filter bar + data table)
- **Key components:** (e.g., DataTable, Button, Dialog)
- **Columns / fields:** (e.g., Name, Email, Role, Actions)
- **Primary action:** (e.g., "Add user" button top-right)
- **Secondary actions:** (e.g., edit/delete per row)

## 11. Out of scope
<!-- Explicitly list what this spec does NOT cover. -->

-

---

**Status:** draft / validated / implemented

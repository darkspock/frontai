# Tasks: [Feature name]

> Generated from `spec.md` after validation. Execute in order, one task at a time.

**Status:** in-progress / completed

---

## Tasks

- [ ] 1. [Task description — what to do and where]
- [ ] 2. [Task description]
- [ ] 3. [Task description]

---

## Task format reference

Each task should be:
- **Atomic** — one clear action (create a component, add a route, call an endpoint, etc.)
- **Ordered** — dependencies respected (types before hooks, hooks before components, components before pages)
- **Verifiable** — it is obvious when it is done

Suggested order for a typical feature:
1. Define TypeScript types for the feature data
2. Create the API service function(s)
3. Create the custom hook(s) with TanStack Query
4. Build the UI components (from smallest to largest)
5. Assemble the page/screen
6. Add the route and navigation
7. Handle all UI states (loading / empty / error / success)
8. Validate forms and error messages
9. Run lint + typecheck + build
10. Manual smoke test of the full user journey

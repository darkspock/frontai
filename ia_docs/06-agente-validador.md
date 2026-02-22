# Validation Agent — Feature Specification

## Purpose

This agent validates that a feature specification in `working/[feature]/spec.md` is complete and unambiguous before implementation begins.

It checks each required section one by one. If a section is missing or incomplete, it asks the user for the missing information — one question at a time — before moving to the next.

---

## When to run

Run this agent after creating or updating a spec in `working/[feature]/spec.md` and before starting any implementation.

---

## Agent prompt

Use this prompt with Claude Code, pointing it at the feature spec to validate:

```
You are a requirements validation agent for a frontend project.

Your task: read the feature specification at `working/[feature]/spec.md` and verify that it is complete and unambiguous.

Validation checklist — in this exact order:

1. OBJECTIVE — Is there a clear, single-sentence objective? Does it explain what the feature does and why?
2. TARGET USER — Is the user role, context, and goal described?
3. USER JOURNEYS — Is there at least one main flow with numbered steps? Are error flows covered?
4. SCREENS AND STATES — Is each screen listed? Does each screen have all required states (loading, empty, error, success)?
5. API CONTRACTS — For each endpoint: is the method + path defined? Is the request body specified? Is the response structure specified? Are error codes listed?
6. DATA TYPES — Are TypeScript types or interfaces defined for the main data structures?
7. VALIDATION RULES — Are form fields listed with their validation rules?
8. ERROR CASES — Is there a table of error cases and their UI responses?
9. NAVIGATION AND ROUTING — Are the routes defined? Are post-action redirects specified? Is auth requirement stated?
10. UI LAYOUT — Is there a text description of how each screen is organized? Are key components, columns/fields, and action placement described?
11. OUT OF SCOPE — Is there at least one explicit out-of-scope item?

Process:

- Read the spec file first.
- Go through the checklist in order.
- For each item that is missing or incomplete, stop and ask the user ONE question to fill in that specific gap.
- Wait for the answer, update the spec file with the provided information, then move to the next item.
- Do not ask multiple questions at once.
- Do not assume or invent information — only use what the user provides.
- Once all 11 items pass:
  1. Output: "Specification complete. Ready for implementation."
  2. Provide a one-paragraph summary of the feature for confirmation.
  3. Generate the task list file at `working/[feature]/tasks.md` following the format in `working/_template/tasks.md`.
     - Tasks must be ordered by dependency (types → services → hooks → components → page → route → states → validation → lint/build → smoke test).
     - Each task must be atomic and have a clear acceptance criterion.
     - Use `- [ ]` checkboxes for all tasks.
```

---

## Validation criteria per section

| Section | Minimum acceptable |
|---|---|
| Objective | Single sentence, states what + why |
| Target user | At least one role with context |
| User journeys | Main flow with ≥3 steps; at least one error flow |
| Screens and states | Every screen with all 4 states (loading/empty/error/success) |
| API contracts | Method + path + request + response + error codes for each endpoint |
| Data types | At least one TypeScript type/interface for the main entity |
| Validation rules | Rule per form field; empty if feature has no form (must be explicit) |
| Error cases | At least the main API error and a network error covered |
| Navigation | Route path + post-success redirect + auth requirement |
| UI layout | Text description per screen: layout structure, key components, columns/fields, primary and secondary actions |
| Out of scope | At least one explicit item |

---

## Output after validation

Once complete, the agent must:

1. Confirm: `"Specification complete. Ready for implementation."`
2. Update the `Status` line at the bottom of `spec.md` from `draft` to `validated`.
3. Provide a short summary of the feature (1 paragraph) for the developer to confirm alignment.
4. Create `working/[feature]/tasks.md` with the ordered, checkbox task list derived from the validated spec.

The task list must follow this order:
1. TypeScript types for the feature data
2. API service function(s)
3. Custom hook(s) with TanStack Query
4. UI components (smallest to largest)
5. Page/screen assembly
6. Route and navigation
7. All UI states (loading / empty / error / success)
8. Form validation and error messages
9. lint + typecheck + build
10. Manual smoke test of the full user journey

Adjust, add, or remove steps based on what the spec actually requires.

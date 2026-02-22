# ADR (Architecture Decision Records)

## Como usar este archivo
- Registrar una decision por bloque.
- No borrar decisiones, solo marcarlas como reemplazadas si aplica.

## Plantilla ADR
### ADR-001 - Stack frontend
- Fecha: 2026-02-22
- Estado: aceptada
- Contexto: Base reutilizable, modern, perf, DX bueno con IA.
- Decisión: Vite+React+TS+Tailwind/shadcn+TanStack Query+React Router.
- Consecuencias: Bundle pequeño, type-safe API, theming fácil.
- Alternativas: Next.js (ssr innecesario), Remix (overkill).

### ADR-002 - Manejo estado servidor
- Fecha: 2026-02-22
- Estado: aceptada
- Contexto: API externa, cache/offline.
- Decisión: TanStack Query full (queries/mutations/infinite).
- Consecuencias: Estados auto (loading/error), devtools.
- Alternativas: SWR (menos features), Zustand (no cache).

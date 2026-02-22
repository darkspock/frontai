# Contexto del proyecto

## Objetivo tecnico
- Crear una base reutilizable para frontend de aplicaciones de gestion.

## Estado actual
- Estructura actual del frontend (mínima, proyecto en fase inicial):
  - src/main.tsx, src/App.tsx — entry point y root component
  - src/lib/utils.ts — utilidades base
  - src/components/ui/ — componentes shadcn/ui (button, card, input, badge, label)
  - src/index.css — estilos globales + Tailwind
- Estructura objetivo del frontend (a construir progresivamente):
  - src/app/ — rutas y layouts principales
  - src/components/ — componentes UI reutilizables (ui/, [Feature]/)
  - src/hooks/ — hooks personalizados
  - src/lib/ — utilidades (utils.ts, validators.ts)
  - src/services/ — adaptadores API
  - src/types/ — definiciones TypeScript
  - src/constants/ — constantes y configuración
- Stack principal:
  - Vite 5 + React 18 + TypeScript 5
  - Tailwind CSS 3 + shadcn/ui + lucide-react
  - React Router DOM v6
  - TanStack Query v5 (datos servidor)
  - Zod + react-hook-form (validación)
- Dependencias criticas:
  - react, react-dom
  - @tanstack/react-query
  - lucide-react
  - class-variance-authority (cva)
  - @hookform/resolvers (zod)

## Backend API
- **Platform:** Desk Support Monkey — IT Service Desk & Asset Inventory
- **Base URL (staging):** `https://staging.desksupportmonkey.com`
- **API prefix:** `/api/v1/`
- **Docs:** `https://staging.desksupportmonkey.com/docs` (Swagger UI)
- **Auth:** Bearer JWT (magic link + password login for admins)
- **~170 endpoints** across 24 domains (auth, companies, departments, users, assets, requests, dashboard, reports, vendors, purchase orders, shipments, appointments, maintenance, etc.)
- Full catalog: `ia_docs/frontend/12-api-catalog.md`
- Integration rules: `ia_docs/frontend/06-integracion-api-existente.md`

## Restricciones
- Restricciones de seguridad en cliente:
  - CSP estricto (sin eval, inline scripts)
  - No storage de secrets (solo tokens JWT en httpOnly si proxy)
  - Sanitización inputs con DOMPurify si HTML
- Restricciones de despliegue:
  - Build estático (Vite preview/build)
  - Vercel/Netlify friendly
  - Env vars prefix VITE_
- Restricciones de rendimiento UX:
  - Lazy loading rutas/componentes
  - Core Web Vitals >90th percentile
  - Queries cacheadas, optimistic updates
- Restricciones de contrato API (backend externo):
  - Autenticación JWT Bearer
  - Endpoints RESTful /api/v1/*
  - Paginación page/page_size, filtros query params
  - Errores validación: `{ detail: [{ loc, msg, type }] }` (FastAPI 422)

## Supuestos
- Backend REST API existe y estable (Swagger disponible en staging).
- Contratos API inmutables salvo notificación.
- Soporte autenticación JWT Bearer.
- Proyecto deployable en Vercel/Netlify sin server-side.

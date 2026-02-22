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
  - Paginación offset/limit, filtros query params
  - Errores estandarizados {error: msg, code: string}

## Supuestos
- Backend REST API existe y estable (docs Swagger/Postman disponibles).
- Contratos API inmutables salvo notificación.
- Soporte autenticación JWT.
- Proyecto deployable en Vercel/Netlify sin server-side.

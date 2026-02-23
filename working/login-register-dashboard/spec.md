# Feature: Login, Registro y Shell del Dashboard

## 1. Objetivo

Construir las paginas de autenticacion (login con magic link, registro de empresa) y el shell principal de la aplicacion (sidebar, header, placeholder de dashboard) para que la app tenga una estructura navegable. Sin llamadas API reales — todos los datos son mock o estaticos. Esto sirve como base para todas las pantallas futuras.

## 2. Usuario objetivo

- **Cualquier usuario** que llega a la app por primera vez — necesita iniciar sesion o registrar su empresa.
- **Admin/Tecnico/Empleado** — una vez "logueado," ve el shell de la app con navegacion de sidebar y una pagina de inicio del dashboard.

## 3. Journeys de usuario

**Flujo principal — Login con magic link:**
1. El usuario abre la app y llega a `/auth/login`.
2. El usuario ingresa su email y hace clic en "Enviar magic link."
3. La UI muestra un mensaje de confirmacion: "Revisa tu email para el enlace de login."
4. (En un flujo real, el usuario hace clic en el enlace de su email y llega a `/auth/verify?token=...`.)
5. Para la demo: hacer clic en el mensaje de confirmacion o un boton "Continuar" navega directamente al dashboard.

**Flujo alternativo — Registro de empresa:**
1. El usuario hace clic en el enlace "Registra tu empresa" en la pagina de login.
2. El usuario es llevado a `/auth/register`.
3. El usuario completa: nombre de empresa, email de admin, dominio de email.
4. La UI muestra mensaje de exito: "Empresa registrada. Revisa tu email."
5. Un enlace "Volver al login" regresa a `/auth/login`.

**Flujo alternativo — Ya autenticado:**
1. El usuario abre la app con un token mock presente.
2. La app redirige desde `/` a la ruta por defecto segun el rol (`/dashboard` para admin).

**Flujos de error:**
- Campo de email vacio: validacion inline "El email es requerido."
- Formato de email invalido: validacion inline "Ingresa un email valido."
- Campos requeridos vacios en formulario de registro: validacion inline por campo.

## 4. Pantallas y estados

| Pantalla | Estados requeridos |
|----------|-------------------|
| Pagina de login (`/auth/login`) | default / enviando (boton loading) / enviado (mensaje de exito) / error de validacion |
| Pagina de registro (`/auth/register`) | default / enviando (boton loading) / exito / error de validacion |
| Dashboard (`/dashboard`) | default (contenido mock estatico) / loading (N/A — datos estaticos) / empty (N/A — siempre tiene tarjetas mock) / error (N/A — sin llamadas API) / success (N/A) |
| Shell de la app (sidebar + header) | sidebar expandida (escritorio) / sidebar oculta (movil) / sidebar como sheet (movil abierto) |

## 5. Contratos de API

> **Nota:** Para este feature de demo, no se hacen llamadas API reales. Todas las interacciones son mock con `setTimeout` para simular latencia de red. Los contratos debajo documentan lo que la API real espera, como referencia.

### Solicitud de magic link
- **Metodo + path:** `POST /api/v1/auth/magic-link`
- **Request:**
  ```json
  { "email": "user@company.com" }
  ```
- **Response:**
  ```json
  { "data": { "message": "Magic link sent" } }
  ```
- **Errores:** `422` (validacion), `429` (limite de tasa)

### Registro de empresa
- **Metodo + path:** `POST /api/v1/register`
- **Request:**
  ```json
  {
    "name": "Acme Corp",
    "admin_email": "admin@acme.com",
    "email_domains": ["acme.com"]
  }
  ```
- **Response:**
  ```json
  { "data": { "id": "...", "name": "Acme Corp" } }
  ```
- **Errores:** `422` (validacion), `409` (dominio ya registrado)

### Usuario actual
- **Metodo + path:** `GET /api/v1/auth/me`
- **Response:**
  ```json
  {
    "data": {
      "id": "...",
      "email": "admin@acme.com",
      "name": "Admin User",
      "role": "admin",
      "company_id": "...",
      "is_active": true
    }
  }
  ```
- **Errores:** `401` (no autenticado)

## 6. Tipos de datos

```typescript
// Usuario devuelto por /auth/me
interface User {
  id: string;
  email: string;
  name: string | null;
  role: 'super_admin' | 'admin' | 'technician' | 'employee';
  company_id: string;
  is_active: boolean;
}

// Estado de autenticacion en contexto
interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

// Solicitud de magic link
interface MagicLinkRequest {
  email: string;
}

// Solicitud de registro
interface RegisterCompanyRequest {
  name: string;
  admin_email: string;
  email_domains: string[];
}
```

## 7. Reglas de validacion

### Formulario de login
- `email`: requerido, debe ser formato email valido.

### Formulario de registro
- `name`: requerido, longitud minima 2.
- `admin_email`: requerido, debe ser formato email valido.
- `email_domains`: requerido, al menos un dominio, cada uno debe ser un dominio valido (ej. `acme.com`).

## 8. Casos de error

| Error | Respuesta en UI |
|-------|-----------------|
| Email vacio en login | Error a nivel de campo: "El email es requerido" |
| Formato de email invalido en login | Error a nivel de campo: "Ingresa un email valido" |
| Nombre de empresa vacio en registro | Error a nivel de campo: "El nombre de empresa es requerido" |
| Email de admin vacio en registro | Error a nivel de campo: "El email de admin es requerido" |
| Dominios de email vacios en registro | Error a nivel de campo: "Se requiere al menos un dominio" |
| Error de red (simulado) | Error toast: "Algo salio mal. Intenta de nuevo." |

## 9. Navegacion y rutas

### Rutas

| Path | Pagina | Autenticacion requerida | Roles |
|------|--------|------------------------|-------|
| `/auth/login` | Pagina de login | No | — |
| `/auth/register` | Pagina de registro | No | — |
| `/auth/verify` | Pagina de verificacion (placeholder) | No | — |
| `/` | Redirigir a ruta por defecto del rol | Si | Todos |
| `/dashboard` | Dashboard | Si | admin |
| `/my/equipment` | Pagina placeholder | Si | employee |
| `/requests` | Pagina placeholder | Si | technician |

### Rutas por defecto segun rol
- `admin` → `/dashboard`
- `technician` → `/requests`
- `employee` → `/my/equipment`

### Comportamiento del guard de autenticacion
- Usuario no autenticado accediendo a ruta protegida → redirigir a `/auth/login?returnTo={current_path}`.
- Usuario autenticado accediendo a ruta fuera de su rol → redirigir a su ruta por defecto.
- Usuario autenticado accediendo a `/auth/login` → redirigir a ruta por defecto del rol.

## 10. Layout de UI

### Pagina de login (`/auth/login`)
- **Layout:** Dos paneles (panel izquierdo de marca + panel derecho con formulario) en escritorio. Columna unica en movil.
- **Panel izquierdo (solo escritorio):** Fondo de color de marca, logo de app, texto de eslogan. Ocupa 50% del ancho.
- **Panel derecho:** Tarjeta de formulario centrada con max-width ~400px.
- **Componentes clave:** Input (email), Button (enviar), enlace a registro.
- **Accion primaria:** Boton "Enviar magic link".
- **Accion secundaria:** Enlace de texto "Registra tu empresa" debajo del formulario.

### Pagina de registro (`/auth/register`)
- **Layout:** Mismo layout de dos paneles que login.
- **Panel derecho:** Formulario con 3 campos (nombre de empresa, email de admin, dominio de email).
- **Componentes clave:** Input (texto + email), Button (enviar), enlace volver a login.
- **Accion primaria:** Boton "Registrar".
- **Accion secundaria:** Enlace de texto "Volver al login".

### Shell de la app (wrapper de layout)
- **Layout:** Sidebar (izquierda, 256px escritorio / oculta en movil) + Header (arriba, 64px sticky) + Area de contenido (espacio restante).
- **Sidebar:** Enlaces de navegacion agrupados por seccion. Cada enlace tiene icono (Lucide) + etiqueta. Enlace activo resaltado. Logo/nombre de app en la parte superior.
- **Header:** Menu hamburguesa (movil) a la izquierda, avatar de usuario + dropdown de nombre a la derecha.
- **Area de contenido:** `max-w-7xl mx-auto p-6`. Renderiza ruta hija via `<Outlet />`.

### Dashboard (`/dashboard`)
- **Layout:** Encabezado de pagina (titulo "Dashboard") + grid de tarjetas placeholder.
- **Componentes clave:** 4 tarjetas de estadisticas en fila (numeros mock), placeholders de graficos vacios debajo.
- **Columnas:** Grid de 4 columnas en escritorio, 2 en tablet, 1 en movil.
- **Accion primaria:** Ninguna (pagina de solo lectura).

### Elementos de navegacion de sidebar (para demo)

| Seccion | Etiqueta | Icono | Ruta | Roles |
|---------|----------|-------|------|-------|
| Mi Actividad | Mi Equipo | `Monitor` | `/my/equipment` | employee |
| Mi Actividad | Mis Solicitudes | `MessageSquare` | `/my/requests` | employee |
| Operaciones | Dashboard | `LayoutDashboard` | `/dashboard` | admin |
| Operaciones | Solicitudes | `Inbox` | `/requests` | technician, admin |
| Operaciones | Activos | `HardDrive` | `/assets` | technician, admin |
| Gestion | Usuarios | `Users` | `/users` | admin |
| Gestion | Departamentos | `Building2` | `/departments` | admin |
| Gestion | Configuracion | `Settings` | `/settings` | admin |

## 11. Fuera de alcance

- Integracion API real (todas las llamadas son mock con `setTimeout`).
- Flujo de login con contraseña.
- Botones de OAuth Google/Microsoft.
- Flujo de verificacion de token (`/auth/verify` es solo un placeholder).
- Widgets funcionales de dashboard con datos reales.
- WebSocket / notificaciones en tiempo real.
- i18n (solo español para este feature).
- Todas las paginas mas alla de login, registro y shell del dashboard (muestran placeholder "Proximamente").

---

## Referencia de implementacion (ingenieria inversa desde DSM)

> Esta seccion documenta como el frontend original de DeskSupportMonkey implementa estos patrones, como referencia educativa.

### Patron de contexto de autenticacion (DSM: `src/contexts/AuthContext.tsx`)
- `AuthProvider` envuelve toda la app.
- Estado: `{ user, token, loading }`.
- Al montar: lee token de `localStorage`, llama `GET /auth/me` para hidratar usuario.
- `login(token)`: guarda en localStorage, obtiene usuario.
- `logout()`: elimina token, limpia usuario.
- `isRole(...roles)`: verifica rol del usuario actual.
- Escucha eventos `401` del interceptor de Axios para auto-logout.

### Patron de guard de rutas (DSM: `src/components/auth/RequireRole.tsx`)
- Envuelve elementos de ruta: `<RequireRole roles={['admin']}><Page /></RequireRole>`.
- Sin usuario → redirigir a `/auth/login?returnTo=...`.
- Usuario con rol incorrecto → redirigir a `getDefaultRouteForRole(user.role)`.

### Patron de shell de app (DSM: `src/components/layout/AppLayout.tsx`)
- Renderiza `<Sidebar>` + `<Header>` + `<main><Outlet /></main>`.
- Movil: sidebar como overlay (estado gestionado por `mobileNavOpen`).
- Fuerza establecimiento de contraseña para staff sin contraseña.
- Redirige `/` a ruta por defecto del rol.

### Patron de pagina de login (DSM: `src/pages/auth/LoginPage.tsx`)
- Layout de dos paneles via wrapper `AuthShell`.
- `LoginMode` alterna entre magic-link y contraseña.
- En magic link: `api.post('/auth/magic-link', { email })` → muestra mensaje "revisa tu email".
- En contraseña: `api.post('/auth/login', { email, password })` → `login(token)` → navegar.
- Ya autenticado → redirigir a ruta por defecto del rol.

### Patron de cliente API (DSM: `src/lib/api.ts`)
- Instancia Axios con `baseURL: '/api/v1'`.
- Interceptor de request: adjunta `Authorization: Bearer {token}`.
- Interceptor de response: normaliza mensajes de error, maneja 401 (limpia token, redirige a login).
- Proxy de Vite: `/api` → `http://localhost:8001`.

### Patron de sidebar (DSM: `src/components/layout/Sidebar.tsx`)
- Escritorio: `w-56 hidden md:flex md:flex-col`, siempre visible.
- Movil: `fixed inset-0 z-40 md:hidden`, overlay con backdrop.
- Items de navegacion agrupados en secciones colapsables.
- La ruta activa auto-expande su seccion.
- Items filtrados por `user.role`.

### CSS / Theming (DSM: `src/index.css`)
- Tailwind CSS con tokens de diseño como propiedades CSS custom en `:root`.
- Espacio de color OKLCH para todos los colores.
- Sidebar tiene sus propios tokens oscuros.

---

**Status:** validated

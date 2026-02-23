# Tareas: User List with Add and Edit

Feature: `working/user-list/spec.md`

---

## Fundaciones (tipos, contratos y servicios)

- [ ] **T01 — Definir tipos del feature en `src/types/users.ts`**
  Crear `User`, `UserRole`, `Department`, `EmployeeRole`, `InviteUserRequest`, `UpdateUserRequest`, `ListUsersParams` y `PaginatedResponse<T>` alineados con la spec.
  _Criterio de aceptacion: tipos reutilizables, sin `any`, compilacion TypeScript limpia._

- [ ] **T02 — Definir mapeos y constantes de UI del feature**
  Crear constantes para opciones de rol, labels legibles y variantes visuales de badges (rol y estado) en `src/constants/users.ts`.
  _Criterio de aceptacion: roles y estados no estan hardcodeados dentro de componentes._

- [ ] **T03 — Crear schemas Zod de formularios**
  Crear `inviteUserSchema` y `editUserSchema` en `src/lib/validators/users.ts` con reglas: email requerido y valido, nombre opcional con min 2, rol requerido.
  _Criterio de aceptacion: validaciones de spec implementadas y mensajes de error en español._

- [ ] **T04 — Implementar servicio de usuarios**
  Crear `src/services/users.service.ts` con funciones `listUsers`, `inviteUser`, `updateUser`, `activateUser`, `deactivateUser`.
  _Criterio de aceptacion: todas las funciones llaman endpoints `/api/v1/users*` con contratos correctos._

- [ ] **T05 — Implementar servicios auxiliares para selects**
  Agregar funciones `listDepartments` y `listEmployeeRoles` (page_size=100) en `src/services/catalogs.service.ts`.
  _Criterio de aceptacion: dropdowns de departamento y employee role pueden poblarse desde API._

---

## Estado de servidor (TanStack Query)

- [ ] **T06 — Definir query keys del modulo**
  Crear llaves en `src/services/query-keys.ts` para usuarios, departamentos y employee roles.
  _Criterio de aceptacion: llaves centralizadas y consistentes para fetch e invalidaciones._

- [ ] **T07 — Crear hook `useUsersList`**
  Crear `src/hooks/users/useUsersList.ts` con query por `page`, `pageSize`, `search`, `role`, `isActive`.
  _Criterio de aceptacion: cambios de filtros/paginacion disparan refetch con key estable._

- [ ] **T08 — Crear hook `useInviteUser`**
  Crear mutation en `src/hooks/users/useInviteUser.ts` con invalidacion de lista y manejo de errores `409`, `422`, red.
  _Criterio de aceptacion: al exito invalida lista; al error devuelve mensaje usable para modal/toast._

- [ ] **T09 — Crear hook `useUpdateUser`**
  Crear mutation en `src/hooks/users/useUpdateUser.ts` con invalidacion y manejo de `404`, `422`, red.
  _Criterio de aceptacion: mutation reutilizable por modal de edicion._

- [ ] **T10 — Crear hook `useToggleUserStatus`**
  Crear mutation en `src/hooks/users/useToggleUserStatus.ts` que elija activate/deactivate segun `is_active`.
  _Criterio de aceptacion: endpoint correcto segun estado actual, invalidacion de lista al exito._

- [ ] **T11 — Crear hooks de catalogos**
  Crear `useDepartments` y `useEmployeeRoles` para cargar opciones de selects con cache adecuada.
  _Criterio de aceptacion: modal de edicion abre con opciones disponibles sin llamadas duplicadas innecesarias._

---

## Componentes de presentacion

- [ ] **T12 — Crear `UserRoleBadge`**
  Componente en `src/components/Users/UserRoleBadge.tsx` para mostrar rol con etiqueta amigable.
  _Criterio de aceptacion: todos los roles soportados muestran badge consistente._

- [ ] **T13 — Crear `UserStatusBadge`**
  Componente en `src/components/Users/UserStatusBadge.tsx` para `Active`/`Inactive`.
  _Criterio de aceptacion: variantes visuales diferenciadas y texto correcto._

- [ ] **T14 — Crear barra de filtros `UsersFilters`**
  Componente en `src/components/Users/UsersFilters.tsx` con search + role filter y layout responsive.
  _Criterio de aceptacion: en mobile se apila verticalmente; en desktop se muestra en fila._

- [ ] **T15 — Crear tabla `UsersTable`**
  Componente en `src/components/Users/UsersTable.tsx` con columnas de spec y acciones por fila (editar + activar/desactivar).
  _Criterio de aceptacion: columna Department oculta en mobile (`md`+ visible), acciones funcionales via callbacks._

- [ ] **T16 — Crear paginacion `UsersPagination`**
  Componente en `src/components/Users/UsersPagination.tsx` con Previous/Next y calculo de total pages.
  _Criterio de aceptacion: respeta `page`, `page_size`, `total` de `meta`._

---

## Modales y dialogos

- [ ] **T17 — Crear modal `InviteUserModal`**
  Componente en `src/components/Users/InviteUserModal.tsx` con `react-hook-form` + Zod, campos email/name/role y error inline.
  _Criterio de aceptacion: estados default/submitting/validation error/API error implementados._

- [ ] **T18 — Crear modal `EditUserModal`**
  Componente en `src/components/Users/EditUserModal.tsx` con prefill de usuario y campos name/role/department/employee role.
  _Criterio de aceptacion: mapea `""` a `null` para "Unassigned" en `department_id` y `employee_role_id`._

- [ ] **T19 — Crear dialogo de confirmacion para activar/desactivar**
  Componente en `src/components/Users/UserStatusConfirmDialog.tsx` con texto dinamico por accion.
  _Criterio de aceptacion: muestra copy de confirmacion correcta e indica loading en boton de confirm._

---

## Pagina y routing

- [ ] **T20 — Implementar `UsersPage`**
  Crear `src/pages/admin/UsersPage.tsx` ensamblando header, filtros, tabla, paginacion, modales y dialogo.
  _Criterio de aceptacion: flujo principal y alternativos (invite/edit/toggle) operativos en una sola pantalla._

- [ ] **T21 — Manejar estados de pantalla requeridos**
  Implementar en `UsersPage`: `loading`, `empty`, `error`, `success` segun spec.
  _Criterio de aceptacion: estado empty solo cuando no hay usuarios sin filtros; con filtros sin resultados mostrar estado de "sin resultados" en tabla._

- [ ] **T22 — Reemplazar placeholder de ruta `/users`**
  Actualizar `src/router.tsx` para usar `UsersPage` en lugar de `PlaceholderPage`.
  _Criterio de aceptacion: navegar a `/users` renderiza la pantalla real._

- [ ] **T23 — Verificar permisos de acceso**
  Confirmar que la ruta `/users` queda protegida para roles `admin` y `super_admin`.
  _Criterio de aceptacion: no autenticado redirige a `/auth/login?returnTo=/users`; rol no autorizado redirige a su ruta default._

---

## UX, errores y calidad

- [ ] **T24 — Integrar toasts y mensajes de error**
  Asegurar mensajes de exito/error de spec para invite, update y toggle, incluyendo fallback de red.
  _Criterio de aceptacion: mensajes visibles y consistentes en todos los flujos de error definidos._

- [ ] **T25 — Ajustes de accesibilidad basicos**
  Verificar labels, foco inicial en modales, cierre por `Escape`, y estados `aria` en botones con loading.
  _Criterio de aceptacion: formularios y dialogos son usables por teclado._

- [ ] **T26 — Validar comportamiento responsive**
  Revisar mobile/tablet/desktop para header, filtros, tabla y modales.
  _Criterio de aceptacion: no hay overflow horizontal y la columna Department se comporta como define la spec._

- [ ] **T27 — Ejecutar validacion tecnica**
  Ejecutar `npm run lint`, `npm run typecheck`, `npm run build` y corregir issues.
  _Criterio de aceptacion: los 3 comandos finalizan sin errores._

- [ ] **T28 — Smoke test manual del journey**
  Probar fin a fin: listar, filtrar, buscar, invitar, editar, activar/desactivar y reintentos de error.
  _Criterio de aceptacion: todos los journeys de la spec funcionan de extremo a extremo._

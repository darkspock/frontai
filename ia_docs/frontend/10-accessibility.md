# Línea base de accesibilidad

Requisitos mínimos de accesibilidad para cada pantalla. Esto no es una auditoría WCAG completa — cubre las reglas que más comúnmente fallan en aplicaciones de gestión.

---

## Contraste de color

- Todo el texto debe cumplir con la relación de contraste WCAG AA:
  - Texto normal (< 18px): mínimo **4.5:1**.
  - Texto grande (>= 18px bold o >= 24px): mínimo **3:1**.
- No usar color como único indicador de estado. Emparejar con un icono, texto o borde.
  - Malo: un punto rojo solo para indicar error.
  - Bueno: un punto rojo + la palabra "Error" o un icono `AlertTriangle`.
- Usar tokens de color semánticos de `07-design-tokens.md` — ya son seguros en contraste.

---

## Navegación por teclado

- Cada elemento interactivo debe ser alcanzable con Tab.
- El orden de Tab debe seguir el orden visual (izquierda-a-derecha, arriba-a-abajo).
- El foco debe ser visible: usar `focus-visible:ring-2 focus-visible:ring-ring` de Tailwind (por defecto shadcn/ui).
- No remover contornos de foco con `outline-none` sin añadir un estilo de foco visible alternativo.
- Los diálogos, sheets y popovers deben atrapar el foco dentro cuando están abiertos.
- La tecla Escape debe cerrar cualquier overlay abierto (diálogo, sheet, popover, dropdown).
- Enter o Space deben activar botones y enlaces.

---

## Etiquetas ARIA

- Cada botón solo icono debe tener `aria-label`:
  ```tsx
  <Button size="icon" aria-label="Delete user">
    <Trash2 className="h-4 w-4" />
  </Button>
  ```
- Los inputs de formulario deben estar vinculados a su etiqueta vía `htmlFor`/`id`:
  ```tsx
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  ```
- Los mensajes de error deben estar vinculados a su input con `aria-describedby`:
  ```tsx
  <Input id="email" aria-describedby="email-error" />
  <p id="email-error" className="text-xs text-destructive">Invalid email</p>
  ```
- Los iconos decorativos (que no transmiten información) deben tener `aria-hidden="true"`.
- Usar `role="alert"` para mensajes de error que aparecen dinámicamente.

---

## Lectores de pantalla

- Los títulos de página deben ser únicos y descriptivos (establecidos vía `document.title` o un componente de título).
- Los encabezados deben seguir la jerarquía: un `h1` por página, luego `h2`, `h3` en orden. No saltar niveles.
- Las tablas deben usar `<thead>` y `<th>` para encabezados de columna.
- Regiones en vivo: las notificaciones toast deben usar `role="status"` o `aria-live="polite"`.
- Puntos de referencia de navegación: usar `<nav>`, `<main>`, `<header>`, `<aside>` para el shell de la app.

---

## Formularios

- Cada input debe tener una etiqueta visible. No depender del placeholder como única etiqueta.
- Los campos requeridos deben indicarlo: añadir `*` a la etiqueta o usar `aria-required="true"`.
- Los mensajes de error deben aparecer inmediatamente adyacentes al campo, no solo en la parte superior del formulario.
- Los botones de envío no deben estar deshabilitados como patrón de validación principal (ver screen-design-guide).

---

## Checklist para cada pantalla

- [ ] Todo el texto cumple con la relación de contraste AA.
- [ ] El color no es el único indicador de estado.
- [ ] Cada elemento interactivo es alcanzable con Tab.
- [ ] El foco es visible en todos los elementos interactivos.
- [ ] Los botones solo icono tienen `aria-label`.
- [ ] Los inputs de formulario están vinculados a etiquetas (`htmlFor`/`id`).
- [ ] Los mensajes de error están vinculados a inputs (`aria-describedby`).
- [ ] Un `h1` por página, jerarquía de encabezados respetada.
- [ ] Se usan puntos de referencia semánticos (`nav`, `main`, `aside`, `header`).
- [ ] Escape cierra overlays.

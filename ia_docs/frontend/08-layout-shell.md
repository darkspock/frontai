# Shell de diseño y puntos de ruptura responsivos

Define el shell de la app (sidebar + header + área de contenido) y comportamiento responsivo en cada punto de ruptura.

---

## Estructura del shell de la app

```
┌──────────────────────────────────────────────┐
│                 Header (64px)                 │
├──────────┬───────────────────────────────────┤
│          │                                   │
│ Sidebar  │         Content area              │
│ (256px)  │     (max-w-7xl, p-6)              │
│          │                                   │
│          │                                   │
│          │                                   │
└──────────┴───────────────────────────────────┘
```

### Header

- Altura: `h-16` (64px).
- Fijo en la parte superior: `sticky top-0 z-50`.
- Contenidos: breadcrumb (izquierda), menú de usuario (derecha).
- Fondo: `bg-background border-b`.

### Sidebar

- Ancho expandido: `w-64` (256px).
- Ancho colapsado: `w-16` (64px).
- Fijo a la izquierda: `fixed left-0 top-16 bottom-0`.
- Fondo: `bg-muted/40 border-r`.
- Contenidos: enlaces de navegación con iconos Lucide.
- Disparador de colapso: botón de alternancia en la parte inferior de la sidebar.
- Estado colapsado: solo iconos, tooltip en hover para cada elemento.

### Área de contenido

- Offset: `ml-64` (o `ml-16` cuando sidebar está colapsada).
- Offset superior: `mt-16` para header fijo.
- Ancho máximo: `max-w-7xl mx-auto`.
- Padding: `p-6`.
- Fondo: `bg-background`.

---

## Layout de página dentro del área de contenido

Cada página sigue esta estructura:

```
┌─────────────────────────────────────┐
│ Page header                         │
│ ┌─────────────────────────────────┐ │
│ │ Breadcrumb                      │ │
│ │ Title + primary CTA (right)     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Page content                        │
│ ┌─────────────────────────────────┐ │
│ │ Sections with space-y-6         │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

- Encabezado de página: `mb-6`.
- Breadcrumb: `text-sm text-muted-foreground mb-2`.
- Título: `text-3xl font-bold`.
- CTA primaria: alineado a la derecha en la misma fila que el título.
- Secciones: separadas por `space-y-6`.

---

## Puntos de ruptura responsivos

Usando los puntos de ruptura por defecto de Tailwind:

| Punto de ruptura | Ancho mín | Nombre | Cambios de layout |
|---|---|---|---|
| Default | 0px | Móvil | Sidebar oculta. Menú hamburguesa en header. Contenido ancho completo. |
| `sm` | 640px | Móvil horizontal | Mismo que móvil. Ajustes de texto menores. |
| `md` | 768px | Tablet | Sidebar colapsada (64px, solo iconos). Contenido se ajusta. |
| `lg` | 1024px | Escritorio | Sidebar expandida (256px). Layout completo. |
| `xl` | 1280px | Escritorio ancho | Mismo que escritorio. Ancho máximo de contenido se aplica. |

### Móvil (< 768px)

- Sidebar: oculta por defecto. Abierta como un `Sheet` (panel deslizable) desde hamburguesa.
- Header: botón hamburguesa (izquierda), logo (centro), avatar de usuario (derecha).
- Contenido: `p-4` en lugar de `p-6`.
- Tablas: cambiar a filas tipo tarjeta apiladas (cada fila se convierte en bloque compacto).
- Diálogos: pantalla completa (`DialogContent` con `max-w-full`).

### Tablet (768px – 1023px)

- Sidebar: colapsada (64px), solo iconos, tooltip en hover.
- Header: mismo que escritorio pero sin texto de breadcrumb (solo icono).
- Contenido: `ml-16 p-6`.
- Tablas: desplazamiento horizontal si es necesario, sin cambio de layout.

### Escritorio (>= 1024px)

- Layout completo como se define en la estructura del shell anterior.
- Sidebar: expandida (256px) con etiquetas de texto.
- Contenido: `ml-64 p-6 max-w-7xl`.

---

## Elementos de navegación de la sidebar

Estructura de navegación estándar:

| Etiqueta | Icono | Ruta |
|---|---|---|
| Dashboard | `LayoutDashboard` | `/` |
| Users | `Users` | `/users` |
| Settings | `Settings` | `/settings` |

Agregar elementos conforme se implementan las features. Mantener la lista corta (máximo 8 elementos de nivel superior).

---

## Reglas

- Nunca ocultar la CTA primaria en ningún punto de ruptura.
- El estado de sidebar (colapsado/expandido) persiste en localStorage.
- La sidebar móvil se cierra automáticamente después de la navegación.
- El área de contenido siempre tiene padding consistente — nunca cero.
- El header siempre es visible — nunca se desplaza hacia arriba.

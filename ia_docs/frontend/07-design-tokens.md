# Tokens de diseño

Valores concretos para este proyecto. Cada implementación debe usar estos tokens — no usar valores arbitrarios.

---

## Colores (semánticos)

Basados en el tema slate de shadcn/ui con variables CSS. Usa estas clases Tailwind, no valores hex crudos.

### Core

| Token | Uso | Clase Tailwind |
|---|---|---|
| Background | Fondo de página | `bg-background` |
| Foreground | Texto por defecto | `text-foreground` |
| Primary | Botones de acción, enlaces, estados activos | `bg-primary`, `text-primary` |
| Secondary | Botones con menos énfasis | `bg-secondary`, `text-secondary-foreground` |
| Muted | Deshabilitado, placeholders, fondos sutiles | `bg-muted`, `text-muted-foreground` |
| Accent | Estados hover, destacados | `bg-accent`, `text-accent-foreground` |
| Destructive | Errores, acciones de eliminación | `bg-destructive`, `text-destructive` |

### Colores de estado

| Estado | Fondo | Texto | Borde |
|---|---|---|---|
| Success | `bg-green-50` | `text-green-700` | `border-green-200` |
| Warning | `bg-amber-50` | `text-amber-700` | `border-amber-200` |
| Error | `bg-destructive/15` | `text-destructive` | `border-destructive/30` |
| Info | `bg-blue-50` | `text-blue-700` | `border-blue-200` |

### Reglas de uso

- Nunca usar colores hex crudos en componentes.
- Usar tokens semánticos (`bg-primary`) sobre colores literales (`bg-blue-600`).
- Los colores de estado siguen la tabla anterior — sin variaciones por pantalla.
- Se permiten modificadores de opacidad: `bg-destructive/15`, `bg-primary/10`.

---

## Tipografía

Una sola familia de fuentes: sistema por defecto (Tailwind's `font-sans`). Sin fuentes personalizadas en v1.

| Nivel | Clases Tailwind | Tamaño | Usar para |
|---|---|---|---|
| H1 | `text-3xl font-bold` | 30px | Títulos de página |
| H2 | `text-2xl font-semibold` | 24px | Encabezados de sección |
| H3 | `text-xl font-semibold` | 20px | Títulos de tarjeta, subsecciones |
| H4 | `text-lg font-medium` | 18px | Encabezados de grupo |
| Body | `text-base` | 16px | Texto por defecto |
| Small | `text-sm` | 14px | Celdas de tabla, texto secundario, texto de ayuda |
| Caption | `text-xs` | 12px | Badges, timestamps, metadatos |

### Reglas

- Máximo 2 pesos de fuente por pantalla (regular + semibold o bold).
- Altura de línea: usar valores por defecto de Tailwind (ya establecidos por tamaño).
- No usar `text-lg` para texto de cuerpo — reservarlo para encabezados.
- Texto muted: siempre combinar con `text-muted-foreground`, nunca valores gray crudos.

---

## Espaciado

Usa solo la escala de espaciado de Tailwind. Estos son los valores permitidos:

| Token | Valor | Uso común |
|---|---|---|
| `1` | 4px | Espacios ajustados (icono-a-texto) |
| `2` | 8px | Espaciado inline, espacios pequeños |
| `3` | 12px | Padding interno de campo de formulario |
| `4` | 16px | Padding y espacios estándar |
| `6` | 24px | Separación de sección |
| `8` | 32px | Espacios entre secciones grandes |
| `12` | 48px | Ritmo vertical de página |
| `16` | 64px | Separación grande (arriba/abajo de página) |

### Reglas

- Dentro de un grupo: espaciado más pequeño (`gap-2`, `space-y-2`).
- Entre grupos: espaciado más grande (`gap-6`, `space-y-6`).
- Padding de contenido de página: `p-6` (24px).
- Padding interno de tarjeta: `p-4` (16px) o `p-6` (24px).
- Sin valores arbitrarios como `p-[17px]` o `mt-[23px]`.

---

## Bordes redondeados

| Token | Valor | Usar para |
|---|---|---|
| `rounded-md` | 6px | Por defecto (botones, inputs, badges) |
| `rounded-lg` | 8px | Tarjetas, diálogos, sheets |
| `rounded-xl` | 12px | Contenedores grandes (raro) |
| `rounded-full` | 9999px | Avatares, badges circulares, pills |

No usar `rounded-sm` o `rounded` (4px) — demasiado sutil. Por defecto es `rounded-md`.

---

## Sombras

| Token | Usar para |
|---|---|
| `shadow-sm` | Elevación sutil (dropdowns, popovers) |
| `shadow` | Tarjetas y paneles |
| `shadow-md` | Elementos elevados (diálogos, sheets) |
| `shadow-lg` | Elementos flotantes (modales) |

### Reglas

- La mayoría de elementos UI no tienen sombra (plano con borde).
- Las tarjetas usan `shadow` o `border` — no ambos a menos que sea intencional.
- Los diálogos y sheets siempre usan `shadow-lg`.

---

## Modo oscuro

**No soportado en v1.** Esta es una decisión explícita.

- No añadir variantes `dark:` a ningún componente.
- No implementar cambio de tema.
- Diseñar solo para modo claro.
- Si el modo oscuro se añade después, será un ADR separado y una tarea dedicada.

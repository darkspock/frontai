# Patrones de estado de UI

Cada pantalla debe manejar 4 estados: loading, empty, error, success. Este documento define cómo se ve y se comporta cada estado para que las implementaciones sean consistentes.

---

## Estado de carga

Se usa mientras se están recuperando los datos. Nunca mostrar una pantalla en blanco.

### Carga a nivel de página

```tsx
<div className="flex items-center justify-center min-h-[400px]">
  <div className="flex flex-col items-center gap-3">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-muted border-t-primary" />
    <p className="text-sm text-muted-foreground">Loading...</p>
  </div>
</div>
```

### Carga inline (dentro de una tarjeta o sección)

```tsx
<div className="flex items-center gap-2 p-4">
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-muted border-t-primary" />
  <span className="text-sm text-muted-foreground">Loading...</span>
</div>
```

### Carga de botón

```tsx
<Button disabled>
  <div className="animate-spin rounded-full h-4 w-4 border-2 border-muted border-t-current mr-2" />
  Saving...
</Button>
```

### Reglas

- Spinner: `border-2 border-muted border-t-primary` con `animate-spin`. Sin spinners de terceros.
- Siempre incluir una etiqueta de texto junto al spinner (excepto dentro de botones donde el espacio es limitado).
- Carga a nivel de página: centrada verticalmente con `min-h-[400px]`.
- Skeleton loaders: opcional para listas/tablas cuando se conoce la forma del contenido.

---

## Estado vacío

Se usa cuando no hay datos que mostrar. Siempre proporciona un camino a seguir.

### Estado vacío estándar

```tsx
<div className="flex flex-col items-center justify-center min-h-[300px] text-center p-6">
  <div className="rounded-full bg-muted p-4 mb-4">
    <InboxIcon className="h-8 w-8 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold mb-1">No users yet</h3>
  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
    Create your first user to get started.
  </p>
  <Button>
    <Plus className="h-4 w-4 mr-2" />
    Add user
  </Button>
</div>
```

### Reglas

- Icono: icono Lucide dentro de un círculo `rounded-full bg-muted p-4`.
- Título: corto, específico a la entidad ("No users yet", no "No data").
- Descripción: una oración, explica qué hacer a continuación.
- Botón CTA: siempre presente. Usa la misma acción primaria que el encabezado de página.
- Centrado verticalmente con `min-h-[300px]`.

---

## Estado de error

Se usa cuando una operación falla. Debe ser siempre procesable.

### Error a nivel de página (llamada API falló, datos no se pudieron cargar)

```tsx
<div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
  <div className="rounded-full bg-destructive/15 p-4 mb-4">
    <AlertTriangle className="h-8 w-8 text-destructive" />
  </div>
  <h3 className="text-lg font-semibold mb-1">Failed to load users</h3>
  <p className="text-sm text-muted-foreground mb-4 max-w-sm">
    Something went wrong. Please try again.
  </p>
  <Button variant="outline" onClick={refetch}>
    Try again
  </Button>
</div>
```

### Error inline (envío de formulario, validación)

```tsx
<div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
  {errorMessage}
</div>
```

### Error a nivel de campo

```tsx
<div className="space-y-1">
  <Label htmlFor="email" className="text-destructive">Email</Label>
  <Input id="email" className="border-destructive" />
  <p className="text-xs text-destructive">Invalid email format</p>
</div>
```

### Error toast (operación en segundo plano falló)

```tsx
toast({
  title: "Failed to save",
  description: extractApiError(error),
  variant: "destructive",
});
```

### Reglas

- Nivel de página: mismo layout que estado vacío pero con icono `AlertTriangle` y colores destructivos. Siempre incluir un botón "Try again".
- Inline: `bg-destructive/15 text-destructive rounded-md p-3`. Colocado encima del formulario o sección que falló.
- Nivel de campo: borde rojo en input + texto de error debajo. La etiqueta también se vuelve roja.
- Toast: para operaciones que ocurren en segundo plano (auto-guardado, eliminación).
- Siempre extraer y mostrar mensajes de error de API (nunca mostrar "Something went wrong" genérico cuando la API devolvió un mensaje específico).

---

## Estado de éxito

Se usa para confirmar una acción completada. Transitorio — no es una pantalla permanente.

### Toast (predeterminado para la mayoría de acciones)

```tsx
toast({
  title: "User created",
  description: "The user has been added successfully.",
});
```

### Éxito inline (después del envío de formulario, antes de redirigir)

```tsx
<div className="bg-green-50 text-green-700 border border-green-200 text-sm p-3 rounded-md">
  Changes saved successfully.
</div>
```

### Reglas

- Por defecto: usar toast. Desaparece automáticamente.
- Éxito inline: solo cuando el usuario se queda en la misma página después de la acción.
- Nunca usar una página/pantalla de éxito para operaciones CRUD simples.
- Después de crear/editar: redirigir a la vista de lista o detalle + toast.
- Después de eliminar: volver a la lista + toast.

---

## Tabla de decisión

| Escenario | Patrón de estado |
|---|---|
| Página cargando datos de API | Carga a nivel de página |
| Sección cargando dentro de una página | Carga inline |
| Botón realizando una acción | Carga de botón |
| No existen datos aún | Estado vacío con CTA |
| Llamada API falló en carga de página | Error a nivel de página con reintentar |
| Envío de formulario falló | Error inline encima del formulario |
| Validación de campo falló | Error a nivel de campo |
| Operación en segundo plano falló | Error toast |
| Acción CRUD exitosa | Toast de éxito + redirigir |
| Guardar sin navegación | Éxito inline |

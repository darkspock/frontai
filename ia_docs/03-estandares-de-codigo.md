# Estandares de codigo

## Estructura

- Nombrar archivos y carpetas de forma consistente.
- Separar UI, dominio frontend, servicios y adaptadores API.

## Calidad minima

- Sin errores de lint.
- Sin tests rotos.
- Sin codigo muerto evidente.

## Convenciones frontend

- Estados de pantalla explicitos: loading, empty, error, success.
- Componentes reutilizables y de responsabilidad acotada.
- Navegacion predecible y rutas coherentes.
- Breadcrumb visible en pantallas internas y consistente en posicion/comportamiento.
- Manejo de errores de API visible para usuario y trazable.

## Convenciones de implementacion

- Manejo de errores explicito.
- Logs utiles para diagnostico.
- Tipado estricto en contratos consumidos desde API.
- Evitar sobreacoplar UI con respuestas crudas del backend.

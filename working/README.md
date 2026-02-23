# Working

Especificaciones activas de features. Una subcarpeta por feature, con su propio `spec.md`.

## Estructura

```
working/
├── _template/
│   ├── spec.md        # Plantilla base — copiar para cada nuevo feature
│   └── tasks.md       # Plantilla de lista de tareas — generada por el agente validador
└── [nombre-del-feature]/
    ├── spec.md        # Especificacion del feature
    └── tasks.md       # Lista de tareas (generada despues de la validacion de spec)
```

## Reglas de uso

- Crear una subcarpeta para cada feature antes de implementar.
- Copiar `_template/spec.md` y completarla.
- Ejecutar el agente validador (`ia_docs/06-agente-validador.md`) antes de iniciar la implementacion.
- Solo empezar a codificar despues de que el validador confirme que la spec esta completa.
- Mantener `spec.md` actualizada si los requisitos cambian durante la implementacion.

## Convencion de nombres

Usar kebab-case en minusculas para nombres de carpetas. Ejemplos:
- `working/user-login/`
- `working/dashboard/`
- `working/contract-list/`

Navegación principal en mobile: pill flotante con 4 destinos e ícono + etiqueta; el activo va en `mandarina`.

**Props:** `items` (array `{id, label, icon}`; por defecto Resumen, Plan, Cuentas, Baúl: las cuatro secciones fijas de un viaje), `active` y `onChange(id)`, o `defaultActive`.

- Flota a `espacio-4` del borde inferior y centrada; el contenido deja `nav-alto` + `espacio-8` de aire al final.
- Las secciones no cambian de lugar entre etapas; lo que cambia es qué muestra Resumen. Grupo se abre desde los avatares del encabezado.
- Máximo 4 ítems. Desde `bp-desktop` se reemplaza por una barra lateral.

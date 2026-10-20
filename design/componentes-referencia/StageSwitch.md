Selector de etapa del viaje (Previaje · Viaje · Post-viaje); la etapa activa toma su color (`lima`, `mandarina`, `cielo`).

**Props:** `value` y `onChange(id)` para usarlo controlado, o `defaultValue` (`previaje` | `viaje` | `post`) sin control.

- Va arriba del todo en la pantalla de un viaje, dentro del encabezado teñido.
- La etapa por defecto la decide la fecha; el usuario puede mirar otra sin cambiar el estado del viaje.
- Las tres etapas aparecen siempre, aunque una todavía no tenga contenido.

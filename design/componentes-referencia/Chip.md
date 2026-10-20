Chip para filtrar o elegir opciones; seleccionado se rellena con el color del `tone` y muestra un check.

**Props:** `selected`, `tone` (`neutro` | `previaje` | `viaje` | `post`), `icon`, `onClick`, `children`.

- Usá el `tone` de la etapa en la que está la pantalla; `neutro` (relleno `tinta`) fuera de un viaje.
- Para elegir una sola opción entre muchas, usá `PollOption` si es una votación del grupo.
- Máximo una fila con scroll horizontal; no los apiles en varias líneas en mobile.

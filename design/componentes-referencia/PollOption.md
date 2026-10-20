Una opción dentro de una votación del grupo: se toca para votar y una barra `lima-tinte` muestra el porcentaje.

**Props:** `label`, `detail` (precio, distancia; opcional), `votes`, `total` (personas del grupo), `voted` (si votaste esta), `onVote`.

- Poné todas las opciones en una columna con `espacio-2` entre ellas, bajo un `titulo-2` con la pregunta (“¿Dónde dormimos?”).
- El voto propio se marca con check y borde `tinta`, no solo con color.
- Cuando la votación cierra, la ganadora pasa a ser un `Chip` seleccionado en el resumen.

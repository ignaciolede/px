Card de un viaje en el inicio: destino, etapa, nombre, fechas, quiénes van y, si hay, lo pendiente.

**Props:** `title` (nombre del viaje), `place` (destino), `dates` (texto ya formateado: “14–21 ene”), `stage`, `people` (array de nombres), `image` (URL de foto, opcional), `pending` (texto de lo que falta, opcional), `href`.

- Sin foto, la cabecera usa el tinte de la etapa: nunca un placeholder gris.
- Con foto, el destino va sobre `velo` en `papel`.
- `pending` en una sola línea y con una acción concreta: “Faltan 2 votos para el alojamiento”.
- En mobile van a una columna; desde `bp-tablet`, a dos.

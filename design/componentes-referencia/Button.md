Botón en forma de pill para cualquier acción; `primario` en `mandarina`, `secundario` con borde `linea-fuerte`, `fantasma` sin fondo.

**Props:** `variant` (`primario` | `secundario` | `fantasma`, por defecto `primario`), `size` (`md` 48px | `sm` 44px), `icon` / `iconRight` (nombre de `Icon`), `full` (ancho completo), `children` (texto), y cualquier prop de `<button>` (`onClick`, `disabled`, `type`).

- Un solo `primario` por pantalla. Si hay dos acciones, la otra es `secundario`; las terciarias, `fantasma`.
- El texto es un verbo que dice qué pasa: “Agregar gasto”, “Invitar al grupo”.
- En mobile, el primario al final de un formulario va con `full`.
- No uses blanco sobre mandarina: el componente ya usa `sobre-color`.

Campo de texto con label siempre visible arriba, ayuda opcional y estado de error.

**Props:** `label` (obligatorio), `hint`, `error` (texto; reemplaza al hint), y las props de `<input>` (`value`, `onChange`, `placeholder`, `type`, `inputMode`).

- El label nunca se reemplaza por el placeholder.
- El error dice qué hacer: “Poné un monto mayor a 0”.
- Para montos, `inputMode="numeric"`.

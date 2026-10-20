import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages sirve este proyecto en /px/, no en la raíz del dominio.
  base: '/px/',
})

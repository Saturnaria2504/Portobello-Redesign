import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base = de mapnaam van je repo op GitHub Pages (saturnaria2504.github.io/Portobello-Redesign/)
export default defineConfig({
  base: '/Portobello-Redesign/',
  plugins: [react(), tailwindcss()],
})

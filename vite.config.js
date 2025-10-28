import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/notification-frontend/', // 👈 GitHub Pages repo name
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: ['react'], // 👈 Fixes react-icons issue
    },
  },
})

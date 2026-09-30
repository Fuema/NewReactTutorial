// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //

// https://vitejs.dev
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Registers Tailwind CSS natively into the compiler build matrix
  ],
})

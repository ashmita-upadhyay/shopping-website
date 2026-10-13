import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Add this line

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Add this line
  ],
    build: {
    chunkSizeWarningLimit: 1000, // Sets the limit to 1000 kB (1 MB)
  }

})

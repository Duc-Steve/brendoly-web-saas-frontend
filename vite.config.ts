import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: 'brendoly-saas.local',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://api.brendoly-saas.local', // backend Laravel
        changeOrigin: true,
        secure: false
      }
    }
  }
})

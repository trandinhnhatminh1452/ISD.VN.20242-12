import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
     proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000
  },
  // 👇 Cấu hình fallback cho React Router
  build: {
    rollupOptions: {
      input: './index.html'
    }
  }
})

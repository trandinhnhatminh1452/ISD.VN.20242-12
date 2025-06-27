import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  // 👇 Cấu hình fallback cho React Router
  build: {
    rollupOptions: {
      input: './index.html'
    }
  }
})

// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' // 👈 import ตัวนี้
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      devTarget: 'es2022',
    }),
    tailwindcss(), // 👈 เรียกใช้งานตรงนี้
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ส่วน build config เก็บไว้เหมือนเดิมได้
  build: {
    chunkSizeWarningLimit: 1000,
    target: 'es2022',
    minify: 'esbuild',
  }
})
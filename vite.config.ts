import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'project',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'project/src/components'),
      '@lib': path.resolve(__dirname, 'project/src/lib'),
      '@': path.resolve(__dirname, 'project/src')
    }
  },
  server: { port: 5173, open: true },
  build: { outDir: '../dist', emptyOutDir: true }
})

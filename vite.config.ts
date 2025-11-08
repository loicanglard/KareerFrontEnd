import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  // ton app vit sous /project (index.html à cet endroit)
  root: 'project',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'project/src/components'),
      '@lib': path.resolve(__dirname, 'project/src/lib'),
      '@': path.resolve(__dirname, 'project/src'),
    },
  },
  server: {
    host: true,                     // nécessaire pour Bolt
    port: 5173,
    strictPort: false,
    hmr: { clientPort: 443, protocol: 'wss' }, // HMR à travers l’iframe Bolt
  },
  preview: {
    host: true,
    port: 5173,
  },
  // build dans /dist à la racine du repo (Netlify/vercel friendly)
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
})

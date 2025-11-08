import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Active le HMR spécial Bolt seulement si VITE_BOLT=1
const isBolt = process.env.VITE_BOLT === '1'

export default defineConfig({
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
    host: true,
    port: 5173,
    strictPort: false,
    hmr: isBolt ? { clientPort: 443, protocol: 'wss' } : true,
  },
  preview: { host: true, port: 5173 },
  build: { outDir: '../dist', emptyOutDir: true },
})

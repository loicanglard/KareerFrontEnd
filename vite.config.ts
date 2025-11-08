import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // l'app est dans /project
  root: 'project',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'project/src/components'),
      '@lib': path.resolve(__dirname, 'project/src/lib'),
      '@': path.resolve(__dirname, 'project/src')
    }
  },
  server: {
    host: true,          // << indispensable pour Bolt
    port: 5173,
    strictPort: true,
    hmr: { clientPort: 443 } // utile si la preview Bolt est derrière HTTPS
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true
  }
})

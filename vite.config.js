import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('leaflet')) {
              return 'leaflet'
            }
            if (id.includes('chart')) {
              return 'charts'
            }
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
  publicDir: 'public',
})

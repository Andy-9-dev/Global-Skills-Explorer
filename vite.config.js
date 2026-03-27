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
        manualChunks: {
          'leaflet': ['leaflet'],
          'chartjs': ['chart.js', 'react-chartjs-2'],
          'supabase': ['@supabase/supabase-js'],
          'router': ['react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  publicDir: 'public',
})

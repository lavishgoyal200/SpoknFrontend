import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      external: ['spokn-platform'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const directories = id.split('node_modules/')[1].split('/');
            const name = directories[0].startsWith('@')
              ? directories.slice(0, 2).join('/')
              : directories[0];
            return `vendor-${name}`;
          }
        }
      }
    }
  }
})

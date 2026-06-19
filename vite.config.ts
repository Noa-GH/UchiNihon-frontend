import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  base: '/UchiNihon-frontend/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    // Run the dev frontend on 3000 so it doesn't conflict with a backend on 3001.
    port: 3000,
    strictPort: true,
  },
});

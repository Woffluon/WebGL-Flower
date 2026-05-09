import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', 'VITE_'); // Restrict to VITE_ prefix for security (P3)
  return {
    plugins: [react(), tailwindcss(), glsl()],
    build: {
      sourcemap: 'hidden', // Add hidden sourcemaps for debugging without exposing source (P3)
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('three')) return 'vendor-three';
              if (id.includes('@react-three')) return 'vendor-r3f';
              return 'vendor';
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    compression({
      algorithm: 'brotliCompress', // Use 'brotliCompress' for Brotli compression, or 'gzip' for Gzip compression
      ext: '.br', // Use '.br' for Brotli compressed files, or '.gz' for Gzip compressed files
      // Additional configuration options can be added here if needed
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

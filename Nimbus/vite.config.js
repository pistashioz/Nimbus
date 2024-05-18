import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import compression from 'vite-plugin-compression';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    vue(),
    compression({
      algorithm: 'brotliCompress', // 'brotliCompress' can also be used for better compression
      ext: '.gz', // Extension for compressed files
      deleteOriginalAssets: false, // Do not delete the original files
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').at(-1);
          if (/woff|woff2/.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`;
          } else if (/png|jpe?g|webp|svg/.test(extType)) {
            return `assets/images/[name]-[hash][extname]`;
          } else {
            return `assets/[name]-[hash][extname]`;
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    configureServer: (server) => {
      server.middlewares.use((req, res, next) => {
        const cacheControl = 'public, max-age=31536000, immutable';
        if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|woff|woff2|ttf|svg|webp)$/)) {
          res.setHeader('Cache-Control', cacheControl);
        }
        next();
      });
    },
  },
});

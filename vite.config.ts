import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      includeAssets: [
        'offline.html',
        'icons/icon.svg',
        'icons/apple-touch-icon.svg',
      ],
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'JS:GO — Learn JavaScript from Zero to Pro',
        short_name: 'JS:GO',
        description:
          'Premium documentation and learning platform for HTML, CSS, and JavaScript.',
        theme_color: '#7c3aed',
        background_color: '#0f172a',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        categories: ['education', 'productivity', 'developer'],
        icons: [
          {
            src: '/icons/icon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            purpose: 'any maskable',
          },
          {
            src: '/icons/apple-touch-icon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
});
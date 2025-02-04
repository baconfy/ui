import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    laravel({
      input: ['workbench/resources/js/app.jsx', 'workbench/resources/css/app.css'],
      publicDirectory: 'vendor/orchestra/testbench-core/laravel/public',
      refresh: true,
    }),
    react(),
    tailwindcss(),
  ],
});

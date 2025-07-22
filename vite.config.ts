import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), preact()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});

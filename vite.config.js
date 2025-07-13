import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Allow JSX in .js and .ts files too (CRA-style)
      include: '**/*.{jsx,js,tsx,ts}',
    }),
  ],
  // Removed custom esbuild loader to let Vite handle TS/TSX properly
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
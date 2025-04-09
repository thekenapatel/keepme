import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/keepme/",  // 👈 IMPORTANT for GitHub Pages
  build: {
    outDir: "dist",  // 👈 Ensure this is correct
    emptyOutDir: true
  }
});


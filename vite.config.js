import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/keepme/", 
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});


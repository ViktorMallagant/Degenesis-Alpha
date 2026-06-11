import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // Chemins relatifs : le site est déployé dans un sous-chemin
  // (github.com/Katsu6624/degenesis-parasite.github.io -> /degenesis-parasite.github.io/)
  base: './',
  
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Il est préférable de rester sur 'dist' (standard Vite) 
    // pour éviter les confusions, mais 'build' fonctionne si tu copies ce dossier.
    outDir: 'dist', 
  }
})
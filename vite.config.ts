import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const fillPdfPath = fileURLToPath(new URL('./public/fill-pdf.js', import.meta.url))
const fillPdfVersion = createHash('sha256')
  .update(readFileSync(fillPdfPath))
  .digest('hex')
  .slice(0, 12)

// https://vitejs.dev/config/
export default defineConfig({
  // Déploiement sur GitHub Pages avec sous-chemin
  // (github.com/Katsu6624/degenesis-parasite.github.io -> /degenesis-parasite.github.io/)
  base: '/Degenesis-Alpha/',
  
  plugins: [
    vue(),
    {
      name: 'version-fill-pdf-exporter',
      transformIndexHtml(html) {
        return html.replace('__FILL_PDF_VERSION__', fillPdfVersion)
      }
    }
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

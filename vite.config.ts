import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, normalizePath } from 'vite'
import vue from '@vitejs/plugin-vue'

const fillPdfPath = fileURLToPath(new URL('./public/fill-pdf.js', import.meta.url))
const fillPdfVersion = createHash('sha256')
  .update(readFileSync(fillPdfPath))
  .digest('hex')
  .slice(0, 12)

const itemsPath = normalizePath(fileURLToPath(new URL('./src/config/items/index.ts', import.meta.url)))

// https://vitejs.dev/config/
export default defineConfig({
  // Déploiement sur GitHub Pages avec sous-chemin
  // (github.com/Katsu6624/degenesis-parasite.github.io -> /degenesis-parasite.github.io/)
  base: '/Degenesis-Alpha/',
  
  plugins: [
    {
      name: 'preserve-item-property-escaped-commas',
      enforce: 'pre',
      transform(code, id) {
        // In a JavaScript/TypeScript string literal, `\,` is normally reduced
        // to a plain comma before parseProperties() ever sees it. Double the
        // source backslash before TypeScript compilation so item data can use
        // `\,` to mean "literal comma; do not split this property here".
        if (normalizePath(id.split('?')[0]) !== itemsPath) return null
        return code.replace(/\\,/g, '\\\\,')
      }
    },
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

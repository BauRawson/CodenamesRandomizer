import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

// Copy the SPA shell to real paths so they return 200 on GitHub Pages
// instead of going through the 404.html redirect.
const STATIC_ROUTES = ['support']
const staticRoutes = {
  name: 'static-routes',
  closeBundle() {
    const out = resolve(__dirname, '../docs')
    for (const route of STATIC_ROUTES) {
      mkdirSync(resolve(out, route), { recursive: true })
      copyFileSync(resolve(out, 'index.html'), resolve(out, route, 'index.html'))
    }
  },
}

export default defineConfig({
  plugins: [react(), staticRoutes],
  base: '/',
  build: {
    outDir: '../docs',
    emptyOutDir: false,
  },
})

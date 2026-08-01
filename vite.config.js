import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Inlines the main CSS into <head> so there is no render-blocking stylesheet
// request on the critical path. Dynamic (deferred) chunk CSS is left untouched.
function inlineCriticalCss() {
  return {
    name: 'inline-critical-css',
    apply: 'build',
    closeBundle() {
      const distDir = fileURLToPath(new URL('./dist', import.meta.url))
      const htmlPath = `${distDir}/index.html`
      const html = readFileSync(htmlPath, 'utf-8')
      const linked = [...html.matchAll(/href="(\/assets\/[^"]*\.css)"/g)].map((m) => m[1])
      if (!linked.length) return
      const css = linked
        .map((p) => readFileSync(`${distDir}${p}`, 'utf-8'))
        .join('\n')
      const nextHtml = html
        .replace(/<link[^>]+href="\/assets\/[^"]*\.css"[^>]*>/g, '')
        .replace('</head>', `<style>\n${css}\n</style>\n  </head>`)
      writeFileSync(htmlPath, nextHtml)
      linked.forEach((p) => rmSync(`${distDir}${p}`))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), inlineCriticalCss()],
  server: {
    port: 5174,
  },
})

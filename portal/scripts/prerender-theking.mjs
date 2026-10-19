import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const vite = await createServer({ root, server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' })
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
try {
  const { default: Page } = await vite.ssrLoadModule('/src/pages/TheKingPage.jsx')
  const { theKing } = await vite.ssrLoadModule('/src/config/theKing.js')
  // The page uses router links; render them without requiring a browser.
  const { StaticRouter } = await import('react-router-dom/server.js')
  const markup = renderToString(React.createElement(StaticRouter, { location: '/theking' }, React.createElement(Page)))
  let html = await readFile(resolve(root, '../docs/index.html'), 'utf8')
  html = html.replace(/<title>.*?<\/title>/, `<title>${escape(theKing.title)}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(theKing.description)}" />`)
    .replace(/<link rel="icon"[^>]*>/g, '')
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
    .replace('</head>', `
  <link rel="canonical" href="${theKing.canonical}" />
  <link rel="icon" href="/theking/favicon.png" type="image/png" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escape(theKing.title)}" />
  <meta property="og:description" content="${escape(theKing.description)}" />
  <meta property="og:url" content="${theKing.canonical}" />
  <meta property="og:image" content="https://michicho.com${theKing.socialImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#0b1b49" />
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'VideoGame', name: 'THE KING: Tower Defense', description: theKing.description, genre: ['Action', 'Tower Defense'], url: theKing.canonical, image: `https://michicho.com${theKing.socialImage}`, publisher: { '@type': 'Organization', name: 'Michicho' } }).replaceAll('<', '\\u003c')}</script>
</head>`)
  await mkdir(resolve(root, '../docs/theking'), { recursive: true })
  await writeFile(resolve(root, '../docs/theking/index.html'), html)
  const { MOCK_GAMES, CATEGORIES } = await vite.ssrLoadModule('/src/data/mockGames.js')
  const routes = ['/', '/theking', '/games', '/categories', '/familia', '/support',
    ...MOCK_GAMES.filter(game => !game.is_unlisted).map(game => `/games/${game.slug}`),
    ...CATEGORIES.map(category => `/categories/${category.slug}`)]
  await writeFile(resolve(root, '../docs/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(path => `  <url><loc>https://michicho.com${path}</loc></url>`).join('\n')}\n</urlset>\n`)
  console.log('Prerendered /theking with game content, canonical URL, and sharing metadata.')
} finally { await vite.close() }

import { execSync } from 'node:child_process'
import { cpSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'

// Clean previous Vercel output
try { rmSync('.vercel/output', { recursive: true }) } catch (_) {}

// Build the app
execSync('node_modules/.bin/vite build', { stdio: 'inherit' })

// Set up Vercel Build Output API structure
mkdirSync('.vercel/output/static', { recursive: true })
mkdirSync('.vercel/output/functions/index.func', { recursive: true })

// Static client assets
cpSync('dist/client', '.vercel/output/static', { recursive: true })

// Write a temporary entry point that wraps the server handler
writeFileSync('_vercel_entry.mjs', `import server from './dist/server/server.js';
export default (req) => server.fetch(req);
`)

// Bundle the SSR server + all its dependencies into one file
execSync(
  [
    'node_modules/.bin/esbuild',
    '_vercel_entry.mjs',
    '--bundle',
    '--outfile=.vercel/output/functions/index.func/index.js',
    '--format=esm',
    '--platform=node',
    '--target=node22',
  ].join(' '),
  { stdio: 'inherit' }
)

rmSync('_vercel_entry.mjs')

// Vercel function config (Node.js Web API handler format)
writeFileSync('.vercel/output/functions/index.func/.vc-config.json', JSON.stringify({
  runtime: 'nodejs22.x',
  handler: 'index.js',
  launcherType: 'Nodejs',
}))

// Route static assets from the filesystem, everything else to the SSR function
writeFileSync('.vercel/output/config.json', JSON.stringify({
  version: 3,
  routes: [
    {
      src: '/assets/(.*)',
      headers: { 'Cache-Control': 'max-age=31536000, immutable' },
      continue: true,
    },
    { handle: 'filesystem' },
    { src: '/(.*)', dest: '/index' },
  ],
}))

console.log('Vercel output ready')

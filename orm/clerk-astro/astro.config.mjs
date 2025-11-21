import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import clerk from '@clerk/astro'

export default defineConfig({
  integrations: [clerk()],
  adapter: node({ mode: 'standalone' }),
  output: 'server',
  server: {
    allowedHosts: ['localhost', '3ac48b56ee41.ngrok-free.app'],
  },
})

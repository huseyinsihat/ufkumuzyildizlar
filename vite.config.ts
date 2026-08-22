import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/ufkumuzyildizlar/' : '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
  server: {
    proxy: {
      '/api/openrouter': {
        target: 'https://openrouter.ai',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/openrouter$/, '/api/v1/chat/completions'),
        configure: (proxy) => {
          proxy.on('error', (error, _req, res) => {
            console.warn('openrouter-proxy', error)
            const socket = res as { writeHead?: (code: number, headers: Record<string, string>) => void; end?: (body: string) => void }
            if (socket.writeHead && socket.end) {
              socket.writeHead(502, { 'Content-Type': 'application/json' })
              socket.end(JSON.stringify({ error: { message: 'proxy-error' } }))
            }
          })
        },
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})

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
        timeout: 120_000,
        proxyTimeout: 120_000,
        rewrite: () => '/api/v1/chat/completions',
      },
    },
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})

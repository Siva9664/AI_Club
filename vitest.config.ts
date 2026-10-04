import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    env: {
      VITE_USE_MOCK: 'true',
      VITE_API_BASE_URL: '/api/v1',
    },
  },
})
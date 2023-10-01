import path from 'path'
import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',

    includeSource: ['**/*.{ts, test.ts}'],
    include: [],
    exclude: [],
    passWithNoTests: true,
    globals: true,
    silent: false,
    setupFiles: ['.tools/vitest/setup.ts']
  },
  resolve: {
    alias: {
      '~': path.join(__dirname, '.'),
      '@vitest': path.join(__dirname, '.tools/vitest')
    }
  }
})

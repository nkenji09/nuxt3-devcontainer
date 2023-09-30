import path from 'path'
import { defineVitestConfig } from 'nuxt-vitest/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',

    includeSource: ['**/*.{ts, test.ts}'],
    include: [],
    exclude: [],
    alias: {
      '~': path.join(__dirname, './')
    },
    passWithNoTests: true,
    globals: true,
    silent: false,
    setupFiles: ['.tools/vitest/vitest.setup.ts']
  },
  resolve: {
    alias: {
      '@vitest': path.join(__dirname, '.tools/vitest')
    }
  }
})

import { vi } from 'vitest'

import $api from '../../api/$api'

// API
const autoMock = (obj: Object) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'function') {
        return [key, vi.fn(() => Promise.resolve())]
      }
      if (typeof value === 'object') {
        return [key, autoMock(value)]
      }
    })
  )
}

export const createMockContext = () => {
  return {
    $logger: {
      error: vi.fn(),
      warn: vi.fn(),
      debug: vi.fn(),
      info: vi.fn(),
      dev: vi.fn(),
      hook: vi.fn(),
      callHook: vi.fn()
    },
    $api: autoMock($api),
    hook: vi.fn(),
    callHook: vi.fn()
  }
}
vi.stubGlobal('useNuxtApp', createMockContext)

import { HookResult } from '@nuxt/schema'

/**
 * Hooks
 */
declare module '#app' {
  interface RuntimeNuxtHooks {
    'app:entry:succeeded': () => HookResult
  }
}

/**
 * Composables
 */
export const useApp = () => {
  const callHook = useNuxtApp().callHook

  /** states */
  const states = {
    entried: useState<boolean>('entried', () => false)
  }

  /** method */
  const entry = () => {
    // 初回のみ実行
    if (states.entried.value) return
    states.entried.value = true

    callHook('app:entry:succeeded')
  }

  return {
    entry
  }
}

import { HookResult } from '@nuxt/schema'
import { ToValueHolder } from '~/types/global'
import { ToRefRecord } from '~/types/vue'

/**
 * Hooks
 */
declare module '#app' {
  interface RuntimeNuxtHooks {
    /**
     * システム起動時、値が更新された（初回のみなので SSRのみ）
     */
    'app:entry:updated': () => HookResult
    /**
     * システム起動完了時
     */
    'app:entry:completed': () => HookResult
  }
}

/**
 * States
 */
type States = {
  entried: boolean
}

/**
 * Store（Vue, pinia依存）
 */
export const useApp = defineStore('app', () => {
  const context = useNuxtApp()
  /** states */
  const states: ToRefRecord<States> = {
    entried: ref(false)
  }

  return {
    actions: generateActions(context, states)
  }
})

/**
 * Logic
 */
const generateActions = (
  context: EmitterContext,
  states: ToValueHolder<States>
) => {
  const entry = () => {
    if (states.entried.value) {
      sendEvent(context, 'app:entry:completed')
      return
    }

    states.entried.value = true
    sendEvent(context, 'app:entry:updated')
    sendEvent(context, 'app:entry:completed')
  }

  return { entry }
}

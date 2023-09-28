import { HookResult } from '@nuxt/schema'
import { TUser } from '~/app/entity/user'
import { createGuestUser } from '~/app/entity/user/guest'
import { trustUser } from '~/app/entity/user/user'
import { ApiContext } from '~/app/utils/context'
import { sendEvent } from '~/app/utils/hook'
import { replaceReactiveObject } from '~/app/utils/vue'
import { ToValueHolder } from '~/types/global'
import { ToRefRecord } from '~/types/vue'

/**
 * Hooks
 */
declare module '#app' {
  interface RuntimeNuxtHooks {
    'user:fetch:updated': (user: TUser) => HookResult
    'user:fetch:completed': (user: TUser) => HookResult
  }
}

/**
 * States
 */
type States = {
  currentUser: TUser
}

/**
 * Store（Vue, pinia依存）
 */
export const useUser = defineStore('user', () => {
  const { callHook, $logger, $api } = useNuxtApp()

  /** states */
  const states: ToRefRecord<States> = {
    currentUser: ref<TUser>(createGuestUser())
  }

  /** computed */
  const isGuest = computed(() => isGuestUser(states.currentUser.value))

  return {
    // 本来は currentUser を readonly にしたいが下記の状況に陥ったため妥協（actionsを経由しない直接セットはレビューで弾く）
    // https://github.com/vuejs/pinia/discussions/2175
    ...states,

    isGuest,
    actions: generateActions({ callHook, $logger, $api }, states)
  }
})

/**
 * Logic
 */
const generateActions = (
  context: ApiContext,
  states: ToValueHolder<States>
) => {
  const { $api } = context

  const fetchCurrentUser = async (forceUpdate: boolean = false) => {
    if (!forceUpdate && !isGuestUser(states.currentUser.value)) {
      sendEvent(context, 'user:fetch:completed', states.currentUser.value)
      return
    }

    const apiResponse = await $api.user.me.$get()
    const user = trustUser(apiResponse).match<TUser>(
      (user) => {
        return user
      },
      (_error) => {
        return createGuestUser()
      }
    )
    setCurrentUser(user)
    sendEvent(context, 'user:fetch:updated', user)
    sendEvent(context, 'user:fetch:completed', user)
  }

  const setCurrentUser = (user: TUser) => {
    replaceReactiveObject(states.currentUser, user)
  }

  return {
    fetchCurrentUser
  }
}

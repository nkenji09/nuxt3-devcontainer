import { HookResult } from '@nuxt/schema'
import { TUser } from '~/app/entity/user'
import { createGuestUser, isGuestUser } from '~/app/entity/user/guest'

/**
 * Hooks
 */
declare module '#app' {
  interface RuntimeNuxtHooks {
    'user:fetch:succeeded': (user: TUser) => HookResult
  }
}

/**
 * Composables
 */
export const useUser = () => {
  const callHook = useNuxtApp().callHook

  /** states */
  const states = {
    user: useState<TUser>('currentUser', () => createGuestUser())
  }

  /** computed */
  const isGuest = computed(() => isGuestUser(states.user.value))

  /** method */
  const setUser = (user: TUser) => {
    states.user.value = user
  }
  const fetchUser = async (forceUpdate: boolean = false) => {
    // 取得済みの場合は基本的には更新しない
    if (!isGuestUser(states.user.value) && !forceUpdate) return

    const { data } = await useFetch('/api/user')
    setUser(data.value || createGuestUser())

    callHook('user:fetch:succeeded', states.user.value)
  }

  return {
    user: readonly(states.user),
    isGuest: readonly(isGuest),
    fetchUser
  }
}

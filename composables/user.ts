import { TUser } from '~/app/entity/user'
import { createGuestUser, isGuestUser } from '~/app/entity/user/guest'

export const useUserStore = () => {
  const callHook = useNuxtApp().callHook

  // state
  const states = {
    user: useState<TUser>('currentUser', () => createGuestUser())
  }

  // computed
  const isGuest = computed(() => isGuestUser(states.user.value))

  // method
  const setUser = (user: TUser) => {
    states.user.value = user
    callHook('user:FETCH_SUCCEEDED', states.user.value)
  }

  // 初回読み込み
  useFetch('/api/user').then(({ data }) => {
    setUser(data.value || createGuestUser())
  })

  return {
    user: states.user,
    isGuest,
    setUser
  }
}

export default {}

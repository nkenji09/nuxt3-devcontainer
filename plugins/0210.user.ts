import { useUser } from '~/app/service/user/user'

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()
  subscribe(nuxtApp, 'app:entry:updated', () => {
    useUser().actions.fetchCurrentUser(process.server)
  })
})

import { useUser } from '~/app/service/user/user'
import { devLog } from '~/shorthand/logger'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:entry:succeeded', () => {
    devLog('hook app:entry:succeeded')
    useUser().fetchUser()
  })
})

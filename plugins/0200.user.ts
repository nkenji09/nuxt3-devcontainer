import { HookResult } from '@nuxt/schema'
import { TUser } from '~/app/entity/user'
import { devLog } from '~/shorthand/logger'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('user:FETCH_SUCCEEDED', (user) => {
    devLog('hook!!!', user)
  })
})

declare module '#app' {
  interface RuntimeNuxtHooks {
    'user:FETCH_SUCCEEDED': (user: TUser) => HookResult
  }
}

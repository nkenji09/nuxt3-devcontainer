import { RuntimeNuxtHooks } from 'nuxt/app'
import { HookResult } from 'nuxt/schema'
import { EmitterContext, SubscriberContext } from '~/app/utils/context'
import { TimeoutError } from '~/app/utils/error'

type HookCallback = (...arguments_: any) => Promise<void> | void
type InferCallback<HT, HN extends keyof HT> = HT[HN] extends HookCallback
  ? HT[HN]
  : never

type TCallHook = <NameT extends keyof RuntimeNuxtHooks>(
  context: EmitterContext,
  hookKey: NameT,
  ..._params: Parameters<RuntimeNuxtHooks[NameT]>
) => HookResult

export const sendEvent: TCallHook = (context, hookKey, ...params) => {
  const { callHook } = context
  callHook(hookKey, ...params)
}

type THook = <NameT extends keyof RuntimeNuxtHooks>(
  context: SubscriberContext,
  hookKey: NameT,
  callback: InferCallback<RuntimeNuxtHooks, NameT>,
  options?: { allowDeprecated?: boolean }
) => () => void

export const subscribe: THook = (context, hookKey, callback, options) => {
  const { $logger, hook } = context
  const overrideCallback = ((...params: any[]) => {
    $logger.hook(hookKey)
    // eslint-disable-next-line n/no-callback-literal
    callback(...params)
  }) as InferCallback<RuntimeNuxtHooks, typeof hookKey>

  return hook(hookKey, overrideCallback, options)
}

/**
 * 特定の hook が呼び出されるまで待機する
 *  - SSRでこの hook まで処理させることを確定させる
 */
export const waitHook = async <NameT extends keyof RuntimeNuxtHooks>(
  context: SubscriberContext,
  hookKey: NameT,
  timeoutMS = 4000
) => {
  return await new Promise((resolve, reject) => {
    const { $logger, hook } = context
    const callback = ((...params: any[]) => {
      if (timer) clearTimeout(timer)
      $logger.hook(hookKey)
      resolve(params)
    }) as InferCallback<RuntimeNuxtHooks, typeof hookKey>
    hook(hookKey, callback)

    // resolve されない場合は rejectする
    const timer = setTimeout(() => {
      reject(new TimeoutError(`Timed out waiting for hook: ${hookKey}`))
    }, timeoutMS)
  })
}

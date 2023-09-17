/**
 * 実行モード
 */
export const APP_MODE_LIST = ['development', 'staging', 'production'] as const
export type TAppMode = (typeof APP_MODE_LIST)[number]

const appMode = () => useRuntimeConfig().public.appMode as TAppMode
export const isProduction = () => appMode() === 'production'

/**
 * 処理モード
 */
export const isServerSide = () => Boolean(process.server)
export const isClientSide = () => !process.server

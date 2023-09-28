/**
 * nuxt.config のみ相対パスを許可
 */
import { APP_MODE_LIST, TAppMode } from './app/utils/mode'

/**
 * 環境変数
 */
// 実行モード
const appMode = (process.env.NUXT_PUBLIC_APP_MODE || 'development') as TAppMode
if (!APP_MODE_LIST.includes(appMode)) {
  // eslint-disable-next-line no-console
  console.error('不明な実行モード', appMode)
  process.exit(1)
}

/**
 * 変数
 */
// 本番環境以外で利用したい機能の有効化に利用
const isNotProduction = appMode !== 'production'

export default defineNuxtConfig({
  /**
   * アプリケーション動作設定
   */
  ssr: true,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  /**
   * ビルド
   */
  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-vitest'],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs']
  },
  alias: {
    '@vitest': '../.tools/vitest'
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        types: ['vitest/importMeta', 'vitest/globals']
      }
    }
  },
  vite: {
    server: {
      hmr: {
        port: 24678
      }
    }
  },
  imports: {
    dirs: ['app/**']
  },
  /**
   * デバッグ
   */
  devtools: { enabled: isNotProduction },
  sourcemap: {
    server: isNotProduction,
    client: isNotProduction
  },
  /**
   * システム内で利用する変数
   * (.env.xxxxx によって上書きされるのでここにはデフォルト値を記述している)
   */
  runtimeConfig: {
    serverLoggerLevel: 'debug',
    public: {
      appMode: 'development',
      loggerLevel: 'debug',
      debuggingKey: 'debugging',
      apiBaseUrl: ''
    }
  }
})

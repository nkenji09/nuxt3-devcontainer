import aspida from '@aspida/fetch'
import api from '~/api/$api'
/**
 * デフォルトのロガーを生成する
 *  - ログレベルを変更したい場合は generateLogger を利用してロガーを生成する
 */
export default defineNuxtPlugin({
  name: 'aspida',
  enforce: 'pre',
  setup() {
    const fetchConfig = {
      baseURL:
        useRuntimeConfig().public.apiBaseUrl || 'http://localhost:3000/api',
      throwHttpErrors: false,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const apiClient = api(aspida(fetch, fetchConfig))
    return {
      provide: {
        api: apiClient
      }
    }
  }
})

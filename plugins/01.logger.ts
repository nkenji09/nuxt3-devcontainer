import { TLogLevel, TLogger, generateLogger } from '@/app/utils/logger'

export default defineNuxtPlugin({
  name: 'logger',
  enforce: 'pre',
  setup() {
    const clientSideLoggerLevel = useRuntimeConfig().public
      .loggerLevel as TLogLevel
    const serverSideLoggerLevel = useRuntimeConfig()
      .serverLoggerLevel as TLogLevel

    const logger: TLogger = generateLogger(
      clientSideLoggerLevel,
      serverSideLoggerLevel
    )
    return {
      provide: {
        // デフォルトのロガー（ログレベルを変更したい場合は generateLogger を利用してロガーを生成する）
        logger
      }
    }
  }
})

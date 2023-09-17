import { isServerSide } from '@/app/utils/mode'
import { defaultLogger } from '@/app/utils/logger/defaultLogger'

/**
 * ログレベルの定義
 */
const LOG_LEVEL = {
  debug: 0,
  info: 10,
  warn: 20,
  error: 30,
  dev: 100,
  none: 999
}
export type TLogLevel = keyof typeof LOG_LEVEL

/**
 * Loggerのインターフェース
 */
export type TLogObject = any[]
export interface TLogger {
  debug(...obj: TLogObject): void
  info(...obj: TLogObject): void
  warn(...obj: TLogObject): void
  error(...obj: TLogObject): void
  dev(...obj: TLogObject): void
}

/**
 * 拡張Loggerのインターフェース
 */
export interface TLoggerHooks {
  clientDebug(...obj: TLogObject): void
  clientInfo(...obj: TLogObject): void
  clientWarn(...obj: TLogObject): void
  clientError(...obj: TLogObject): void
  clientDev(...obj: TLogObject): void
  serverDebug(...obj: TLogObject): void
  serverInfo(...obj: TLogObject): void
  serverWarn(...obj: TLogObject): void
  serverError(...obj: TLogObject): void
  serverDev(...obj: TLogObject): void
}

/**
 * Loggerを生成する（拡張可能）
 */
export const generateLogger = (
  clientSideLoggerLevel: TLogLevel,
  serverSideLoggerLevel: TLogLevel,
  customHooks?: Partial<TLoggerHooks>
): TLogger => {
  const hooks: TLoggerHooks = {
    ...defaultLogger,
    ...(customHooks || {})
  }
  const isWritableInner = (logLevel: TLogLevel) =>
    isWritable({
      serverSideLoggerLevel,
      clientSideLoggerLevel,
      messageLevel: logLevel
    })
  return {
    debug: (...obj: TLogObject) => {
      if (!isWritableInner('debug')) return
      isServerSide() ? hooks.serverDebug(...obj) : hooks.clientDebug(...obj)
    },
    info: (...obj: TLogObject) => {
      if (!isWritableInner('info')) return
      isServerSide() ? hooks.serverInfo(...obj) : hooks.clientInfo(...obj)
    },
    warn: (...obj: TLogObject) => {
      if (!isWritableInner('warn')) return
      isServerSide() ? hooks.serverWarn(...obj) : hooks.clientWarn(...obj)
    },
    error: (...obj: TLogObject) => {
      if (!isWritableInner('error')) return
      isServerSide() ? hooks.serverError(...obj) : hooks.clientError(...obj)
    },
    dev: (...obj: TLogObject) => {
      if (!isWritableInner('dev')) return
      isServerSide() ? hooks.serverDev(...obj) : hooks.clientDev(...obj)
    }
  }
}

/**
 * ログを出力すべきかどうかを判定する
 */
interface TIsWritableParams {
  serverSideLoggerLevel: TLogLevel
  clientSideLoggerLevel: TLogLevel
  messageLevel: TLogLevel
}
export const isWritable = (params: TIsWritableParams) => {
  const { serverSideLoggerLevel, clientSideLoggerLevel, messageLevel } = params
  const loggerLevel = isServerSide()
    ? serverSideLoggerLevel
    : clientSideLoggerLevel
  return judgeWritable(loggerLevel, messageLevel)
}
const judgeWritable = (loggerLevel: TLogLevel, messageLevel: TLogLevel) => {
  // Debuggingモードの場合はそれを優先する
  const debuggingLoggerLevel = getDebuggingLoggerLevel()
  return (
    LOG_LEVEL[messageLevel] >= LOG_LEVEL[debuggingLoggerLevel || loggerLevel]
  )
}

/**
 * デバッグモード
 * Cookieに特定の値がある場合のみ そのLogger Levelを利用する（不具合調査のため）
 */
export const getDebuggingLoggerLevel = (): undefined | TLogLevel => {
  const { debuggingKey } = useRuntimeConfig().public
  const cookie = useCookie(debuggingKey).value
  if (!cookie) return undefined
  return cookie in LOG_LEVEL ? (cookie as TLogLevel) : undefined
}

/**
 * Vitest
 */
if (import.meta.vitest) {
  describe('utils/logger', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })
    describe('generateLogger', () => {
      test.concurrent(
        'Vitest が ClientSide で実行されているので client側のメソッドが実行される',
        () => {
          /* 準備 */
          const hooks: Partial<TLoggerHooks> = {
            clientDebug: () => {},
            serverDebug: () => {}
          }
          const spyClientDebug = vi.spyOn(hooks, 'clientDebug')
          const spyServerDebug = vi.spyOn(hooks, 'serverDebug')

          /* 実行 */
          const loggerLevel: TLogLevel = 'debug'
          const logger = generateLogger(loggerLevel, loggerLevel, hooks)
          logger.debug('test')

          /* 検証 */
          expect(spyClientDebug).toHaveBeenCalled()
          expect(spyServerDebug).not.toHaveBeenCalled()
        }
      )

      test.concurrent(
        'Logger Level(info) > Messsaeg Level(debug) の場合はログが出力されない',
        () => {
          /* 準備 */
          const hooks: Partial<TLoggerHooks> = {
            clientDebug: () => {}
          }
          const spy = vi.spyOn(hooks, 'clientDebug')

          /* 実行 */
          const loggerLevel: TLogLevel = 'info'
          const logger = generateLogger(loggerLevel, loggerLevel, hooks)
          logger.debug('test')

          /* 検証 */
          expect(spy).not.toHaveBeenCalled()
        }
      )

      test.concurrent(
        'Logger Level(debug) < Messsaeg Level(info) の場合はログが出力される',
        () => {
          /* 準備 */
          const hooks: Partial<TLoggerHooks> = {
            clientInfo: () => {}
          }
          const spy = vi.spyOn(hooks, 'clientInfo')

          /* 実行 */
          const loggerLevel: TLogLevel = 'debug'
          const logger = generateLogger(loggerLevel, loggerLevel, hooks)
          logger.info('test')

          /* 検証 */
          expect(spy).toHaveBeenCalled()
        }
      )
    })
  })
}

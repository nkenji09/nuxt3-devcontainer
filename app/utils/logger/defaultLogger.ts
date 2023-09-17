/* eslint-disable no-console */
import { TLoggerHooks, TLogObject } from '@/app/utils/logger'

export const defaultLogger: TLoggerHooks = {
  clientDebug: (...obj: TLogObject) => {
    console.debug(...obj)
  },
  clientInfo: (...obj: TLogObject) => {
    console.info(...obj)
  },
  clientWarn: (...obj: TLogObject) => {
    console.warn(...obj)
  },
  clientError: (...obj: TLogObject) => {
    console.error(...obj)
  },
  clientDev: (...obj: TLogObject) => {
    console.log('--- DELETE clientDev !!! ---')
    console.log(...obj)
  },
  serverDebug: (...obj: TLogObject) => {
    console.debug(...obj)
  },
  serverInfo: (...obj: TLogObject) => {
    console.info(...obj)
  },
  serverWarn: (...obj: TLogObject) => {
    console.warn(...obj)
  },
  serverError: (...obj: TLogObject) => {
    console.error(...obj)
  },
  serverDev: (...obj: TLogObject) => {
    console.log('--- DELETE serverDev !!! ---')
    console.log(...obj)
  }
}

import type { NuxtApp } from 'nuxt/app'
import api from '~/api/$api'

export type EmitterContext = {
  $logger: TLogger
  callHook: NuxtApp['callHook']
}

export type SubscriberContext = {
  $logger: TLogger
  hook: NuxtApp['hook']
}

export type ApiContext = {
  $api: ReturnType<typeof api<any>>
} & EmitterContext

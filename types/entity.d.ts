import { TBaseEntity } from '~/app/entity'

export type OmitMarker<T extends TBaseEntity<string>> = Omit<T, '_marker'>
export type Unvalidated<
  T extends TBaseEntity<string>,
  S extends string
> = Partial<OmitMarker<T>> & {
  _marker: S
}
export type ToUnknow<T> = Partial<{
  [K in keyof T]: unknown
}>
export type Raw<T extends TBaseEntity<string>> = OmitMarker<ToUnknow<T>>

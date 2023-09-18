import { TBaseEntity } from '~/app/entity'

export type OmitMarker<T extends TBaseEntity<Symbol>> = Omit<T, '_marker'>
export type Unvalidated<
  T extends TBaseEntity<Symbol>,
  S extends Symbol
> = Partial<OmitMarker<T>> & {
  _marker: S
}
export type ToUnknow<T> = Partial<{
  [K in keyof T]: unknown
}>
export type Raw<T extends TBaseEntity<Symbol>> = OmitMarker<ToUnknow<T>>

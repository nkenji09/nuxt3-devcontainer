import { BaseEntity } from '@/app/entity'

export type OmitMarker<T extends BaseEntity<Symbol>> = Omit<T, '_marker'>
export type Unvalidated<
  T extends BaseEntity<Symbol>,
  S extends Symbol
> = Partial<OmitMarker<T>> & {
  _marker: S
}
export type ToUnknow<T> = Partial<{
  [K in keyof T]: unknown
}>
export type Raw<T extends BaseEntity<Symbol>> = OmitMarker<ToUnknow<T>>

export type ValueHolder<T> = {
  value: T
}
export type ToValueHolder<T> = {
  [K in keyof T]: ValueHolder<T[K]>
}

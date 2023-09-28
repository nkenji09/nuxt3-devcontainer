export type ToRefRecord<T> = {
  [K in keyof T]: Ref<T[K]>
}

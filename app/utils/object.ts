export type Entries<T> = (keyof T extends infer U
  ? U extends keyof T
    ? [U, T[U]]
    : never
  : never)[]
export const typedEntries = <T extends Record<string, unknown>>(
  object: T
): Entries<T> => Object.entries(object) as Entries<T>

export const typedKeys = <T extends Record<string, unknown>>(
  object: T
): (keyof T)[] => Object.keys(object) as (keyof T)[]

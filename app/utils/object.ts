export type TEntries<T> = (keyof T extends infer U
  ? U extends keyof T
    ? [U, T[U]]
    : never
  : never)[]
export const typedEntries = <T extends Record<string, unknown>>(
  object: T
): TEntries<T> => Object.entries(object) as TEntries<T>

export const typedKeys = <T extends Record<string, unknown>>(
  object: T
): (keyof T)[] => Object.keys(object) as (keyof T)[]

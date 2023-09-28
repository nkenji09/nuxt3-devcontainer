import { ValueHolder } from '~/types/global'

export const replaceReactiveObject = <T extends Object>(
  baseObject: ValueHolder<T>,
  newObject: T
): ValueHolder<T> => {
  baseObject.value = { ...baseObject.value, ...newObject }
  return baseObject
}

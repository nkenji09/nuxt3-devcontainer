import { Result, err, ok } from 'neverthrow'
import { ValidationError } from '~/app/utils/error'

/*
 * Type Guard
 */
export const isUndefined = (data: unknown): data is undefined =>
  typeof data === 'undefined'

export const isEmptyString = (data: unknown): data is '' => data === ''

/*
 * Result Type Guard
 */
export type Validator<T> = (_data: unknown) => Result<T, ValidationError>

export const isNotUndefined = <T>(
  data: T
): Result<Exclude<T, undefined>, ValidationError> => {
  return typeof data !== 'undefined'
    ? ok(data as Exclude<T, undefined>)
    : err(new ValidationError('ERR_UNDEFINED'))
}

export const isNotNull = <T>(
  data: T
): Result<Exclude<T, null>, ValidationError> => {
  return data !== 'null'
    ? ok(data as Exclude<T, null>)
    : err(new ValidationError('ERR_NULL'))
}

export const isString: Validator<string> = (data: unknown) => {
  return typeof data === 'string'
    ? ok(data)
    : err(new ValidationError('ERR_NOT_STRING_TYPE'))
}

export const isNotEmptyString: Validator<string> = (data: unknown) => {
  return isString(data).andThen((str) => {
    return str.length > 0
      ? ok(str)
      : err(new ValidationError('ERR_EMPTY_STRING'))
  })
}

export const isNumber: Validator<number> = (data: unknown) => {
  return typeof data === 'number'
    ? ok(data)
    : err(new ValidationError('ERR_NOT_NUMBER_TYPE'))
}

export const isNaturalNumber: Validator<number> = (data: unknown) => {
  return isNumber(data).andThen((num) => {
    return num >= 0
      ? ok(num)
      : err(new ValidationError('ERR_NOT_NATURAL_NUMBER'))
  })
}

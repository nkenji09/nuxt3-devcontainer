import { Result, err, ok } from 'neverthrow'
import { ValidationError } from '~/app/utils/error'
import { typedEntries, typedKeys } from '~/app/utils/object'
import { TValidator, isNaturalNumber } from '~/app/utils/validator'
import { ToUnknow } from '~/types/entity'

export type TBaseEntity<T extends string> = {
  _marker: T
}

/*
 * Validation
 */
export type TFieldValidators<T> = {
  [K in keyof T]: TValidator<T[K]>
}
/**
 * 下記のような利用シーンを想定
 *  - RawData から Unvalidated への変換
 *  - Unvalidated から Validated への変換
 *
 * 実装について
 *  - 異なる型への変換を行うため、一度型情報をリセットして as T で型を付与する
 *  - validator を通過している = 型情報が正しい という前提
 *  - つまり、この部分は動的型チェックを行なっている
 */
export const validate = <T extends Object, P = ToUnknow<T>>(
  data: P,
  validators: TFieldValidators<P>
): Result<T, ValidationError> => {
  const results = typedEntries(validators).reduce(
    (reduced, [field, validator]) => {
      if (!validator) return reduced
      if (!data[field as keyof P]) return reduced
      reduced.push(validator(data[field as keyof P]))
      return reduced
    },
    [] as Result<any, ValidationError>[]
  )
  const combined = Result.combine(results)

  // andThen に入る = 全ての Validation を通過している
  return combined.andThen((validatedValues) => {
    const response: Partial<T> = {}

    typedKeys(validators).forEach((field, index) => {
      const value = validatedValues[index]
      response[field as keyof T] = value
    })

    return ok(response as T)
  })
}

/*
 * Validation helper
 */
const ALLOWED_ERROR_CODES = ['ERR_UNDEFINED', 'ERR_NULL', 'ERR_EMPTY_STRING']
export const optional =
  <T>(validator: TValidator<T>) =>
  (data: unknown): Result<T | undefined, ValidationError> =>
    validator(data).match<Result<T | undefined, ValidationError>>(
      (value) => ok(value),
      (error) =>
        ALLOWED_ERROR_CODES.includes(error.code) ? ok(undefined) : err(error)
    )

export const isNumberId: TValidator<number> = (data: unknown) =>
  isNaturalNumber(data)

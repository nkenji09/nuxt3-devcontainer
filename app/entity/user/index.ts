import { Result, ok } from 'neverthrow'
import {
  BaseEntity,
  FieldValidators,
  isNumberId,
  optional,
  validate
} from '@/app/entity'
import { ValidationError } from '@/app/utils/error'
import { Unvalidated, Raw, OmitMarker } from '@/types/entity'
import { isNotEmptyString } from '@/app/utils/validator'

const S_VALIDATED = Symbol('ValidatedUser')
const S_UNVALIDATED = Symbol('UnvalidatedUser')

/* 型定義 */
// Validated
export interface ValidatedUser extends BaseEntity<typeof S_VALIDATED> {
  id: number
  name: string
}
export const fieldValidators: FieldValidators<OmitMarker<ValidatedUser>> = {
  id: isNumberId,
  name: isNotEmptyString
}

// Unvalidated
export type UnvalidatedUser = Unvalidated<ValidatedUser, typeof S_UNVALIDATED>
export const unvalidatedFieldValidators: FieldValidators<
  OmitMarker<UnvalidatedUser>
> = {
  id: optional(fieldValidators.id),
  name: optional(fieldValidators.name)
}

// Validated型の総称（派生型を含む）
export type User = ValidatedUser

/* Workflow */
/**
 * 開発工数削減のため検証をSkipして Validated を作成する
 *  - API返り値など他サービスが検証しているものにのみ使用可
 *  - ユーザー入力データなどに対しては使用しない
 *  - 将来的には利用しない状態にする
 */
export const trustUser = (
  rawData: Raw<ValidatedUser>
): Result<ValidatedUser, ValidationError> => {
  useNuxtApp().$logger.info('FIXME: trustUser が使用されました')
  useNuxtApp().$logger.debug('trustUser: request', rawData)
  const response = {
    ...rawData,
    _marker: S_VALIDATED
  } as ValidatedUser
  useNuxtApp().$logger.debug('trustUser: response', response)
  return ok(response)
}

/**
 * RawData => Unvalidated
 */
export const toUnvalidatedUser = (
  rawData: Raw<UnvalidatedUser>
): Result<UnvalidatedUser, ValidationError> => {
  useNuxtApp().$logger.debug('toUnvalidatedUser: request', rawData)
  const result = validate<UnvalidatedUser>(rawData, unvalidatedFieldValidators)
  useNuxtApp().$logger.debug('toUnvalidatedUser: result', result)

  return result.andThen((unvalidatedData) => {
    const response = {
      ...unvalidatedData,
      _marker: S_UNVALIDATED
    } as UnvalidatedUser

    useNuxtApp().$logger.debug('toUnvalidatedUser: response', result)
    return ok(response)
  })
}

/**
 * Unvalidated => Validated
 */
export const validateUser = (
  unvalidatedData: UnvalidatedUser
): Result<ValidatedUser, ValidationError> => {
  const result = validate<ValidatedUser>(unvalidatedData, fieldValidators)
  return result.andThen((validatedData) =>
    ok({
      ...validatedData,
      _marker: S_VALIDATED
    } as ValidatedUser)
  )
}

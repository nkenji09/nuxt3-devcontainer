import { Result, ok } from 'neverthrow'
import {
  TBaseEntity,
  TFieldValidators,
  isNumberId,
  optional,
  validate
} from '~/app/entity'
import { ValidationError } from '~/app/utils/error'
import { isNotEmptyString } from '~/app/utils/validator'
// import { debugLog, fixMeLog, variablesLog } from '~/shorthand/logger'
import { Unvalidated, Raw, OmitMarker } from '~/types/entity'

const S_VALIDATED = 'ValidatedUser'
const S_UNVALIDATED = 'UnvalidatedUser'

/* 型定義 */
// Validated
export interface TSignedUser extends TBaseEntity<typeof S_VALIDATED> {
  id: number
  name: string
}
export const fieldValidators: TFieldValidators<OmitMarker<TSignedUser>> = {
  id: isNumberId,
  name: isNotEmptyString
}

// Unvalidated
export type TUnvalidatedUser = Unvalidated<TSignedUser, typeof S_UNVALIDATED>
export const unvalidatedFieldValidators: TFieldValidators<
  OmitMarker<TUnvalidatedUser>
> = {
  id: optional(fieldValidators.id),
  name: optional(fieldValidators.name)
}

/* Workflow */
/**
 * 開発工数削減のため検証をSkipして Validated を作成する
 *  - API返り値など他サービスが検証しているものにのみ使用可
 *  - ユーザー入力データなどに対しては使用しない
 *  - 将来的には利用しない状態にする
 */
export const trustUser = (
  rawData: Raw<TSignedUser>
): Result<TSignedUser, ValidationError> => {
  // fixMeLog('trustUser が使用されました')
  // variablesLog({ rawData })
  const response = {
    ...rawData,
    _marker: S_VALIDATED
  } as TSignedUser
  // variablesLog({ response })
  return ok(response)
}

/**
 * RawData => Unvalidated
 */
export const toUnvalidatedUser = (
  rawData: Raw<TUnvalidatedUser>
): Result<TUnvalidatedUser, ValidationError> => {
  // debugLog('toUnvalidatedUser: request', rawData)
  const result = validate<TUnvalidatedUser>(rawData, unvalidatedFieldValidators)
  // debugLog('toUnvalidatedUser: result', result)

  return result.andThen((unvalidatedData) => {
    const response = {
      ...unvalidatedData,
      _marker: S_UNVALIDATED
    } as TUnvalidatedUser

    // debugLog('toUnvalidatedUser: response', result)
    return ok(response)
  })
}

/**
 * Unvalidated => Validated
 */
export const validateUser = (
  unvalidatedData: TUnvalidatedUser
): Result<TSignedUser, ValidationError> => {
  const result = validate<TSignedUser>(unvalidatedData, fieldValidators)
  return result.andThen((validatedData) =>
    ok({
      ...validatedData,
      _marker: S_VALIDATED
    } as TSignedUser)
  )
}

const ERROR_CODE = {
  ERR_TIMEOUT: 'ERR_TIMEOUT',
  ERR_UNDEFINED: 'ERR_UNDEFINED',
  ERR_NULL: 'ERR_NULL',
  ERR_EMPTY_STRING: 'ERR_EMPTY_STRING',
  ERR_NOT_NATURAL_NUMBER: 'ERR_NOT_NATURAL_NUMBER',
  ERR_NOT_STRING_TYPE: 'ERR_NOT_STRING_TYPE',
  ERR_NOT_NUMBER_TYPE: 'ERR_NOT_NUMBER_TYPE'
} as const
type TErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE]

export class CustomError extends Error {
  readonly code: TErrorCode
  constructor(code: TErrorCode, message?: string, options?: ErrorOptions) {
    super(message, options)
    this.code = code
  }
}
export class FetchError extends CustomError {}
export class ValidationError extends CustomError {}
export class TimeoutError extends CustomError {
  constructor(message?: string, options?: ErrorOptions) {
    super(ERROR_CODE.ERR_TIMEOUT, message, options)
  }
}

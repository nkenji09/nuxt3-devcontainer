import { TUser } from '~/app/entity/user'
import { toUnvalidatedUser, validateUser } from '~/app/entity/user/user'

export default defineEventHandler((_event): TUser => {
  const response = {
    id: 111,
    name: 'TEST'
  }

  const result = toUnvalidatedUser(response)
    .andThen(validateUser)
    ._unsafeUnwrap()

  return result
})

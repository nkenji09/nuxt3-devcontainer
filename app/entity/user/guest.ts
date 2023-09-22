import { TBaseEntity } from '~/app/entity'
import { TSignedUser } from '~/app/entity/user/user'

const S_GUEST = 'GuestUser'

// Guest
export type TGuestUser = TBaseEntity<typeof S_GUEST> & Pick<TSignedUser, 'name'>

export const isGuestUser = (user: TBaseEntity<string>): user is TGuestUser =>
  user._marker === S_GUEST

export const createGuestUser = (): TGuestUser => {
  return {
    _marker: S_GUEST,
    name: 'ゲスト'
  }
}

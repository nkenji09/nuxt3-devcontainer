import { TGuestUser } from '~/app/entity/user/guest'
import { TSignedUser } from '~/app/entity/user/user'

// Validated型の総称（派生型を含む）
export type TUser = TSignedUser | TGuestUser

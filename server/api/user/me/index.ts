import { TSignedUser } from '~/app/entity/user/user'
import { OmitMarker } from '~/types/entity'

export default defineEventHandler(
  async (): Promise<OmitMarker<TSignedUser>> => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const signedUser: OmitMarker<TSignedUser> = {
      id: 1,
      name: 'ログイン済みユーザー'
    }
    return signedUser
  }
)

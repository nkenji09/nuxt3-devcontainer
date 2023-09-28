import { TSignedUser } from '~/app/entity/user/user'
import { OmitMarker } from '~/types/entity'

export type Methods = {
  get: {
    query?: {}

    resBody: OmitMarker<TSignedUser>
  }
}

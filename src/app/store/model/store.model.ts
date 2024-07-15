import { User } from "../../shared/interfaces/user.interface"

export interface StoreInterface {
  isLogin: boolean
  idUser: string
  userInfo: User
}

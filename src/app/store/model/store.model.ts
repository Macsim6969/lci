import { DashboardTotalInfo } from "../../modules/dashboard/@shared/interfaces/dashboard.interface"
import { User } from "../../shared/interfaces/user.interface"

export interface StoreInterface {
  isLogin: boolean
  idUser: string
  userInfo: User,
  allUsers: User[],
  dashboardInfo: DashboardTotalInfo
}

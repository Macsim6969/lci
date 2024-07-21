import { DashboardTotalInfo } from "../../modules/dashboard/@shared/interfaces/dashboard.interface"
import { MemoList } from "../../modules/memo/@shared/interfaces/memo.interface"
import { PaymentVouchers } from "../../modules/payment-vouchers/@shared/interfaces/paymentsVouchers.interface"
import { StaffMiniList, User } from "../../shared/interfaces/user.interface"

export interface StoreInterface {
  isLogin: boolean
  idUser: string
  userInfo: User
  allUsers: User[]
  allUsersProfile: User[];
  dashboardInfo: DashboardTotalInfo
  memoList: MemoList[]
  staffMiniList: StaffMiniList[]
  paymentsVouchers: PaymentVouchers[]
}

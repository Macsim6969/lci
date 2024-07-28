import { DashboardTotalInfo } from "../../modules/dashboard/@shared/interfaces/dashboard.interface"
import { MaintanceList, MaintenanceDashboard } from "../../modules/maintenance/@shared/interfaces/maintenance.interface"
import { MemoList } from "../../modules/memo/@shared/interfaces/memo.interface"
import { Notification } from "../../modules/notifications/@shared/interfaces/notification.interface"
import { PaymentVouchers } from "../../modules/payment-vouchers/@shared/interfaces/paymentsVouchers.interface"
import { PayrollData } from "../../modules/payroll/@shared/interfaces/payroll.interface"
import { SalaryDefinition } from "../../modules/payroll/@shared/interfaces/salary.interface"
import { Settings } from "../../modules/settings/@shared/interfaces/settings.interface"
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
  payrollDashboard: PayrollData
  payrollSalary: SalaryDefinition[]
  maintenanceDashboard: MaintenanceDashboard
  maintenanceList: MaintanceList[]
  notificationsList: Notification[]
  settingsData: Settings
}

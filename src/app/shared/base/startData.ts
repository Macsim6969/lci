import { PayrollData } from "../../modules/payroll/@shared/interfaces/payroll.interface"

export const setStartDashboarfInfo = () => {
  const newDashboardData = {
    "totalStaff": 0,
    "totalApplication": 0,
    "totalProject": 0,
    "totalDepartments": 0
  }
  return newDashboardData
}

export const setStartPayrollData = () => {
  const newPayrollData: PayrollData = {
    "gross": 0,
    "net": 0,
    "tax": 0,
    "loan": 0
  }
  return newPayrollData
}
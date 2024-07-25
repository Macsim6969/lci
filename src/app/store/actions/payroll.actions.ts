import { createAction, props } from "@ngrx/store"
import { PayrollData } from "../../modules/payroll/@shared/interfaces/payroll.interface"
import { SalaryDefinition } from "../../modules/payroll/@shared/interfaces/salary.interface"

const PAYROALDASBOARD = 'PAYROALDASBOARD'
const PAYROLLSALARY = 'PAYROLLSALARY'

export const setPayroallDashboard = createAction(
  PAYROALDASBOARD,
  props<{data: PayrollData}>()
)

export const setPayroallSalary = createAction(
  PAYROLLSALARY,
  props<{data: SalaryDefinition[]}>()
)
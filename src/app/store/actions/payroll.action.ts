import { createAction, props } from "@ngrx/store"
import { PayrollData } from "../../modules/payroll/@shared/interfaces/payroll.interface"

const PAYROALDASBOARD = 'PAYROALDASBOARD'

export const setPayroallDashboard = createAction(
  PAYROALDASBOARD,
  props<{data: PayrollData}>()
)
import { createAction, props } from "@ngrx/store"
import { PaymentVouchers } from "../../modules/payment-vouchers/@shared/interfaces/paymentsVouchers.interface"

const PAYMENTSVOUCHERS = 'PAYMENTSVOUCHERS'

export const setPaymentsVouchers = createAction(
  PAYMENTSVOUCHERS,
  props<{data: PaymentVouchers[]}>()
)
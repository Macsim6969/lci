import { createAction } from "@ngrx/store"


export const SETALLUSERS = 'SETALLUSERS'
export const REGISTER = 'REGISTER'

export const setAllUsers = createAction(
  SETALLUSERS
);
export const setRegiset = createAction(
  REGISTER
);


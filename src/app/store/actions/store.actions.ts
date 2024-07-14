import { createAction, props } from "@ngrx/store"


export const SETALLUSERS = 'SETALLUSERS';
export const REGISTER = 'REGISTER';
export const USERID = 'USERID';
export const SETUSERDATA = 'SETUSERDATA';
export const STARTAFFECT = 'STARTAFFECT';

export const setAllUsers = createAction(
  SETALLUSERS
);

export const newUserID = createAction(
  USERID,
  props<{ id: string }>()
);


export const setRegiset = createAction(
  REGISTER
);

export const setUserData = createAction(
  SETUSERDATA,
  props<{ data: boolean }>()
);

export const startGetData = createAction(
  STARTAFFECT
);
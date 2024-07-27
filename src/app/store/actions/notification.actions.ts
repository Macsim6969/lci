import { createAction, props } from "@ngrx/store";
import { Notification } from "../../modules/notifications/@shared/interfaces/notification.interface";

const NOTIFICATIONDATA = 'NOTIFICATIONDATA';

export const sendNotificationData = createAction(
  NOTIFICATIONDATA,
  props<{ data: Notification[] }>()
)
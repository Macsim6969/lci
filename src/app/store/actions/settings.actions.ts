import { createAction, props } from "@ngrx/store";
import { Settings } from "../../modules/settings/@shared/interfaces/settings.interface";

const SETTINGSDATA = 'SETTINGSDATA';

export const setSettings = createAction(
  SETTINGSDATA,
  props<{ data: Settings }>()
)
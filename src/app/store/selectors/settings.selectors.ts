import { StoreInterface } from "../model/store.model";

export const selectSettingsData = (store: { store: StoreInterface }) => store.store.settingsData;
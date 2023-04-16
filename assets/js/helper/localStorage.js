import {  shortcutsWorker, shortcutsReview } from "../../constant/shortcutApi.js";
import { ROLES } from "../../constant/type.js";

export const name_setting = "user-setting";

export const setCustomSettingLocalStorage = (
  name_localStore_set,
  dataSetting
) => {
  window.localStorage.setItem(name_localStore_set, JSON.stringify(dataSetting));
};

export const getCustomSettingLocalStorage = (name_localStore_get) => {
  try {
    return JSON.parse(window.localStorage.getItem(name_localStore_get));
  } catch (error) {
    alert(
      "There's something wrong your setting, so we will reset them to default !!"
    );
    return checkLocalStorageIsAvailable(name_setting);
  }
};

export const removeCustomSettingLocalStorage = (name_localStore_remove) => {
  window.localStorage.removeItem(name_localStore_remove);
};

export const checkLocalStorageIsAvailable = (name_store_check) => {
  const shortcuts = name_store_check === "user-shortcuts" ? shortcutsWorker : shortcutsReview
  if (!getCustomSettingLocalStorage(name_store_check)) {
    setCustomSettingLocalStorage(name_store_check, shortcuts);
  }

  return getCustomSettingLocalStorage(name_store_check);
};


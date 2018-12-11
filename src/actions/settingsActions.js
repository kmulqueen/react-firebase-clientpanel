import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "./types";

//// When these get called, they're sending the type and payload to the reducer, then whatever type is called is going to toggle that state value to true/false (see settingsReducer.js) ////
export const setDisableBalanceOnAdd = () => {
  // Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Actual Toggle true/false value
  settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

  // Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));

  // Return type and payload to reducer
  return {
    type: DISABLE_BALANCE_ON_ADD,
    payload: settings.disableBalanceOnAdd
  };
};
export const setDisableBalanceOnEdit = () => {
  // Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Actual Toggle true/false value
  settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

  // Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: DISABLE_BALANCE_ON_EDIT,
    payload: settings.disableBalanceOnEdit
  };
};
export const setAllowRegistration = () => {
  // Get settings from localStorage
  const settings = JSON.parse(localStorage.getItem("settings"));

  // Actual Toggle true/false value
  settings.allowRegistration = !settings.allowRegistration;

  // Set back to localStorage
  localStorage.setItem("settings", JSON.stringify(settings));
  return {
    type: ALLOW_REGISTRATION,
    payload: settings.allowRegistration
  };
};

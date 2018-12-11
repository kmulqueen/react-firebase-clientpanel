import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "../actions/types";

// Actions
export default function(state = {}, action) {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        // The payload toggles true/false values (see settingsActions.js)
        disableBalanceOnAdd: action.payload
      };
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalanceOnEdit: action.payload
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowRegistration: action.payload
      };
    default:
      return state;
  }
}

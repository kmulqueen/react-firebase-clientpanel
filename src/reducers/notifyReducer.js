// Whenever we create a reducer, we have to add it to our combinedReducers which is in our store.js
import { NOTIFY_USER } from "../actions/types";

// This is what notify object is equal to in state
const initialState = {
  message: null,
  messageType: null // error or success message
};

// action is an object that comes from actions file
export default function(state = initialState, action) {
  // check type of action
  switch (action.type) {
    case NOTIFY_USER:
      return {
        ...state,
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
}

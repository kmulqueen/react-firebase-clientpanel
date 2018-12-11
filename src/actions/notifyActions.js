import { NOTIFY_USER } from "./types";

// This is being sent to the reducer. Hit the case NOTIFY_USER, and then state will be updated with whatever message and messageType values
export const notifyUser = (message, messageType) => {
  // Return to the reducer, the following. message & messageType are coming in as arguments, which will call on the component
  return {
    type: NOTIFY_USER,
    message,
    messageType
  };
};

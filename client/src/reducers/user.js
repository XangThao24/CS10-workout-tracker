import * as Actions from "../actions/actionDefinitions";

const initialState = {
  message: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.SENDING_RECOVERY_EMAIL:
      return {
        ...state,
        message: action.payload
      };
    case Actions.SEND_EMAIL_SUCCESS:
      return {
        ...state,
        message: "Email sent successfully"
      };
    case Actions.SEND_EMAIL_FAILURE:
      return {
        ...state,
        message: "Email failed to send"
      };
    case Actions.RESETTING_PASSWORD:
      return {
        ...state,
        message: action.payload
      };
    case Actions.RESET_SUCCESS:
      return {
        ...state,
        message: "Password changed successfully"
      };
    case Actions.RESET_FAILURE:
      return {
        ...state,
        message: "Failed to change password"
      };
    default:
      return state;
  }
};

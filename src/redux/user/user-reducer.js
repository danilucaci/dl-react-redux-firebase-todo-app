import UserTypes from "./user-types";
import ADMIN from "./test-user";

export const INITIAL_STATE = {
  currentUser: ADMIN,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.SET_CURRENT_USER: {
      return {
        ...state,
        currentuser: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;

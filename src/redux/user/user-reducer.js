import UserTypes from "./user-types";
import uuid from "uuid";

export const INITIAL_STATE = {
  currentUser: {
    uid: uuid.v4(),
    displayName: "Dani lucaci",
    email: "dani@mail.com",
    avatar: null,
    createdAt: new Date(),
  },
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

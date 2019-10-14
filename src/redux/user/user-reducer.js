import UserTypes from "./user-types";

export const INITIAL_STATE = {
  currentUser: {
    uid: new Date() + Math.random(),
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

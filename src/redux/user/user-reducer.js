import UserTypes from "./user-types";

export const INITIAL_STATE = {
  currentUser: {
    uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
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

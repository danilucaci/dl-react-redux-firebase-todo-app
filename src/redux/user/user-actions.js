import UserTypes from "./user-types";

export const setCurrentUser = ({ currentUser }) => ({
  type: UserTypes.SET_CURRENT_USER,
  payload: currentUser,
});

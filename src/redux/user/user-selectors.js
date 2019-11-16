import { createSelector } from "reselect";

export const selectCurrentUser = (state) => state.user;

export const currentUserSelector = createSelector(
  [selectCurrentUser],
  (user) => user.currentUser,
);

export const userStateSelector = createSelector(
  [selectCurrentUser],
  (user) => user,
);

import { createSelector } from "reselect";

export const selectColors = (state) => Object.values(state.colors.byID);

export const colorsSelector = createSelector(
  [selectColors],
  (colors) => colors,
);

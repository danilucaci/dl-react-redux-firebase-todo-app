import { createSelector } from "reselect";

export const selectColors = (state) => Object.values(state.colors.colors.byID);

export const colorsSelector = createSelector(
  [selectColors],
  (colors) => colors,
);

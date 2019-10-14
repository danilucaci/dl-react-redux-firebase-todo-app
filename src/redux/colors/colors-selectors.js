import { createSelector } from "reselect";

export const selectColors = (state) => state.selectColors;

export const colorsSelector = createSelector(
  [selectColors],
  (colors) => colors.colors,
);

import { createSelector } from "reselect";

export const selectColors = (state) => state.colors.colors;

export const colorsSelector = createSelector(
  [selectColors],
  (colors) => colors,
);

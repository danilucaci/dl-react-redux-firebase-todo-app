import { createSelector } from "reselect";

const selectLabelColors = (state) => state.labelColors;

export const labelColorsSelector = createSelector(
  [selectLabelColors],
  (labelColors) => labelColors.labelColors,
);

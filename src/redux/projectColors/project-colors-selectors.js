import {createSelector} from "reselect"

export const selectProjectColors = state => state.selectProjectColors;

export const projectColorsSelector = createSelector(
  [selectProjectColors],
  (projectColors) => projectColors.projectColors
)
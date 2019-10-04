import { createSelector } from "reselect";

export const selectLabels = (state) => state.labels;

export const labelsSelector = createSelector(
  [selectLabels],
  (labels) => labels.labels,
);

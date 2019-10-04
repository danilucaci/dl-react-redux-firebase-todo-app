import LabelsTypes from "./labels-types";

export const updateLabels = ({ labels }) => ({
  type: LabelsTypes.UPDATE_LABELS,
  payload: labels,
});

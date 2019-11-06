import LabelsTypes from "./labels-types";

export const setLabels = (labels) => ({
  type: LabelsTypes.SET_LABELS,
  payload: labels,
});

export const updateLabels = (labels) => ({
  type: LabelsTypes.UPDATE_LABELS,
  payload: labels,
});

export const addLabel = (label) => ({
  type: LabelsTypes.ADD_LABEL,
  payload: label,
});

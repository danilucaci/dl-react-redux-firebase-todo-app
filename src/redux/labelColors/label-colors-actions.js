import LabelColorsTypes from "./label-colors-types";

export const updateLabelColors = (labelColors) => ({
  type: LabelColorsTypes.UPDATE_LABEL_COLORS,
  payload: labelColors,
});

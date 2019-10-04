import ProjectColorsTypes from "./label-colors-types";

export const updateLabelColors = (projectColors) => ({
  type: ProjectColorsTypes.UPDATE_PROJECT_COLORS,
  payload: projectColors,
});

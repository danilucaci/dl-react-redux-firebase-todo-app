import ColorsTypes from "./colors-types";

export const updateColors = (colors) => ({
  type: ColorsTypes.UPDATE_COLORS,
  payload: colors,
});

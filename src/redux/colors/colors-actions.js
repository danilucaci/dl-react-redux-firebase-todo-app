import ColorsTypes from "./colors-types";

export const setColors = (colors) => ({
  type: ColorsTypes.SET_COLORS,
  payload: colors,
});

export const updateColors = (colors) => ({
  type: ColorsTypes.UPDATE_COLORS,
  payload: colors,
});

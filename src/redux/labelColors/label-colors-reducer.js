import LabelColorsTypes from "./label-colors-types";

export const INITIAL_STATE = {
  labelColors: [
    {
      id: new Date().toString(),
      name: "Blue",
      colorValue: "blue",
    },
  ],
};

const labelColorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LabelColorsTypes.UPDATE_LABEL_COLORS:
      return {
        ...state,
        labelColors: action.payload,
      };
    default:
      return state;
  }
};

export default labelColorsReducer;

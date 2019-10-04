import ProjectColorsTypes from "./project-colors-types";

export const INITIAL_STATE = {
  projectColors: [
    {
      id: new Date().toString(),
      name: "Blue",
      colorValue: "blue",
    },
  ],
};

const projectColorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectColorsTypes.UPDATE_PROJECT_COLORS:
      return {
        ...state,
        projectColors: action.payload,
      };
    default:
      return state;
  }
};

export default projectColorsReducer;

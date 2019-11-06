import ColorsTypes from "./colors-types";

export const INITIAL_STATE = {
  byID: {},
};

const colorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ColorsTypes.SET_COLORS: {
      return {
        ...state,
        byID: { ...state.byID, ...action.payload },
      };
    }
    case ColorsTypes.UPDATE_COLORS: {
      return {
        ...state,
        byID: { ...state.byID, ...action.payload },
      };
    }
    default:
      return state;
  }
};

export default colorsReducer;

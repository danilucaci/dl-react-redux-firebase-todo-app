import ColorsTypes from "./colors-types";

export const INITIAL_STATE = {
  byID: {},
};

const colorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ColorsTypes.SET_COLORS: {
      return {
        ...state,
        byID: { ...action.payload },
      };
    }
    case ColorsTypes.ADD_COLOR: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: action.payload,
        },
      };
    }
    case ColorsTypes.UPDATE_COLOR: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: action.payload,
        },
      };
    }
    case ColorsTypes.REMOVE_COLOR: {
      const { [action.payload]: removedColor, ...otherColors } = state.byID;

      return {
        ...state,
        byID: {
          ...otherColors,
        },
      };
    }
    default:
      return state;
  }
};

export default colorsReducer;

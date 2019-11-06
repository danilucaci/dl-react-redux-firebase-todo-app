import LabelsTypes from "./labels-types";

export const INITIAL_STATE = {
  byID: {},
};

const labelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LabelsTypes.UPDATE_LABELS: {
      return {
        ...state,
        byID: { ...state.byID, ...action.payload },
      };
    }
    case LabelsTypes.ADD_LABEL: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default labelsReducer;

import LabelsTypes from "./labels-types";

export const INITIAL_STATE = {
  byID: {},
};

const labelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LabelsTypes.SET_LABELS: {
      return {
        ...state,
        byID: { ...action.payload },
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
    case LabelsTypes.UPDATE_LABEL: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: {
            ...action.payload,
          },
        },
      };
    }
    case LabelsTypes.REMOVE_LABEL: {
      const { [action.payload]: removedLabel, ...otherLabels } = state.byID;

      return {
        ...state,
        byID: {
          ...otherLabels,
        },
      };
    }
    default:
      return state;
  }
};

export default labelsReducer;

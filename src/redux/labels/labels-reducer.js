import LabelsTypes from "./labels-types";

export const INITIAL_STATE = {
  labels: [
    {
      id: new Date().toString(),
      uid: new Date().toString(),
      name: "pending",
      taskCount: 0,
      color: {
        labelColorID: new Date().toString(),
        colorName: "Blue",
        colorValue: "blue",
      },
    },
  ],
};

const labelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LabelsTypes.UPDATE_LABELS:
      return {
        ...state,
        labels: action.payload,
      };
    default:
      return state;
  }
};

export default labelsReducer;

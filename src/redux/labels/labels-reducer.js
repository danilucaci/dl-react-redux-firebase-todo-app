import LabelsTypes from "./labels-types";

export const INITIAL_STATE = {
  labels: [
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "pending",
      taskCount: 1,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Orange",
        colorValue: "#F19D4B",
      },
    },
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "soon",
      taskCount: 3,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Blue",
        colorValue: "#4B75F6",
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

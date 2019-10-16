import LabelsTypes from "./labels-types";

export const INITIAL_STATE = {
  labels: [
    {
      id: "label-01",
      uid: "user-01",
      name: "pending",
      todosCount: 1,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Orange",
        colorValue: "#F19D4B",
      },
    },
    {
      id: "label-02",
      uid: "user-01",
      name: "soon",
      todosCount: 3,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Teal",
        colorValue: "#428DAA",
      },
    },
    {
      id: "label-03",
      uid: "user-01",
      name: "relax",
      todosCount: 0,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Green",
        colorValue: "#4B9144",
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

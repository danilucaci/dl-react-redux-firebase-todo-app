import LabelsTypes from "./labels-types";

export const INITIAL_STATE = {
  labels: [
    {
      id: "fb1d5a40-b853-434d-a3e3-0f19eb4e9430",
      uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
      name: "pending",
      todosCount: 1,
      color: {
        colorID: "050211ec-448b-48d8-be67-b78222318c0a",
        colorName: "Orange",
        colorValue: "#F19D4B",
      },
    },
    {
      id: "d0fd61ff-87e0-4c36-9386-dada2cdadb56",
      uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
      name: "soon",
      todosCount: 3,
      color: {
        colorID: "1fb29f8d-7d81-4daf-9b3d-3dfbce5e4384",
        colorName: "Teal",
        colorValue: "#428DAA",
      },
    },
    {
      id: "e56b81a2-af3b-4364-8dbb-e1ed6e5edeec",
      uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
      name: "relax",
      todosCount: 0,
      color: {
        colorID: "f05c3cc2-6e2e-449c-a0ef-b36563370ec7",
        colorName: "Green",
        colorValue: "#4B9144",
      },
    },
  ],
};

const labelsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LabelsTypes.UPDATE_LABELS: {
      return {
        ...state,
        labels: action.payload,
      };
    }
    case LabelsTypes.ADD_LABEL: {
      return {
        ...state,
        labels: [...state.labels, action.payload],
      };
    }
    default:
      return state;
  }
};

export default labelsReducer;

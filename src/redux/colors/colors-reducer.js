import ColorsTypes from "./colors-types";
import uuid from "uuid";

export const INITIAL_STATE = {
  colors: [
    {
      id: uuid.v4(),
      colorName: "Berry Red",
      colorValue: "#A9345F",
    },
    {
      id: uuid.v4(),
      colorName: "Red",
      colorValue: "#CA4C3E",
    },
    {
      id: uuid.v4(),
      colorName: "Orange",
      colorValue: "#F19D4B",
    },
    {
      id: uuid.v4(),
      colorName: "Yellow",
      colorValue: "#F3D046",
    },
    {
      id: uuid.v4(),
      colorName: "Olive Green",
      colorValue: "#B1B751",
    },
    {
      id: uuid.v4(),
      colorName: "Lime Green",
      colorValue: "#90C95C",
    },
    {
      id: uuid.v4(),
      colorName: "Green",
      colorValue: "#4B9144",
    },
    {
      id: uuid.v4(),
      colorName: "Mint Green",
      colorValue: "#82CABC",
    },
    {
      id: uuid.v4(),
      colorName: "Teal",
      colorValue: "#428DAA",
    },
    {
      id: uuid.v4(),
      colorName: "Sky Blue",
      colorValue: "#4EA9EF",
    },
    {
      id: uuid.v4(),
      colorName: "Light Blue",
      colorValue: "#9FC2E7",
    },
    {
      id: uuid.v4(),
      colorName: "Blue",
      colorValue: "#4B75F6",
    },
    {
      id: uuid.v4(),
      colorName: "Grape",
      colorValue: "#7F55F6",
    },
    {
      id: uuid.v4(),
      colorName: "Violet",
      colorValue: "#A146E3",
    },
    {
      id: uuid.v4(),
      colorName: "Lavender",
      colorValue: "#DF9BE6",
    },
    {
      id: uuid.v4(),
      colorName: "Magenta",
      colorValue: "#D05C92",
    },
    {
      id: uuid.v4(),
      colorName: "Salmon",
      colorValue: "#F09389",
    },
    {
      id: uuid.v4(),
      colorName: "Charcoal",
      colorValue: "#808080",
    },
    {
      id: uuid.v4(),
      colorName: "Grey",
      colorValue: "#B8B8B8",
    },
    {
      id: uuid.v4(),
      colorName: "Blue Grey",
      colorValue: "#2E3D5C",
    },
  ],
};

const colorsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ColorsTypes.UPDATE_COLORS:
      return {
        ...state,
        colors: action.payload,
      };
    default:
      return state;
  }
};

export default colorsReducer;

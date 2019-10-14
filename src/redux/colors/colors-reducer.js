import ColorsTypes from "./colors-types";

export const INITIAL_STATE = {
  colors: [
    {
      id: new Date() + Math.random(),
      colorName: "Berry Red",
      colorValue: "#A9345F",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Red",
      colorValue: "#CA4C3E",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Orange",
      colorValue: "#F19D4B",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Yellow",
      colorValue: "#F3D046",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Olive Green",
      colorValue: "#B1B751",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Lime Green",
      colorValue: "#90C95C",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Green",
      colorValue: "#4B9144",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Mint Green",
      colorValue: "#82CABC",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Teal",
      colorValue: "#428DAA",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Sky Blue",
      colorValue: "#4EA9EF",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Light Blue",
      colorValue: "#9FC2E7",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Blue",
      colorValue: "#4B75F6",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Grape",
      colorValue: "#7F55F6",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Violet",
      colorValue: "#A146E3",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Lavender",
      colorValue: "#DF9BE6",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Magenta",
      colorValue: "#D05C92",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Salmon",
      colorValue: "#F09389",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Charcoal",
      colorValue: "#808080",
    },
    {
      id: new Date() + Math.random(),
      colorName: "Grey",
      colorValue: "#B8B8B8",
    },
    {
      id: new Date() + Math.random(),
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

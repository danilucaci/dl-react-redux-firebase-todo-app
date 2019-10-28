import ColorsTypes from "./colors-types";

export const INITIAL_STATE = {
  colors: [
    {
      id: "885b68f6-e1c2-4cb8-96dd-067f5f4cbc02",
      colorName: "Berry Red",
      colorValue: "#A9345F",
    },
    {
      id: "f02c4c56-20f1-4dd7-b580-dae2c44ce67c",
      colorName: "Red",
      colorValue: "#CA4C3E",
    },
    {
      id: "050211ec-448b-48d8-be67-b78222318c0a",
      colorName: "Orange",
      colorValue: "#F19D4B",
    },
    {
      id: "6378f246-a606-4880-9deb-a03d023de3cb",
      colorName: "Yellow",
      colorValue: "#F3D046",
    },
    {
      id: "4df80434-f00d-42f0-a41c-856117f03ef3",
      colorName: "Olive Green",
      colorValue: "#B1B751",
    },
    {
      id: "c62bca8f-d302-41b7-9125-7c9264540553",
      colorName: "Lime Green",
      colorValue: "#90C95C",
    },
    {
      id: "f05c3cc2-6e2e-449c-a0ef-b36563370ec7",
      colorName: "Green",
      colorValue: "#4B9144",
    },
    {
      id: "39201c56-2f88-4cbf-bd3f-fc27ed4c8c41",
      colorName: "Mint Green",
      colorValue: "#82CABC",
    },
    {
      id: "1fb29f8d-7d81-4daf-9b3d-3dfbce5e4384",
      colorName: "Teal",
      colorValue: "#428DAA",
    },
    {
      id: "e3ea5f8a-56c4-463f-a9cb-56ebdcd722e3",
      colorName: "Sky Blue",
      colorValue: "#4EA9EF",
    },
    {
      id: "bdcbbf73-b8f1-497d-b1b9-73c3752113f4",
      colorName: "Light Blue",
      colorValue: "#9FC2E7",
    },
    {
      id: "708e7d97-ed5c-46ac-803d-52afef868f2a",
      colorName: "Blue",
      colorValue: "#4B75F6",
    },
    {
      id: "492fbadb-dcff-4d0e-a28f-7b1c0b92bc4c",
      colorName: "Grape",
      colorValue: "#7F55F6",
    },
    {
      id: "0a75af47-4242-48d3-a194-77224b71f741",
      colorName: "Violet",
      colorValue: "#A146E3",
    },
    {
      id: "34cc9ddd-1f7a-4133-a6d1-4fa113d58ff6",
      colorName: "Lavender",
      colorValue: "#DF9BE6",
    },
    {
      id: "d899969b-bcc1-4d38-aa5b-f2b6d85caa97",
      colorName: "Magenta",
      colorValue: "#D05C92",
    },
    {
      id: "11c5e4dd-1724-4eaf-87cc-a410ad0ed272",
      colorName: "Salmon",
      colorValue: "#F09389",
    },
    {
      id: "c23ebe3f-27cb-4d92-aef3-0cb665188af1",
      colorName: "Charcoal",
      colorValue: "#808080",
    },
    {
      id: "5574966f-17d3-455f-bcfc-73fcf767762e",
      colorName: "Grey",
      colorValue: "#B8B8B8",
    },
    {
      id: "3e52a57c-f234-41ba-9427-a6c0d4e65b31",
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

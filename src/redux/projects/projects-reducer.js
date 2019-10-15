import ProjectsTypes from "./projects-types";

export const INITIAL_STATE = {
  projects: [
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "Inbox",
      todosCount: 2,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Grey",
        colorValue: "#B8B8B8",
      },
    },
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "Personal",
      todosCount: 2,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
    },
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "Work",
      todosCount: 12,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Mint Green",
        colorValue: "#82CABC",
      },
    },
  ],
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectsTypes.UPDATE_PROJECTS: {
      return {
        ...state,
        projects: action.payload,
      };
    }
    default:
      return state;
  }
};

export default projectsReducer;

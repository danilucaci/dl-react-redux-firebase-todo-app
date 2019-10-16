import ProjectsTypes from "./projects-types";

export const INITIAL_STATE = {
  projects: [
    {
      id: "project-01",
      uid: "user-01",
      name: "Inbox",
      todosCount: 2,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Grey",
        colorValue: "#B8B8B8",
      },
    },
    {
      id: "project-02",
      uid: "project-02",
      name: "Personal",
      todosCount: 2,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
    },
    {
      id: "project-03",
      uid: "project-03",
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

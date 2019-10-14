import ProjectsTypes from "./projects-types";

export const INITIAL_STATE = {
  projects: [
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "Personal",
      taskCount: 2,
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
      taskCount: 12,
      color: {
        colorID: new Date() + Math.random(),
        colorName: "Charcoal",
        colorValue: "#808080",
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

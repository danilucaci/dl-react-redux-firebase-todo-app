import ProjectsTypes from "./projects-types";

export const INITIAL_STATE = {
  projects: [
    {
      id: new Date().toString(),
      uid: new Date().toString(),
      name: "Personal",
      taskCount: 0,
      color: {
        projectColorID: new Date().toString(),
        colorName: "Purple",
        colorValue: "purple",
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

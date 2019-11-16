import ProjectsTypes from "./projects-types";

export const INITIAL_STATE = {
  byID: {},
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectsTypes.SET_PROJECTS: {
      return {
        ...state,
        byID: { ...action.payload },
      };
    }
    case ProjectsTypes.ADD_PROJECT: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: action.payload,
        },
      };
    }
    case ProjectsTypes.UPDATE_PROJECT: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: action.payload,
        },
      };
    }
    case ProjectsTypes.REMOVE_PROJECT: {
      const { [action.payload]: removedProject, ...otherProjects } = state.byID;

      return {
        ...state,
        byID: {
          ...otherProjects,
        },
      };
    }
    default:
      return state;
  }
};

export default projectsReducer;

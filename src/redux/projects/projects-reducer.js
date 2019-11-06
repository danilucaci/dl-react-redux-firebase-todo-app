import ProjectsTypes from "./projects-types";

export const INITIAL_STATE = {
  byID: {},
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectsTypes.SET_PROJECTS: {
      return {
        ...state,
        byID: { ...state.byID, ...action.payload },
      };
    }
    case ProjectsTypes.UPDATE_PROJECTS: {
      return {
        ...state,
        byID: { ...state.byID, ...action.payload },
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
    default:
      return state;
  }
};

export default projectsReducer;

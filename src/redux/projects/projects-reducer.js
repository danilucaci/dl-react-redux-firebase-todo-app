import ProjectsTypes from "./projects-types";
import uuid from "uuid";

export const INITIAL_STATE = {
  projects: [
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Inbox",
      todosCount: 2,
      color: {
        colorID: uuid.v4(),
        colorName: "Grey",
        colorValue: "#B8B8B8",
      },
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Personal",
      todosCount: 2,
      color: {
        colorID: uuid.v4(),
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Work",
      todosCount: 12,
      color: {
        colorID: uuid.v4(),
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
    case ProjectsTypes.ADD_PROJECT: {
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    }
    default:
      return state;
  }
};

export default projectsReducer;

import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";
import projectsReducer from "./projects/projects-reducer";
import colorsReducer from "./colors/colors-reducer";
import labelsReducer from "./labels/labels-reducer";
import todosReducer from "./todos/todos-reducer";
import localStateReducer from "./localState/localState-reducer";

export default combineReducers({
  user: userReducer,
  projects: projectsReducer,
  colors: colorsReducer,
  labels: labelsReducer,
  todos: todosReducer,
  localState: localStateReducer,
});

import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";
import projectsReducer from "./projects/projects-reducer";
import projectColorsReducer from "./projectColors/project-colors-reducer";
import labelsReducer from "./labels/labels-reducer";
import labelColorsReducer from "./labelColors/label-colors-reducer";
import todosReducer from "./todos/todos-reducer";

export default combineReducers({
  user: userReducer,
  projects: projectsReducer,
  projectColors: projectColorsReducer,
  labels: labelsReducer,
  labelColors: labelColorsReducer,
  todos: todosReducer,
});

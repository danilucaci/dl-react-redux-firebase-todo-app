import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root-reducer";

import * as ReselectTools from "reselect-tools";
import * as colorsSelectors from "./colors/colors-selectors";
import * as projectsSelectors from "./projects/projects-selectors";
import * as labelsSelectors from "./labels/labels-selectors";
import * as todosSelectors from "./todos/todos-selectors";
import * as localStateSelectors from "./localState/localState-selectors";

const middlewares = [];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

ReselectTools.registerSelectors(
  todosSelectors,
  colorsSelectors,
  projectsSelectors,
  labelsSelectors,
  localStateSelectors,
);

ReselectTools.selectorGraph();

ReselectTools.getStateWith(() => store.getState());

export default store;

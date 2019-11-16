import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root-reducer";

import * as ReselectTools from "reselect-tools";
import * as colorsSelectors from "./colors/colors-selectors";
import * as projectsSelectors from "./projects/projects-selectors";
import * as labelsSelectors from "./labels/labels-selectors";
import * as todosSelectors from "./todos/todos-selectors";
import * as localStateSelectors from "./localState/localState-selectors";

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["localState"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);

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

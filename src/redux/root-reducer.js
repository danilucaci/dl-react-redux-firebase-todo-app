import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import projectsReducer from "./projects/projects-reducer";
import colorsReducer from "./colors/colors-reducer";
import labelsReducer from "./labels/labels-reducer";
import todosReducer from "./todos/todos-reducer";
import localStateReducer from "./localState/localState-reducer";

const RESET_STORE_AND_LOG_OUT = "RESET_STORE_AND_LOG_OUT";

/**
 * Passes `undefined` to all reducers to set their state to the `INITIAL_VALUE`
 *
 * @see https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
 */
export const resetStoreAndLogOut = () => ({
  type: RESET_STORE_AND_LOG_OUT,
});

export const appReducer = combineReducers({
  user: userReducer,
  projects: projectsReducer,
  colors: colorsReducer,
  labels: labelsReducer,
  todos: todosReducer,
  localState: localStateReducer,
});

/**
 * Reducers are supposed to return the initial state
 * when they are called with undefined as the first argument,
 * no matter the action.abs
 *
 * Now, whenever `LOG_OUT` fires, all reducers will be initialized anew.
 * They can also return something different than they did initially
 * if they want to because they can check `action.type` as well.
 *
 * @see https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
 *
 * If you need to keep a piece of the state and reset everything else,
 * capture the part of the state that you want to keep (in this example it’s `articles`),
 * set `state` to be `articles` and return the new `state`.
 *
 * `articles` will have the previous values but every other part of state will receive `undefined`
 * and each reducer will return the initial default `INITIAL_STATE`.
 *
 * @example
 * const rootReducer = (state, action) => {
 *   if (action.type === 'RESET_APP') {
 *     const { articles } = state;
 *     state = { articles };
 *   }
 *
 *   return allReducers(state, action);
 * };
 */

const rootReducer = (state, action) => {
  if (action.type === RESET_STORE_AND_LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;

import { createSelector } from "reselect";

export const selectTodos = (state) => state.todos;

export const todosSelector = createSelector(
  [selectTodos],
  (todos) => todos.todos,
);

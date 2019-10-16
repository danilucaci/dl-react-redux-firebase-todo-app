import { createSelector } from "reselect";

import { isPastDate, isFutureDate } from "../../utils/dates";

export const selectProject = (state, projectID) =>
  state.projects.projects.filter((project) => project.id === projectID);

export const selectProjects = (state) =>
  state.projects.projects.filter((project) => project.name !== "Inbox");

export const selectProjectTodos = (state, projectID) =>
  state.todos.todos.filter((todo) => todo.project.projectID === projectID);

export const projectsSelector = createSelector(
  [selectProjects],
  (projects) => projects,
);

export const projectSelector = createSelector(
  [selectProject],
  (project) => project[0],
);

export const projectOverdueTodosSelector = createSelector(
  [selectProjectTodos],
  (todos) => todos.filter((todo) => isPastDate(todo.dueDate)),
);

export const projectNotOverdueTodosSelector = createSelector(
  [selectProjectTodos],
  (todos) => todos.filter((todo) => isFutureDate(todo.dueDate)),
);

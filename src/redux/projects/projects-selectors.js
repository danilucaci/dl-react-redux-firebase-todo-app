import { createSelector } from "reselect";

import { INBOX_PROJECT_IDENTIFIER } from "../../constants/collections";

import { isPastDate, isFutureDate } from "../../utils/dates";
import { allTodosSelector } from "../todos/todos-selectors";

export const selectProject = (state, projectID) =>
  state.projects.byID[projectID];

export const makeProjectSelector = () =>
  createSelector([selectProject], (project) => project);

export const selectAllProjectsObject = (state) => state.projects.byID;

export const allProjectsSelector = createSelector(
  [selectAllProjectsObject],
  (projects) => Object.values(projects),
);

export const notInboxProjectsSelector = createSelector(
  [allProjectsSelector],
  (projects) =>
    projects.filter(
      (project) =>
        project.hasOwnProperty(INBOX_PROJECT_IDENTIFIER) &&
        !project[INBOX_PROJECT_IDENTIFIER],
    ),
);

export const notInboxProjectIdsSelector = createSelector(
  [allProjectsSelector],
  (projects) =>
    projects
      .filter(
        (project) =>
          project.hasOwnProperty(INBOX_PROJECT_IDENTIFIER) &&
          !project[INBOX_PROJECT_IDENTIFIER],
      )
      .map((project) => project.id),
);

export const inboxProjectSelector = createSelector(
  [allProjectsSelector],
  (projects) => {
    const array = projects.filter(
      (project) =>
        project.hasOwnProperty(INBOX_PROJECT_IDENTIFIER) &&
        project[INBOX_PROJECT_IDENTIFIER],
    );

    return array[0];
  },
);

export const makeProjectTodosCountSelector = () =>
  createSelector([allTodosSelector, selectProject], (todos, project) => {
    const filteredTodos = todos.filter(
      (todo) =>
        todo.hasOwnProperty("project") &&
        todo.project.hasOwnProperty("projectID") &&
        todo.project.projectID === project.id,
    );

    return filteredTodos.length;
  });

export const makeProjectOverdueTodosSelector = () =>
  createSelector([allTodosSelector, selectProject], (todos, project) => {
    const filteredTodos = todos
      .filter(
        (todo) =>
          todo.hasOwnProperty("project") &&
          todo.project.hasOwnProperty("projectID") &&
          todo.project.projectID === project.id,
      )
      .filter((todo) => isPastDate(todo.dueDate))
      .map((todo) => todo.id);

    return filteredTodos;
  });

export const makeProjectNotOverdueTodosSelector = () =>
  createSelector([allTodosSelector, selectProject], (todos, project) => {
    const filteredTodos = todos
      .filter(
        (todo) =>
          todo.hasOwnProperty("project") &&
          todo.project.hasOwnProperty("projectID") &&
          todo.project.projectID === project.id,
      )
      .filter((todo) => isFutureDate(todo.dueDate) || todo.dueDate === null)
      .map((todo) => todo.id);

    return filteredTodos;
  });

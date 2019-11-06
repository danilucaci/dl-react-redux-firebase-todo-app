import { createSelector } from "reselect";

import { isPastDate, isFutureDate } from "../../utils/dates";

export const selectLabel = (state, labelID) => state.labels.byID[labelID];

export const selectLabels = (state) => Object.values(state.labels.byID);

export const selectTodosWithLabels = (state) =>
  // Boolean(null) => false
  Object.values(state.todos.todos.byID).filter((todo) => Boolean(todo.labels));

export const selectLabelTodos = (state, labelID) => {
  return selectTodosWithLabels(state).filter((todo) => {
    const includesPropsLabel = todo.labels.filter(
      (label) => label.labelID === labelID,
    );

    // includesPropsLabel => [] || [todos]
    return includesPropsLabel.length > 0 ? true : false;
  });
};

export const labelsSelector = createSelector(
  [selectLabels],
  (labels) => labels,
);

export const labelSelector = createSelector(
  [selectLabel],
  (label) => label,
);

export const labelOverdueTodosSelector = createSelector(
  [selectLabelTodos],
  (todos) =>
    todos.filter((todo) => isPastDate(todo.dueDate)).map((todo) => todo.id),
);

export const labelNotOverdueTodosSelector = createSelector(
  [selectLabelTodos],
  (todos) =>
    todos
      .filter((todo) => isFutureDate(todo.dueDate) || todo.dueDate === null)
      .map((todo) => todo.id),
);

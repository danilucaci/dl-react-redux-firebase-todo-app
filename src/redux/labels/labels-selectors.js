import { createSelector } from "reselect";

import { isPastDate, isFutureDate } from "../../utils/dates";

export const selectLabel = (state, labelID) =>
  state.labels.labels.filter((label) => label.id === labelID);

export const selectLabels = (state) => state.labels.labels;

export const selectTodosWithLabels = (state) =>
  // Boolean(null) => false
  state.todos.todos.filter((todo) => Boolean(todo.labels));

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
  (label) => label[0],
);

export const labelOverdueTodosSelector = createSelector(
  [selectLabelTodos],
  (todos) => todos.filter((todo) => isPastDate(todo.dueDate)),
);

export const labelNotOverdueTodosSelector = createSelector(
  [selectLabelTodos],
  (todos) => todos.filter((todo) => isFutureDate(todo.dueDate)),
);

import { createSelector } from "reselect";

import { isPastDate, isFutureDate } from "../../utils/dates";
import { allTodosSelector } from "../todos/todos-selectors";

export const selectLabel = (state, labelID) => state.labels.byID[labelID];

export const makeLabelSelector = () =>
  createSelector([selectLabel], (label) => label);

export const selectLabelsObject = (state) => state.labels.byID;

export const allLabelsSelector = createSelector(
  [selectLabelsObject],
  (labels) => Object.values(labels),
);

export const labelTodosSelector = createSelector(
  [allTodosSelector, makeLabelSelector()],
  (allTodos, selectedLabel) =>
    allTodos
      // Filter out todos that have no labels ({label: null})
      // Boolean(null) => false
      .filter((todo) => Boolean(todo.labels))
      .filter((todo) => {
        const includesPropsLabel = todo.labels.filter(
          (label) => label.labelID === selectedLabel.id,
        );

        // includesPropsLabel => [] || [todos]
        return includesPropsLabel.length > 0 ? true : false;
      }),
);

export const labelIdsSelector = createSelector([allLabelsSelector], (labels) =>
  labels.map((label) => label.id),
);

export const makeLabelOverdueTodosSelector = () =>
  createSelector([labelTodosSelector], (todos) =>
    todos.filter((todo) => isPastDate(todo.dueDate)).map((todo) => todo.id),
  );

export const makeLabelNotOverdueTodosSelector = () =>
  createSelector([labelTodosSelector], (todos) =>
    todos
      .filter((todo) => isFutureDate(todo.dueDate) || todo.dueDate === null)
      .map((todo) => todo.id),
  );

export const makeLabelTodosCountSelector = () =>
  createSelector([labelTodosSelector], (todos) => todos.length);

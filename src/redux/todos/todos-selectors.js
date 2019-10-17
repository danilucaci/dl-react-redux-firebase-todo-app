import { createSelector } from "reselect";
import {
  isPastDate,
  isFutureDate,
  isTodayDate,
  getNthDate,
} from "../../utils/dates";

export const selectTodos = (state) => state.todos.todos;

export const inboxTodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => todo.project.name === "Inbox"),
);

export const notOverdueInboxTodosSelector = createSelector(
  [inboxTodosSelector],
  (todos) =>
    todos.filter((todo) => isFutureDate(todo.dueDate) || todo.dueDate === null),
);

export const overdueInboxTodosSelector = createSelector(
  [inboxTodosSelector],
  (todos) => todos.filter((todo) => isPastDate(todo.dueDate)),
);

export const todayTodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => isTodayDate(todo.dueDate)),
);

export const overdueTodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => isPastDate(todo.dueDate)),
);

export const notOverdueTodayTodosSelector = createSelector(
  [todayTodosSelector],
  (todos) =>
    todos.filter((todo) => isFutureDate(todo.dueDate) || todo.dueDate === null),
);

export const nextDaysPlus1TodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => getNthDate(todo.dueDate, 1)),
);

export const nextDaysPlus2TodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => getNthDate(todo.dueDate, 2)),
);

export const nextDaysPlus3TodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => getNthDate(todo.dueDate, 3)),
);

export const nextDaysPlus4TodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => getNthDate(todo.dueDate, 4)),
);

export const nextDaysPlus5TodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => getNthDate(todo.dueDate, 5)),
);

export const nextDaysPlus6TodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => getNthDate(todo.dueDate, 6)),
);

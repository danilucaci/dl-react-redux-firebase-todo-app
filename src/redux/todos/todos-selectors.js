import { createSelector } from "reselect";
import {
  isPastDate,
  isFutureDate,
  isTodayDate,
  getNthDate,
} from "../../utils/dates";

export const selectTodos = (state) =>
  Object.values(state.todos.byID).map((todo) => todo);

export const selectTodo = (state, todoID) => state.todos.byID[todoID];

export const todoSelector = createSelector(
  [selectTodo],
  (todo) => todo,
);

export const inboxTodosSelector = createSelector(
  [selectTodos],
  (todos) => todos.filter((todo) => todo.project.name === "Inbox"),
);

export const notOverdueInboxTodosSelector = createSelector(
  [inboxTodosSelector],
  (todos) =>
    todos
      .filter((todo) => isFutureDate(todo.dueDate) || todo.dueDate === null)
      .map((todo) => todo.id),
);

export const overdueInboxTodosSelector = createSelector(
  [inboxTodosSelector],
  (todos) =>
    todos.filter((todo) => isPastDate(todo.dueDate)).map((todo) => todo.id),
);

export const todayTodosSelector = createSelector(
  [selectTodos],
  (todos) =>
    todos.filter((todo) => isTodayDate(todo.dueDate)).map((todo) => todo.id),
);

export const overdueTodosSelector = createSelector(
  [selectTodos],
  (todos) =>
    todos.filter((todo) => isPastDate(todo.dueDate)).map((todo) => todo.id),
);

export const notOverdueTodayTodosSelector = createSelector(
  [todayTodosSelector],
  (todos) =>
    todos
      .filter((todo) => isFutureDate(todo.dueDate) || todo.dueDate === null)
      .map((todo) => todo.id),
);

export const nextDaysPlus1TodosSelector = createSelector(
  [selectTodos],
  (todos) =>
    todos.filter((todo) => getNthDate(todo.dueDate, 1)).map((todo) => todo.id),
);

export const nextDaysPlus2TodosSelector = createSelector(
  [selectTodos],
  (todos) =>
    todos.filter((todo) => getNthDate(todo.dueDate, 2)).map((todo) => todo.id),
);

export const nextDaysPlus3TodosSelector = createSelector(
  [selectTodos],
  (todos) =>
    todos.filter((todo) => getNthDate(todo.dueDate, 3)).map((todo) => todo.id),
);

export const nextDaysPlus4TodosSelector = createSelector(
  [selectTodos],
  (todos) =>
    todos.filter((todo) => getNthDate(todo.dueDate, 4)).map((todo) => todo.id),
);

export const nextDaysPlus5TodosSelector = createSelector(
  [selectTodos],
  (todos) =>
    todos.filter((todo) => getNthDate(todo.dueDate, 5)).map((todo) => todo.id),
);

export const nextDaysPlus6TodosSelector = createSelector(
  [selectTodos],
  (todos) =>
    todos.filter((todo) => getNthDate(todo.dueDate, 6)).map((todo) => todo.id),
);

import TodosTypes from "./todos-types";

export const updateTodos = ({ todos }) => ({
  type: TodosTypes.UPDATE_TODOS,
  payload: todos,
});

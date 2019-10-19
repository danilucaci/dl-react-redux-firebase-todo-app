import TodosTypes from "./todos-types";

export const updateTodos = ({ todos }) => ({
  type: TodosTypes.UPDATE_TODOS,
  payload: todos,
});

export const toggleTodoCompleted = (todoID) => {
  console.log(todoID);
  return {
    type: TodosTypes.TOGGLE_TODO_COMPLETED,
    payload: todoID,
  };
};

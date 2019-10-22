import TodosTypes from "./todos-types";

export const updateTodos = ({ todos }) => ({
  type: TodosTypes.UPDATE_TODOS,
  payload: todos,
});

export const toggleTodoCompleted = (todoID) => {
  return {
    type: TodosTypes.TOGGLE_TODO_COMPLETED,
    payload: todoID,
  };
};

export const addTodo = (todo) => {
  return {
    type: TodosTypes.ADD_TODO,
    payload: todo,
  };
};

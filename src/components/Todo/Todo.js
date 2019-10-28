import React, { useState } from "react";
import { string } from "prop-types";

import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

export function Todo({ todoID }) {
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  return isEditingTodo ? (
    <TodoForm
      todoID={todoID}
      isEditingTodo={isEditingTodo}
      setIsEditingTodo={setIsEditingTodo}
    />
  ) : (
    <TodoItem todoID={todoID} setIsEditingTodo={setIsEditingTodo} />
  );
}

Todo.propTypes = {
  todoID: string.isRequired,
};

export default Todo;

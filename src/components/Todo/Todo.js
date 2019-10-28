import React, { useState } from "react";
import { string } from "prop-types";

import TodoFormContainer from "../../redux/containers/components/TodoFormContainer";
import TodoItemContainer from "../../redux/containers/components/TodoItemContainer";

export function Todo({ todoID }) {
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  return isEditingTodo ? (
    <TodoFormContainer
      todoID={todoID}
      isEditingTodo={isEditingTodo}
      setIsEditingTodo={setIsEditingTodo}
    />
  ) : (
    <TodoItemContainer todoID={todoID} setIsEditingTodo={setIsEditingTodo} />
  );
}

Todo.propTypes = {
  todoID: string.isRequired,
};

export default Todo;

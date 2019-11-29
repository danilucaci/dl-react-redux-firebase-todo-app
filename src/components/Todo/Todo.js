import React, { memo, useState, useCallback } from "react";
import { string } from "prop-types";

import TodoFormContainer from "../../redux/containers/components/TodoFormContainer";
import TodoItemContainer from "../../redux/containers/components/TodoItemContainer";

export function Todo({ todoID, prev, next }) {
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  const toggleVisibility = useCallback(
    () => setIsEditingTodo(!isEditingTodo),

    [isEditingTodo],
  );

  return isEditingTodo ? (
    <TodoFormContainer
      todoID={todoID}
      isVisible={isEditingTodo}
      toggleVisibility={toggleVisibility}
    />
  ) : (
    <TodoItemContainer
      todoID={todoID}
      prev={prev}
      next={next}
      isVisible={isEditingTodo}
      toggleVisibility={toggleVisibility}
    />
  );
}

Todo.propTypes = {
  todoID: string.isRequired,
  prev: string,
  next: string,
};

Todo.defaultProps = {
  prev: undefined,
  next: undefined,
};

export default memo(Todo);

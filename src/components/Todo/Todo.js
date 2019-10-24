import React, { useState } from "react";
import { arrayOf, object, shape, string, bool } from "prop-types";

import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

export function Todo(props) {
  const { todo } = props;
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  return isEditingTodo ? (
    <TodoForm
      todo={todo}
      isEditingTodo={isEditingTodo}
      setIsEditingTodo={setIsEditingTodo}
    />
  ) : (
    <TodoItem todo={todo} setIsEditingTodo={setIsEditingTodo} />
  );
}

Todo.propTypes = {
  todo: shape({
    labels: arrayOf(
      shape({
        labelID: string,
        name: string,
        colorName: string,
        colorValue: string,
      }),
    ),
    project: shape({
      projectID: string.isRequired,
      name: string.isRequired,
      colorName: string.isRequired,
      colorValue: string.isRequired,
    }).isRequired,
    dueDate: object,
    completed: bool.isRequired,
    name: string.isRequired,
    uid: string.isRequired,
    id: string.isRequired,
  }),
};

Todo.defaultProps = {
  todo: {
    labels: null,
    dueDate: null,
  },
};

export default Todo;

import React, { useState } from "react";
import { arrayOf, object, shape, string, bool } from "prop-types";

import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

export function Todo(props) {
  const { labels, project, dueDate, completed, todoLabel, id } = props;
  const [isEditingTodo, setIsEditingTodo] = useState(false);

  return isEditingTodo ? (
    <TodoForm
      labels={labels}
      project={project}
      dueDate={dueDate}
      completed={completed}
      isEditingTodo={isEditingTodo}
      setIsEditingTodo={setIsEditingTodo}
      todoLabel={todoLabel}
      id={id}
    />
  ) : (
    <TodoItem
      labels={labels}
      project={project}
      dueDate={dueDate}
      completed={completed}
      isEditingTodo={isEditingTodo}
      setIsEditingTodo={setIsEditingTodo}
      todoLabel={todoLabel}
      id={id}
    />
  );
}

Todo.propTypes = {
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
  todoLabel: string.isRequired,
  id: string.isRequired,
};

Todo.defaultProps = {
  labels: null,
  dueDate: null,
};

export default Todo;

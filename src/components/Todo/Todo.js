import React, { useState } from "react";
import { arrayOf, object, shape, string, bool } from "prop-types";

import TodoForm from "../TodoForm/TodoForm";
import TodoItem from "../TodoItem/TodoItem";

export function Todo(props) {
  const { labels, project, dueDate, completed, todoLabel } = props;
  const [todoEditing, setTodoEditing] = useState(false);

  function handleFormSubmit(e) {
    console.log("Saved");

    setTodoEditing((isEditing) => setTodoEditing(!isEditing));
    e.preventDefault();
  }

  function handleCancelEdit() {
    console.log("Cancelled");

    setTodoEditing((isEditing) => setTodoEditing(!isEditing));
  }

  return todoEditing ? (
    <TodoForm
      labels={labels}
      project={project}
      dueDate={dueDate}
      completed={completed}
      setTodoEditing={setTodoEditing}
      todoLabel={todoLabel}
      handleFormSubmit={handleFormSubmit}
      handleCancelEdit={handleCancelEdit}
    />
  ) : (
    <TodoItem
      labels={labels}
      project={project}
      dueDate={dueDate}
      completed={completed}
      setTodoEditing={setTodoEditing}
      todoLabel={todoLabel}
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
};

Todo.defaultProps = {
  labels: null,
  dueDate: null,
};

export default Todo;

import React, { useState, useRef } from "react";
import { arrayOf, object, shape, string, bool, func } from "prop-types";

import "./TodoForm.styles.scss";

import TextButton from "../TextButton/TextButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import TodoProjectTag from "../TodoProjectTag/TodoProjectTag";
import TodoLabelTag from "../TodoLabelTag/TodoLabelTag";
import { useKeyUpPress, useOnClickOutside, useFocusRef } from "../../hooks";
import TodoDueDate from "../TodoDueDate/TodoDueDate";

export function renderTodoFormLabels(labels) {
  if (!Boolean(labels) || !Array.isArray(labels) || labels.length === 0) {
    return (
      <TodoLabelTag
        labelName="Add Label"
        labelColorValue="#81878f"
        onClick={(e) => e.preventDefault()}
      />
    );
  } else if (Array.isArray(labels) && labels.length === 1) {
    return (
      <TodoLabelTag
        labelName={labels[0].name}
        labelColorValue={labels[0].colorValue}
        onClick={(e) => e.preventDefault()}
      />
    );
  } else if (Array.isArray(labels) && labels.length > 1) {
    return (
      <TodoLabelTag
        labelName={`${labels.length} labels`}
        labelColorValue="#81878f"
        onClick={(e) => e.preventDefault()}
      />
    );
  } else {
    return null;
  }
}

function TodoForm(props) {
  const {
    labels,
    project,
    dueDate,
    todoLabel,
    isEditingTodo,
    setIsEditingTodo,
    // id,
  } = props;

  const [todoValue, setTodoValue] = useState(todoLabel || "");

  const inputRef = useRef();
  const todoWrapperRef = useRef();

  function handleClickOutside() {
    toggleIsEditing();
  }

  useOnClickOutside(todoWrapperRef, handleClickOutside);
  useFocusRef(inputRef);

  useKeyUpPress("Escape", toggleIsEditing);

  function handleFormSubmit(e) {
    e.preventDefault();
    toggleIsEditing();
    console.log(e.target);
  }

  function handleCancelEdit(e) {
    e.preventDefault();
    toggleIsEditing();
    console.log(e.target);
  }

  function toggleIsEditing() {
    if (isEditingTodo) {
      setIsEditingTodo(false);
    }
  }

  return (
    <li className="Todo__Form" ref={todoWrapperRef}>
      <form
        method="post"
        className="Todo__Form__FormWrapper"
        onSubmit={handleFormSubmit}
      >
        <input
          type="text"
          className="Todo__Form__Input"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
          ref={inputRef}
        />
        <div className="Todo__Form__ButtonsContainer">
          <div className="Todo__Form__MetaRow">
            {project && (
              <TodoProjectTag
                buttonAdditionalClasses="Todo__Form__Project"
                projectName={project.name}
                projectColorValue={project.colorValue}
                iconSide="left"
                onClick={(e) => e.preventDefault()}
              />
            )}

            {renderTodoFormLabels(labels)}

            <TodoDueDate
              dueDate={dueDate}
              additionalClasses="Todo__Form__DueDate"
              onClick={(e) => e.preventDefault()}
            />
          </div>

          <div className="Todo__Form__ButtonsRow">
            <TextButton
              additionalClasses="TextButton--Medium"
              onClick={handleCancelEdit}
              type="button"
            >
              Cancel
            </TextButton>
            <PrimaryButton
              type="submit"
              additionalClasses="Todo__Form__SubmitButton PrimaryButton--Medium"
              onClick={() => console.log("Submitted with Primary Button")}
            >
              Save
            </PrimaryButton>
          </div>
        </div>
      </form>
    </li>
  );
}

TodoForm.propTypes = {
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
  setIsEditingTodo: func.isRequired,
  id: string.isRequired,
};

TodoForm.defaultProps = {
  labels: null,
  dueDate: null,
};

export default TodoForm;

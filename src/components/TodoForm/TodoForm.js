import React, { useState, useRef } from "react";
import { arrayOf, object, shape, string, bool, func } from "prop-types";

import "./TodoForm.styles.scss";

import { formatTodoFormDueDate, isPastDate } from "../../utils/dates";
import TextButton from "../TextButton/TextButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import useKeyUpPress from "../../hooks/useKeyUpPress";
import useFocusRef from "../../hooks/useFocusRef";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export function renderDueDateOrSchedule(dueDate) {
  return dueDate ? (
    renderTodoFormDueDateFormat(dueDate)
  ) : (
    <button
      className="Todo__Form__DueDate"
      onClick={(e) => e.preventDefault()}
      type="button"
    >
      Schedule
    </button>
  );
}

export function renderTodoFormDueDateFormat(dueDate) {
  return isPastDate(dueDate) ? (
    <button
      className="Todo__Form__DueDate Todo__Form__DueDate--Overdue"
      onClick={(e) => e.preventDefault()}
      type="button"
    >
      {formatTodoFormDueDate(dueDate)}
    </button>
  ) : (
    <button
      className="Todo__Form__DueDate"
      onClick={(e) => e.preventDefault()}
      type="button"
    >
      {formatTodoFormDueDate(dueDate)}
    </button>
  );
}

export function renderTodoFormLabels(labels) {
  if (!Boolean(labels) || !Array.isArray(labels) || labels.length === 0) {
    return (
      <button
        className="Todo__Form__Label"
        onClick={(e) => e.preventDefault()}
        type="button"
      >
        <svg className="Todo__Form__Label__Icon" fill="#81878f">
          <use xlinkHref="#tag" />
        </svg>
        Add Label
      </button>
    );
  } else if (Array.isArray(labels) && labels.length === 1) {
    return (
      <button
        className="Todo__Form__Label"
        key={labels[0].labelID}
        onClick={(e) => e.preventDefault()}
        type="button"
      >
        <svg className="Todo__Form__Label__Icon" fill={labels[0].colorValue}>
          <use xlinkHref="#tag" />
        </svg>
        {labels[0].name}
      </button>
    );
  } else if (Array.isArray(labels) && labels.length > 1) {
    return (
      <button
        className="Todo__Form__Label"
        onClick={(e) => e.preventDefault()}
        type="button"
      >
        <svg className="Todo__Form__Label__Icon" fill="#81878f">
          <use xlinkHref="#tag" />
        </svg>
        {labels.length} labels
      </button>
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
              <button
                className="Todo__Form__Project"
                onClick={(e) => e.preventDefault()}
                type="button"
              >
                <svg
                  className="Todo__Form__Project__Icon"
                  fill={project.colorValue}
                >
                  <use xlinkHref="#color" />
                </svg>
                {project.name}
              </button>
            )}

            {renderTodoFormLabels(labels)}

            {renderDueDateOrSchedule(dueDate)}
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

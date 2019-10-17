import React, { useState, useEffect, useRef } from "react";
import { arrayOf, object, shape, string, bool, func } from "prop-types";

import "./TodoForm.styles.scss";

import { formatTodoFormDueDate, isPastDate } from "../../utils/dates";
import TextButton from "../TextButton/TextButton";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

export function renderDueDateOrSchedule(dueDate) {
  return dueDate ? (
    renderTodoFormDueDateFormat(dueDate)
  ) : (
    <div className="Todo__Form__DueDate">Schedule</div>
  );
}

export function renderTodoFormDueDateFormat(dueDate) {
  return isPastDate(dueDate) ? (
    <div className="Todo__Form__DueDate Todo__Form__DueDate--Overdue">
      {formatTodoFormDueDate(dueDate)}
    </div>
  ) : (
    <div className="Todo__Form__DueDate">{formatTodoFormDueDate(dueDate)}</div>
  );
}

export function renderTodoFormLabels(labels) {
  if (!Boolean(labels) || !Array.isArray(labels) || labels.length === 0) {
    return (
      <div className="Todo__Form__Label">
        <svg className="Todo__Form__Label__Icon" fill="#81878f">
          <use xlinkHref="#tag" />
        </svg>
        Add Label
      </div>
    );
  } else if (Array.isArray(labels) && labels.length === 1) {
    return (
      <div className="Todo__Form__Label" key={labels[0].labelID}>
        <svg className="Todo__Form__Label__Icon" fill={labels[0].colorValue}>
          <use xlinkHref="#tag" />
        </svg>
        {labels[0].name}
      </div>
    );
  } else if (Array.isArray(labels) && labels.length > 1) {
    return (
      <div className="Todo__Form__Label">
        <svg className="Todo__Form__Label__Icon" fill="#81878f">
          <use xlinkHref="#tag" />
        </svg>
        {labels.length} labels
      </div>
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
    handleFormSubmit,
    handleCancelEdit,
  } = props;

  const [todoValue, setTodoValue] = useState(todoLabel || "");

  return (
    <li className="Todo__Form">
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
        />
        <div className="Todo__Form__ButtonsContainer">
          <div className="Todo__Form__MetaRow">
            {project && (
              <div className="Todo__Form__Project">
                <svg
                  className="Todo__Form__Project__Icon"
                  fill={project.colorValue}
                >
                  <use xlinkHref="#color" />
                </svg>
                {project.name}
              </div>
            )}

            {renderTodoFormLabels(labels)}

            {renderDueDateOrSchedule(dueDate)}
          </div>

          <div className="Todo__Form__ButtonsRow">
            <TextButton
              additionalClasses="TextButton--Medium"
              onClick={handleCancelEdit}
            >
              Cancel
            </TextButton>
            <PrimaryButton additionalClasses="Todo__Form__SubmitButton PrimaryButton--Medium">
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
  setTodoEditing: func.isRequired,
};

TodoForm.defaultProps = {
  labels: null,
  dueDate: null,
};

export default TodoForm;

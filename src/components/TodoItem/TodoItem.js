import React from "react";
import { arrayOf, object, shape, string, bool, func } from "prop-types";
import classnames from "classnames";
import { useDispatch } from "react-redux";

import "./TodoItem.styles.scss";

import { formatTodoDueDate, isPastDate } from "../../utils/dates";
import { toggleTodoCompleted } from "../../redux/todos/todos-actions";

export function renderTodoDueDate(dueDate, setIsEditingTodo) {
  return isPastDate(dueDate) ? (
    <button
      className="Todo__DueDate Todo__DueDate--Overdue"
      onClick={() => setIsEditingTodo(true)}
    >
      {formatTodoDueDate(dueDate)}
    </button>
  ) : (
    <button className="Todo__DueDate" onClick={() => setIsEditingTodo(true)}>
      {formatTodoDueDate(dueDate)}
    </button>
  );
}

function Todo(props) {
  const {
    labels,
    project,
    dueDate,
    completed,
    todoLabel,
    setIsEditingTodo,
    id,
  } = props;

  const todoButtonClassnames = classnames({
    Todo__Button: true,
    [`Todo__Button--Completed`]: completed ? true : false,
  });

  const dispatch = useDispatch();

  return (
    <li className="Todo__Item">
      <button
        className={todoButtonClassnames}
        onClick={() => dispatch(toggleTodoCompleted(id))}
      >
        <svg className="Todo__Button__Icon">
          <use xlinkHref="#check-20" />
        </svg>
      </button>
      <div className="Todo__Item__Contents">
        <div className="Todo__Name__Row">
          <button
            className="Todo__Name"
            tabIndex="0"
            aria-label={`Edit todo ${todoLabel}`}
            onClick={() => setIsEditingTodo(true)}
          >
            {todoLabel}
          </button>
          {project && (
            <button
              className="Todo__Project"
              onClick={() => setIsEditingTodo(true)}
            >
              {project.name}
              <svg className="Todo__Project__Icon" fill={project.colorValue}>
                <use xlinkHref="#color" />
              </svg>
            </button>
          )}
        </div>
        {(labels || dueDate) && (
          <>
            <div className="Todo__Status__Row">
              {labels &&
                labels.map((label) => (
                  <button
                    className="Todo__Label"
                    key={label.labelID}
                    onClick={() => setIsEditingTodo(true)}
                  >
                    <svg className="Todo__Label__Icon" fill={label.colorValue}>
                      <use xlinkHref="#tag" />
                    </svg>
                    {label.name}
                  </button>
                ))}
              {dueDate && renderTodoDueDate(dueDate, setIsEditingTodo)}
            </div>
          </>
        )}
      </div>
    </li>
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
  setIsEditingTodo: func.isRequired,
};

Todo.defaultProps = {
  labels: null,
  dueDate: null,
};

export default Todo;

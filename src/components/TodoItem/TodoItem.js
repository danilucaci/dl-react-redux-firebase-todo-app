import React from "react";
import {
  arrayOf,
  oneOfType,
  instanceOf,
  shape,
  string,
  bool,
  func,
} from "prop-types";
import classnames from "classnames";

import "./TodoItem.styles.scss";

import TodoProjectTag from "../TodoProjectTag/TodoProjectTag";
import TodoLabelTag from "../TodoLabelTag/TodoLabelTag";
import TodoDueDate from "../TodoDueDate/TodoDueDate";

function TodoItem({ todo, isVisible, toggleVisibility, toggleTodoCompleted }) {
  const { id, name, completed, labels, project, dueDate } = todo;

  const todoButtonClassnames = classnames({
    Todo__Button: true,
    [`Todo__Button--Completed`]: completed ? true : false,
  });

  const todoItemClassnames = classnames({
    Todo__Item: true,
  });

  return (
    <li className={todoItemClassnames}>
      <button
        className={todoButtonClassnames}
        onClick={() => toggleTodoCompleted(id)}
      >
        <svg className="Todo__Button__Icon">
          <use xlinkHref="#check-20" />
        </svg>
      </button>
      <div className="Todo__Item__Contents">
        <div className="Todo__Name__Row">
          <button
            className="Todo__Name"
            aria-label={`Edit todo ${name}`}
            onClick={() => toggleVisibility(!isVisible)}
          >
            {name}
          </button>

          {project && (
            <TodoProjectTag
              buttonAdditionalClasses="Todo__Item__Project"
              projectName={project.name}
              projectColorValue={project.colorValue}
              iconSide="right"
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />
          )}
        </div>
        {(labels || dueDate) && (
          <>
            <div className="Todo__Status__Row">
              {labels && (
                <TodoLabelTag
                  labels={labels}
                  isVisible={isVisible}
                  toggleVisibility={toggleVisibility}
                />
              )}
              {dueDate && (
                <TodoDueDate
                  dueDate={dueDate}
                  isVisible={isVisible}
                  toggleVisibility={toggleVisibility}
                />
              )}
            </div>
          </>
        )}
      </div>
    </li>
  );
}

TodoItem.propTypes = {
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
    dueDate: oneOfType([instanceOf(Date), string]),
    completed: bool.isRequired,
    name: string.isRequired,
    uid: string.isRequired,
    id: string.isRequired,
  }),
  isVisible: bool.isRequired,
  toggleVisibility: func.isRequired,
  toggleTodoCompleted: func.isRequired,
};

TodoItem.defaultProps = {
  todo: {
    labels: null,
    dueDate: null,
  },
};

export default TodoItem;

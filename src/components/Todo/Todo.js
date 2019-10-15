import React from "react";
import { node, arrayOf, object, shape, string, bool } from "prop-types";
import classnames from "classnames";

import "./Todo.styles.scss";

import { formatTodoDueDate } from "../../utils/dates";

function Todo(props) {
  const { labels, project, dueDate, completed, children } = props;

  const todoButtonClassnames = classnames({
    Todo__Button: true,
    [`Todo__Button--Completed`]: completed ? true : false,
  });

  return (
    <li className="Todo__Item">
      <button className={todoButtonClassnames}>
        <svg className="Todo__Button__Icon">
          <use xlinkHref="#check-20" />
        </svg>
      </button>
      <div className="Todo__Item__Contents">
        <div className="Todo__Name__Row">
          <span className="Todo__Name">{children}</span>
          {project && (
            <div className="Todo__Project">
              {project.name}
              <svg className="Todo__Project__Icon" fill={project.colorValue}>
                <use xlinkHref="#color" />
              </svg>
            </div>
          )}
        </div>
        {(labels || dueDate) && (
          <>
            <div className="Todo__Status__Row">
              {labels &&
                labels.map((label) => (
                  <div className="Todo__Label" key={label.labelID}>
                    <svg className="Todo__Label__Icon" fill={label.colorValue}>
                      <use xlinkHref="#tag" />
                    </svg>
                    {label.name}
                  </div>
                ))}
              {dueDate && (
                <div className="Todo__DueDate">
                  {formatTodoDueDate(dueDate)}
                </div>
              )}
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
  children: node.isRequired,
};

Todo.defaultProps = {
  labels: null,
  dueDate: null,
};

export default Todo;

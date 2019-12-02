import React, { useEffect, useState, useRef } from "react";
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

import TodoProjectTagContainer from "../../redux/containers/components/TodoProjectTagContainer";
import TodoLabelTagContainer from "../../redux/containers/components/TodoLabelTagContainer";
import TodoItemDueDate from "../TodoItemDueDate/TodoItemDueDate";
import { FALLBACK_FOCUS_BUTTON } from "../../constants/ui";

function TodoItem({
  todo: {
    id,
    name,
    completed,
    labels,
    project,
    dueDate,
    withTime,
    isHighlighted,
    isFocused,
  } = {},
  todo = {},
  prev,
  next,
  isVisible,
  toggleVisibility,
  setTodoCompleted,
  toggleTodoHighlight,
  toggleTodoFocus,
}) {
  const itemRef = useRef(null);
  const addClassTimeoutRef = useRef(null);
  const removeClassTimeoutRef = useRef(null);
  const focusTimeoutRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const todoButtonClassnames = classnames({
    Todo__Button: true,
    [`Todo__Button--Completed`]: completed ? true : false,
  });

  const todoItemClassnames = classnames({
    Todo__Item: true,
    [`Todo__Item--Highlighted`]: isTransitioning,
  });

  useEffect(() => {
    if (isHighlighted && itemRef.current) {
      window.scrollTo({
        behavior: "smooth",
        top: itemRef.current.offsetTop - 16,
      });

      itemRef.current.focus();

      addClassTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(true);
        toggleTodoHighlight({
          id: id,
          isHighlighted: false,
        });
      }, 150);
    }

    return () => {
      if (addClassTimeoutRef.current) {
        clearTimeout(addClassTimeoutRef.current);
      }
    };
  }, [isHighlighted, id, toggleTodoHighlight]);

  useEffect(() => {
    if (isTransitioning) {
      removeClassTimeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 1800);
    }

    return () => {
      if (removeClassTimeoutRef.current) {
        clearTimeout(removeClassTimeoutRef.current);
      }
    };
  }, [isTransitioning]);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();

      focusTimeoutRef.current = setTimeout(() => {
        toggleTodoFocus({
          id: id,
          isFocused: false,
        });
      }, 150);
    }

    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, [id, isFocused, toggleTodoFocus]);

  function handleTodoCompleted() {
    setTodoCompleted(id);

    // If there is a next todo focus it
    if (next) {
      toggleTodoFocus({
        id: next,
        isFocused: true,
      });
      // If there isn’t a next todo but there is a previous todo,
      // focus the previous one
    } else {
      if (!next && prev) {
        toggleTodoFocus({
          id: prev,
          isFocused: true,
        });
      } else {
        // Otherwise move focus to the add new todo button as a fallback
        // when there are no todos to focus
        const fallback = document.getElementById(`#${FALLBACK_FOCUS_BUTTON}`);
        if (fallback) {
          fallback.focus();
        }
      }
    }
  }

  return (
    <li className={todoItemClassnames} aria-label={`todo ${name}`}>
      <button
        className={todoButtonClassnames}
        onClick={handleTodoCompleted}
        data-testid="todo-check-button"
        aria-label={`finish todo: ${name}`}
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
            ref={itemRef}
          >
            {name}
          </button>

          {project && (
            <TodoProjectTagContainer
              buttonAdditionalClasses="Todo__Item__Project"
              projectName={project.name}
              projectColorValue={project.colorValue}
              iconSide="right"
              toggleVisibility={toggleVisibility}
            />
          )}
        </div>
        <div className="Todo__Status__Row">
          {labels && (
            <TodoLabelTagContainer
              labels={labels}
              toggleVisibility={toggleVisibility}
            />
          )}

          <TodoItemDueDate
            dueDate={dueDate}
            hasNewTime={withTime}
            toggleVisibility={toggleVisibility}
          />
        </div>
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
    withTime: bool.isRequired,
    name: string.isRequired,
    uid: string.isRequired,
    id: string.isRequired,
    isHighlighted: bool.isRequired,
  }),
  isVisible: bool.isRequired,
  toggleVisibility: func.isRequired,
  setTodoCompleted: func.isRequired,
  toggleTodoHighlight: func.isRequired,
  toggleTodoFocus: func.isRequired,
};

TodoItem.defaultProps = {
  todo: {
    labels: null,
    dueDate: null,
  },
  prev: undefined,
  next: undefined,
};

export default TodoItem;

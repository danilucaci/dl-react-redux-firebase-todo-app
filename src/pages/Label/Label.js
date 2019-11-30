import React from "react";
import { func, array, string, oneOfType, shape, oneOf } from "prop-types";

import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import AriaText from "../../components/AriaText/AriaText";
import { FALLBACK_FOCUS_BUTTON } from "../../constants/ui";

function Label({ labelTodos, labelOverdueTodos, label, openAddTodoModal }) {
  const labelName = label && label.name ? label.name : "Label";

  return (
    <DashboardMainContainer>
      <h1 className="Page__Title Page__Title--Label">{labelName}</h1>
      {labelOverdueTodos.length ? (
        <section
          className="Section"
          aria-labelledby={`${labelName.toLowerCase()}-overdue-todos-label`}
        >
          <header className="Section__Header">
            <h2
              className="Section__Title"
              id={`${labelName.toLowerCase()}-overdue-todos-label`}
            >
              Overdue
              <AriaText> todos</AriaText>
            </h2>
          </header>
          <ul
            className="Section__Todos__List"
            aria-label={`${labelName} overdue todos`}
          >
            {labelOverdueTodos &&
              labelOverdueTodos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={labelOverdueTodos[index - 1]}
                  next={labelOverdueTodos[index + 1]}
                />
              ))}
          </ul>
        </section>
      ) : null}

      <section className="Section" aria-labelledby="not-overdue-todos-label">
        <header className="Section__Header">
          <h2 className="Section__Title" id="not-overdue-todos-label">
            Todos
          </h2>
        </header>
        <ul className="Section__Todos__List" aria-label={`${labelName} todos`}>
          {labelTodos &&
            labelTodos.map((todoID, index) => (
              <Todo
                key={todoID}
                todoID={todoID}
                prev={labelTodos[index - 1]}
                next={labelTodos[index + 1]}
              />
            ))}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
          id={`#${FALLBACK_FOCUS_BUTTON}`}
        >
          Add todo
        </AddNew>
      </section>
    </DashboardMainContainer>
  );
}

Label.propTypes = {
  labelTodos: array.isRequired,
  labelOverdueTodos: array.isRequired,
  label: shape({
    name: string.isRequired,
    color: oneOfType([
      shape({
        colorID: string,
        colorName: string,
        colorValue: string,
      }),
      oneOf([null]),
    ]),
  }).isRequired,
  openAddTodoModal: func.isRequired,
};

export default withProtectedRoute()(Label);

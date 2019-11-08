import React from "react";
import {
  func,
  array,
  string,
  number,
  oneOfType,
  shape,
  oneOf,
} from "prop-types";

import AppMainContainer from "../../redux/containers/components/AppMainContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";
import withProtectedRoute from "../../hoc/withProtectedRoute";

function Label({ labelTodos, labelOverdueTodos, label, openAddTodoModal }) {
  return (
    <AppMainContainer>
      <h1 className="Page__Title Page__Title--Label">{label.name}</h1>
      {labelOverdueTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h2 className="Section__Title">Overdue</h2>
          </header>
          <ul className="Section__Todos__List">
            {labelOverdueTodos &&
              labelOverdueTodos.map((todoID) => (
                <Todo key={todoID} todoID={todoID} />
              ))}
          </ul>
        </section>
      ) : null}

      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">Todos</h2>
        </header>
        <ul className="Section__Todos__List">
          {labelTodos &&
            labelTodos.map((todoID) => <Todo key={todoID} todoID={todoID} />)}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
    </AppMainContainer>
  );
}

Label.propTypes = {
  labelTodos: array.isRequired,
  labelOverdueTodos: array.isRequired,
  label: shape({
    id: string.isRequired,
    uid: string.isRequired,
    name: string.isRequired,
    todosCount: number.isRequired,
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

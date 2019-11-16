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

import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";
import withProtectedRoute from "../../hoc/withProtectedRoute";

function Project({
  projectTodos,
  projectOverdueTodos,
  project,
  openAddTodoModal,
}) {
  return (
    <DashboardMainContainer>
      {project && <h1 className="Page__Title">{project.name}</h1>}
      {projectOverdueTodos && projectOverdueTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h2 className="Section__Title">Overdue</h2>
          </header>
          <ul className="Section__Todos__List">
            {projectOverdueTodos &&
              projectOverdueTodos.map((todoID) => (
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
          {projectTodos &&
            projectTodos.map((todoID) => <Todo key={todoID} todoID={todoID} />)}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
    </DashboardMainContainer>
  );
}

Project.propTypes = {
  projectTodos: array.isRequired,
  projectOverdueTodos: array.isRequired,
  project: shape({
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

export default withProtectedRoute()(Project);

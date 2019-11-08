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

function Project({
  projectTodos,
  projectOverdueTodos,
  project,
  openAddTodoModal,
}) {
  return (
    <AppMainContainer>
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
    </AppMainContainer>
  );
}

Project.propTypes = {
  projectTodos: array.isRequired,
  projectOverdueTodos: array.isRequired,
  project: shape({
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

export default Project;

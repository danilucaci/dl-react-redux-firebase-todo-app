import React from "react";

import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

function Project({ projectTodos, projectOverdueTodos, project }) {
  return (
    <Main>
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
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
    </Main>
  );
}

export default Project;

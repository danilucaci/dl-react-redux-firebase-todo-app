import React from "react";
import { connect } from "react-redux";

import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import {
  projectOverdueTodosSelector,
  projectNotOverdueTodosSelector,
  projectSelector,
} from "../../redux/projects/projects-selectors";

function Project(props) {
  const { projectTodos, projectOverdueTodos, project } = props;

  return (
    <Main>
      <h1 className="Page__Title">{project.name}</h1>
      {projectOverdueTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h1 className="Section__Title">Overdue</h1>
          </header>
          <ul className="Section__Todos__List">
            {projectOverdueTodos &&
              projectOverdueTodos.map((todo) => (
                <Todo
                  iconColor={todo.iconColor}
                  labels={todo.labels}
                  project={todo.project}
                  dueDate={todo.dueDate}
                  completed={todo.completed}
                  key={todo.id}
                >
                  {todo.name}
                </Todo>
              ))}
          </ul>
        </section>
      ) : null}

      <section className="Section">
        <header className="Section__Header">
          <h1 className="Section__Title">Todos</h1>
        </header>
        <ul className="Section__Todos__List">
          {projectTodos &&
            projectTodos.map((todo) => (
              <Todo
                iconColor={todo.iconColor}
                labels={todo.labels}
                project={todo.project}
                dueDate={todo.dueDate}
                completed={todo.completed}
                key={todo.id}
              >
                {todo.name}
              </Todo>
            ))}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
    </Main>
  );
}

const mapStateToProps = (state, ownProps) => ({
  projectOverdueTodos: projectOverdueTodosSelector(state, ownProps.projectID),
  projectTodos: projectNotOverdueTodosSelector(state, ownProps.projectID),
  project: projectSelector(state, ownProps.projectID),
});

export default connect(mapStateToProps)(Project);

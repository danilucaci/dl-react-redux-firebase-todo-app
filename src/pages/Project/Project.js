import React from "react";
import { func, array, string, oneOfType, shape, oneOf } from "prop-types";

import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import AriaText from "../../components/AriaText/AriaText";
import { FALLBACK_FOCUS_BUTTON } from "../../constants/ui";
import SEO from "../../components/SEO/SEO";
import seo from "../../utils/seo";

function Project({
  projectTodos,
  projectOverdueTodos,
  project,
  openAddTodoModal,
}) {
  const projectName = project && project.name ? project.name : "Project";

  return (
    <>
      <SEO title={projectName + seo.pages.project.title} />
      <HeaderContainer />
      <DashboardMainContainer>
        <h1 className="Page__Title">{projectName}</h1>
        {projectOverdueTodos && projectOverdueTodos.length ? (
          <section
            className="Section"
            aria-labelledby={`${projectName.toLowerCase()}-overdue-todos-label`}
          >
            <header className="Section__Header">
              <h2
                className="Section__Title"
                id={`${projectName.toLowerCase()}-overdue-todos-label`}
              >
                Overdue
                <AriaText> todos</AriaText>
              </h2>
            </header>
            <ul
              className="Section__Todos__List"
              aria-label={`${projectName} overdue todos`}
            >
              {projectOverdueTodos &&
                projectOverdueTodos.map((todoID, index) => (
                  <Todo
                    key={todoID}
                    todoID={todoID}
                    prev={projectOverdueTodos[index - 1]}
                    next={projectOverdueTodos[index + 1]}
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
          <ul
            className="Section__Todos__List"
            aria-label={`${projectName} todos`}
          >
            {projectTodos &&
              projectTodos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={projectTodos[index - 1]}
                  next={projectTodos[index + 1]}
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
    </>
  );
}

Project.propTypes = {
  projectTodos: array.isRequired,
  projectOverdueTodos: array.isRequired,
  project: shape({
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

export default withProtectedRoute()(Project);

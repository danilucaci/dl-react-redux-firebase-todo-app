import React from "react";
import { func, array } from "prop-types";

import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import withProtectedRoute from "../../hoc/withProtectedRoute";
import AriaText from "../../components/AriaText/AriaText";
import { FALLBACK_FOCUS_BUTTON } from "../../constants/ui";
import SEO from "../../components/SEO/SEO";
import seo from "../../utils/seo";

function Inbox({ inboxTodos, overdueInboxTodos, openAddTodoModal }) {
  return (
    <>
      <SEO title={seo.pages.inbox.title} />
      <HeaderContainer />
      <DashboardMainContainer>
        <h1 className="Page__Title">Inbox</h1>
        {overdueInboxTodos.length ? (
          <section className="Section" aria-labelledby="overdue-todos-label">
            <header className="Section__Header">
              <h2 className="Section__Title" id="overdue-todos-label">
                Overdue
                <AriaText> todos</AriaText>
              </h2>
            </header>
            <ul
              className="Section__Todos__List"
              aria-label="Inbox overdue todos"
            >
              {overdueInboxTodos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={overdueInboxTodos[index - 1]}
                  next={overdueInboxTodos[index + 1]}
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
          {inboxTodos.length ? (
            <ul className="Section__Todos__List" aria-label={`inbox todos`}>
              {inboxTodos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={inboxTodos[index - 1]}
                  next={inboxTodos[index + 1]}
                />
              ))}
            </ul>
          ) : null}
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

Inbox.propTypes = {
  inboxTodos: array.isRequired,
  overdueInboxTodos: array.isRequired,
  openAddTodoModal: func.isRequired,
};

export default withProtectedRoute()(Inbox);

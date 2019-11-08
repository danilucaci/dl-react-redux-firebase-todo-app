import React from "react";
import { func, array } from "prop-types";

import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

function Inbox({ inboxTodos, overdueInboxTodos, openAddTodoModal }) {
  return (
    <Main>
      <h1 className="Page__Title">Inbox</h1>
      {overdueInboxTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h2 className="Section__Title">Overdue</h2>
          </header>
          <ul className="Section__Todos__List">
            {overdueInboxTodos.map((todoID) => (
              <Todo key={todoID} todoID={todoID} />
            ))}
          </ul>
        </section>
      ) : null}
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">Todos</h2>
        </header>
        {inboxTodos.length ? (
          <ul className="Section__Todos__List">
            {inboxTodos.map((todoID) => (
              <Todo key={todoID} todoID={todoID} />
            ))}
          </ul>
        ) : null}
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
    </Main>
  );
}

Inbox.propTypes = {
  inboxTodos: array.isRequired,
  overdueInboxTodos: array.isRequired,
  openAddTodoModal: func.isRequired,
};

export default Inbox;

import React from "react";
import { connect } from "react-redux";

import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import {
  notOverdueInboxTodosSelector,
  overdueInboxTodosSelector,
} from "../../redux/todos/todos-selectors";

function Inbox(props) {
  const { inboxTodos, overdueInboxTodos } = props;

  return (
    <Main>
      <h1 className="Page__Title">Inbox</h1>
      {overdueInboxTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h2 className="Section__Title">Overdue</h2>
          </header>
          <ul className="Section__Todos__List">
            {overdueInboxTodos.map((todo) => (
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
          <h2 className="Section__Title">Todos</h2>
        </header>
        {inboxTodos.length ? (
          <ul className="Section__Todos__List">
            {inboxTodos.map((todo) => (
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
        ) : null}
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
    </Main>
  );
}

const mapStateToProps = (state) => ({
  overdueInboxTodos: overdueInboxTodosSelector(state),
  inboxTodos: notOverdueInboxTodosSelector(state),
});

export default connect(mapStateToProps)(Inbox);

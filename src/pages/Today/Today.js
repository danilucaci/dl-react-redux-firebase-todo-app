import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import "./Today.styles.scss";
import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import {
  overdueTodosSelector,
  notOverdueTodayTodosSelector,
} from "../../redux/todos/todos-selectors";
import { formatTodaySectionDate } from "../../utils/dates";

export function RenderTodayDateTime() {
  const { todayDate, todayFormattedDate } = formatTodaySectionDate();

  return (
    <time dateTime={todayDate} className="Section__Date">
      {todayFormattedDate}
    </time>
  );
}

function Today(props) {
  const { todayTodos, overdueTodos } = props;

  return (
    <Main>
      <h1 className="Page__Title">Today</h1>
      {overdueTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h1 className="Section__Title">Overdue</h1>
          </header>
          <ul className="Section__Todos__List">
            {overdueTodos &&
              overdueTodos.map((todo) => (
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
          <h1 className="Section__Title">Today</h1>
          {RenderTodayDateTime()}
        </header>
        <ul className="Section__Todos__List">
          {todayTodos &&
            todayTodos.map((todo) => (
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
        <AddNew>Add todo</AddNew>
      </section>
    </Main>
  );
}

const mapStateToProps = (state) => ({
  overdueTodos: overdueTodosSelector(state),
  todayTodos: notOverdueTodayTodosSelector(state),
});

export default connect(mapStateToProps)(Today);

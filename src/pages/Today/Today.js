import React from "react";
import { func, array } from "prop-types";

import "./Today.styles.scss";
import AppMainContainer from "../../redux/containers/components/AppMainContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import { formatTodaySectionDate } from "../../utils/dates";
import withProtectedRoute from "../../hoc/withProtectedRoute";

export function RenderTodayDateTime() {
  const { todayDate, todayFormattedDate } = formatTodaySectionDate();

  return (
    <time dateTime={todayDate} className="Section__Date">
      {todayFormattedDate}
    </time>
  );
}

function Today({
  todayTodos = null,
  overdueTodos = null,
  openAddTodoModal = null,
}) {
  return (
    <AppMainContainer>
      <h1 className="Page__Title">Today</h1>
      {overdueTodos && overdueTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h2 className="Section__Title">Overdue</h2>
          </header>
          <ul className="Section__Todos__List">
            {overdueTodos &&
              overdueTodos.map((todoID) => (
                <Todo key={todoID} todoID={todoID} />
              ))}
          </ul>
        </section>
      ) : null}

      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">Today</h2>
          {RenderTodayDateTime()}
        </header>
        <ul className="Section__Todos__List">
          {todayTodos &&
            todayTodos.map((todoID) => <Todo key={todoID} todoID={todoID} />)}
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

Today.propTypes = {
  todayTodos: array.isRequired,
  overdueTodos: array.isRequired,
  openAddTodoModal: func.isRequired,
};

export default withProtectedRoute()(Today);

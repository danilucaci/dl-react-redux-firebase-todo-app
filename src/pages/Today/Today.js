import React from "react";
import { func, array } from "prop-types";

import "./Today.styles.scss";
import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import { formatTodaySectionDate } from "../../utils/dates";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import AriaText from "../../components/AriaText/AriaText";
import { FALLBACK_FOCUS_BUTTON } from "../../constants/ui";

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
    <>
      <HeaderContainer />
      <DashboardMainContainer>
        <h1 className="Page__Title">Today</h1>
        {overdueTodos && overdueTodos.length ? (
          <section
            className="Section"
            aria-labelledby={`today-overdue-todos-label`}
          >
            <header className="Section__Header">
              <h2 className="Section__Title" id={`today-overdue-todos-label`}>
                Overdue
                <AriaText> todos</AriaText>
              </h2>
            </header>
            <ul
              className="Section__Todos__List"
              aria-label="today overdue todos"
            >
              {overdueTodos &&
                overdueTodos.map((todoID, index) => (
                  <Todo
                    key={todoID}
                    todoID={todoID}
                    prev={overdueTodos[index - 1]}
                    next={overdueTodos[index + 1]}
                  />
                ))}
            </ul>
          </section>
        ) : null}

        <section
          className="Section"
          aria-labelledby={`today-not-overdue-todos-label`}
        >
          <header className="Section__Header">
            <h2 className="Section__Title" id={`today-not-overdue-todos-label`}>
              Today
            </h2>
            {RenderTodayDateTime()}
          </header>
          <ul className="Section__Todos__List" aria-label="today todos">
            {todayTodos &&
              todayTodos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={todayTodos[index - 1]}
                  next={todayTodos[index + 1]}
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

Today.propTypes = {
  todayTodos: array.isRequired,
  overdueTodos: array.isRequired,
  openAddTodoModal: func.isRequired,
};

export default withProtectedRoute()(Today);

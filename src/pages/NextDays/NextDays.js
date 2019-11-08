import React from "react";
import { func, array } from "prop-types";

import "./NextDays.styles.scss";
import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import {
  formatTodaySectionDate,
  formatAndAddDate,
  formatAndAddDay,
} from "../../utils/dates";
import withProtectedRoute from "../../hoc/withProtectedRoute";

export function RenderTodayDateTime() {
  const { todayDate, todayFormattedDate } = formatTodaySectionDate();

  return (
    <time dateTime={todayDate} className="Section__Date">
      {todayFormattedDate}
    </time>
  );
}

export function RenderNextDaysDateTime(dateCount) {
  const { dateAdded, formattedDate } = formatAndAddDate(dateCount);
  return (
    <time dateTime={dateAdded} className="Section__Date">
      {formattedDate}
    </time>
  );
}

function NextDays({
  overdueTodos,
  todayTodos,
  nextDaysPlus1Todos,
  nextDaysPlus2Todos,
  nextDaysPlus3Todos,
  nextDaysPlus4Todos,
  nextDaysPlus5Todos,
  nextDaysPlus6Todos,
  openAddTodoModal,
}) {
  return (
    <DashboardMainContainer>
      <h1 className="Page__Title">Next 7 days</h1>
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
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">Tomorrow</h2>
          {RenderNextDaysDateTime(1)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus1Todos &&
            nextDaysPlus1Todos.map((todoID) => (
              <Todo key={todoID} todoID={todoID} />
            ))}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(2)}</h2>
          {RenderNextDaysDateTime(2)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus2Todos &&
            nextDaysPlus2Todos.map((todoID) => (
              <Todo key={todoID} todoID={todoID} />
            ))}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(3)}</h2>
          {RenderNextDaysDateTime(3)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus3Todos &&
            nextDaysPlus3Todos.map((todoID) => (
              <Todo key={todoID} todoID={todoID} />
            ))}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(4)}</h2>
          {RenderNextDaysDateTime(4)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus4Todos &&
            nextDaysPlus4Todos.map((todoID) => (
              <Todo key={todoID} todoID={todoID} />
            ))}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(5)}</h2>
          {RenderNextDaysDateTime(5)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus5Todos &&
            nextDaysPlus5Todos.map((todoID) => (
              <Todo key={todoID} todoID={todoID} />
            ))}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(6)}</h2>
          {RenderNextDaysDateTime(6)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus6Todos &&
            nextDaysPlus6Todos.map((todoID) => (
              <Todo key={todoID} todoID={todoID} />
            ))}
        </ul>
        <AddNew
          additionalClasses="Section__AddNew"
          onClick={() => openAddTodoModal()}
        >
          Add todo
        </AddNew>
      </section>
    </DashboardMainContainer>
  );
}

NextDays.propTypes = {
  overdueTodos: array.isRequired,
  todayTodos: array.isRequired,
  nextDaysPlus1Todos: array.isRequired,
  nextDaysPlus2Todos: array.isRequired,
  nextDaysPlus3Todos: array.isRequired,
  nextDaysPlus4Todos: array.isRequired,
  nextDaysPlus5Todos: array.isRequired,
  nextDaysPlus6Todos: array.isRequired,
  openAddTodoModal: func.isRequired,
};

export default withProtectedRoute()(NextDays);

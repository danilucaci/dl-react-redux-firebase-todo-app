import React from "react";

import "./NextDays.styles.scss";
import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import {
  formatTodaySectionDate,
  formatAndAddDate,
  formatAndAddDay,
} from "../../utils/dates";

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
}) {
  return (
    <Main>
      <h1 className="Page__Title">Next 7 days</h1>
      {overdueTodos && overdueTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h1 className="Section__Title">Overdue</h1>
          </header>
          <ul className="Section__Todos__List">
            {overdueTodos &&
              overdueTodos.map((todo) => (
                <Todo key={todo.id} todoID={todo.id} />
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
            todayTodos.map((todo) => <Todo key={todo.id} todoID={todo.id} />)}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">Tomorrow</h2>
          {RenderNextDaysDateTime(1)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus1Todos &&
            nextDaysPlus1Todos.map((todo) => (
              <Todo key={todo.id} todoID={todo.id} />
            ))}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(2)}</h2>
          {RenderNextDaysDateTime(2)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus2Todos &&
            nextDaysPlus2Todos.map((todo) => (
              <Todo key={todo.id} todoID={todo.id} />
            ))}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(3)}</h2>
          {RenderNextDaysDateTime(3)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus3Todos &&
            nextDaysPlus3Todos.map((todo) => (
              <Todo key={todo.id} todoID={todo.id} />
            ))}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(4)}</h2>
          {RenderNextDaysDateTime(4)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus4Todos &&
            nextDaysPlus4Todos.map((todo) => (
              <Todo key={todo.id} todoID={todo.id} />
            ))}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(5)}</h2>
          {RenderNextDaysDateTime(5)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus5Todos &&
            nextDaysPlus5Todos.map((todo) => (
              <Todo key={todo.id} todoID={todo.id} />
            ))}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">{formatAndAddDay(6)}</h2>
          {RenderNextDaysDateTime(6)}
        </header>
        <ul className="Section__Todos__List">
          {nextDaysPlus6Todos &&
            nextDaysPlus6Todos.map((todo) => (
              <Todo key={todo.id} todoID={todo.id} />
            ))}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
    </Main>
  );
}

export default NextDays;
